#include "tcpserver.h"

ProcessingFunction operation_handlers[] = {
    NULL,
    process_iniciar_venda,
    process_adm_menu,
    NULL,
    process_iniciar_cancelamento_venda
};

void *start_server_transaction(void *port) {
    int parentfd;                  /* parent socket */
    int clientfd;                  /* child socket */
    int portno;                    /* port to listen on */
    socklen_t clientlen;           /* byte size of client's address */
    struct sockaddr_in serveraddr; /* server's addr */
    struct sockaddr_in clientaddr; /* client addr */
    struct hostent *hostp;         /* client host info */
    char *hostaddrp;               /* dotted decimal host addr string */
    int optval;                    /* flag value for setsockopt */
    int o_state;                   /* flag value for cancelability of thread */

    /*
     * check command line arguments
     */
    portno = *((int *)port);

    /*
     * socket: create the parent socket
     */
    parentfd = socket(AF_INET, SOCK_STREAM, 0);
    if (parentfd < 0) {
        error("opening socket");
        exit(1);
    }

    /* setsockopt: Handy debugging trick that lets
     * us rerun the server immediately after we kill it;
     * otherwise we have to wait about 20 secs.
     * Eliminates "ERROR on binding: Address already in use" error.
     */
    optval = 1;
    setsockopt(parentfd, SOL_SOCKET, SO_REUSEADDR, (const void *)&optval,
               sizeof(int));

    /*
     * build the server's Internet address
     */
    bzero((char *)&serveraddr, sizeof(serveraddr));

    /* this is an Internet address */
    serveraddr.sin_family = AF_INET;

    /* let the system figure out our IP address */
    serveraddr.sin_addr.s_addr = htonl(INADDR_ANY);

    /* this is the port we will listen on */
    serveraddr.sin_port = htons((unsigned short)portno);

    /*
     * bind: associate the parent socket with a port
     */
    if (bind(parentfd, (struct sockaddr *)&serveraddr, sizeof(serveraddr)) <
        0) {

        error("ERROR on binding");
        exit(1);
    }

    /*
     * listen: make this socket ready to accept connection requests
     */
    if (listen(parentfd, 5) < 0) /* allow 5 requests to queue up */
    {
        error("ERROR on listen");
        exit(1);
    }

    printf("Transaction Server listening on %s:%d...\n", inet_ntoa(serveraddr.sin_addr),
           portno);

    /*
     * main loop: wait for a connection request, echo input line,
     * then close connection.
     */
    clientlen = sizeof(clientaddr);

    while (1) {

        /*
         * accept: wait for a connection request (blocking operation)
         */
        clientfd = accept(parentfd, (struct sockaddr *)&clientaddr, &clientlen);
        if (clientfd < 0) {
            error("ERROR on accept");
            continue;
        }

        /* disables cancelability */
        pthread_setcancelstate(PTHREAD_CANCEL_DISABLE, &o_state);

        /*
         * gethostbyaddr: determine who sent the message
         */
        hostp = gethostbyaddr((const char *)&clientaddr.sin_addr.s_addr,
                              sizeof(clientaddr.sin_addr.s_addr), AF_INET);
        if (hostp == NULL) {
            error("ERROR on gethostbyaddr");
            continue;
        }
        hostaddrp = inet_ntoa(clientaddr.sin_addr);
        if (hostaddrp == NULL) {
            error("ERROR on inet_ntoa\n");
            continue;
        }
        printf("transaction server connected with %s (%s)", hostp->h_name,
               hostaddrp);

        handle_client_transaction(clientfd);

        /* restores cancelability */
        pthread_setcancelstate(o_state, &o_state);
    }
    
    close(parentfd);
    printf("closing transaction server\n");
    pthread_exit(NULL);
}

// int main(int argc, char *argv[]) {
//     int portno;
//     if (argc != 2) {
//         fprintf(stderr, "usage: %s <port>\n", argv[0]);
//         exit(1);
//     }
//     portno = atoi(argv[1]);
//     // int port = 3000;
//     // server_thread(&portno);
//     start_server_transaction(portno);
//     return 0;
// }

void handle_client_transaction(int clientfd) {
    char buf[BUFSIZE]; /* message buffer */
    int n;             /* message byte size */

    /*
     * read: read input string from the client
     */
    bzero(buf, BUFSIZE);
    n = read(clientfd, buf, BUFSIZE);
    if (n < 0) {
        error("\nERROR reading from socket\n");
    }

    /* create the payload */
    char *response = create_payload_confirmation();
    /* write: echo the payload to the client */
    n = write(clientfd, response, strlen(response));
    if (n < 0) {
        error("ERROR writing to socket");
    }

    /* clear the response buffer before reusing it */
    free(response);

    response = handle_received_data(buf, strlen(buf));
    if (strlen(response) > 0)
        printf("\tres: ok\n");
    else
        printf("\nsomething went wrong - \nresponse: %s\nbuf: %s\n", response,
               buf);

    /*
     * write: echo the input string back to the client
     */
    n = write(clientfd, response, strlen(response));
    if (n < 0) {
        error("ERROR writing to socket");
    }

    /* clean up */
    free(response);
}

char *process_received_data(const char *json_data) {
    /* parse and process the received data */

    OperationPayload *data =
        (OperationPayload *)malloc(sizeof(OperationPayload));
    char *payload;

    if (parse_json(json_data, data) != 1) {
        perror("JSON parsing failed");
        payload = create_payload_error("json parsing failed");
        return payload;
    }

    char *params_str = "";

    if (data->operation != -1 && params_str != NULL) {
        int operation = data->operation;

        /* find the appropriate processing function */
        ProcessingFunction processing_function = operation_handlers[operation];

        if (processing_function != NULL) {
            payload = processing_function(data);
        } else {
            // invalid operation code
            payload = create_payload_error("invalid operation code");
        }

        free(data);
    } else {
        // invalid json format
        payload = create_payload_error("no necessary fields");
    }

    return payload;
}

char *handle_received_data(char *buffer, int bytes_received) {
    /* ensure that 'data' is null-terminated */
    char *data = (char *)malloc(bytes_received + 1);
    if (data == NULL) {
        error("\nERROR allocating memory\n");
        return NULL;
    }
    strncpy(data, buffer, bytes_received);
    data[bytes_received] = '\0';

    /* clean the data */
    clean_data(data);

    /* process received payload */
    char *response = process_received_data(data);

    /* clean up */
    free(data);

    return response;
}

