#include "tcpserver.h"

pthread_t status_server, transaction_server;

int main() {
    int PORT_STATUS = 3001;
    int PORT_TRANSACTION = 3000;

    /* register the (SIGINT) handler */
    signal(SIGINT, sigint_handler);

    /* create and start the first server */
    if (pthread_create(&status_server, NULL, start_server_status,
                       &PORT_STATUS) != 0) {
        perror("Error creating status server\n");
        exit(1);
    }

    /* create and start the second server */
    if (pthread_create(&transaction_server, NULL, start_server_transaction,
                       &PORT_TRANSACTION) != 0) {
        perror("Error creating transaction server\n");
        exit(1);
    }

    /* wait for threads */
    pthread_join(status_server, NULL);
    pthread_join(transaction_server, NULL);

    return 0;
}

void sigint_handler(int signum) {
    printf("\n\nReceived SIGNAL %d. Gracefully shutting down... \n",
           signum);

    /* request cancellation of threads */
    pthread_cancel(status_server);
    pthread_cancel(transaction_server);

    printf("closing servers\n");
    sleep(2);
    printf("everything closed, Bye\n\n");
    pthread_exit(NULL);
}
