#ifndef T_SERVER_H
#define T_SERVER_H

#include "jsonParserBridge.h"
#include "operationHandlers.h"

#include <arpa/inet.h>
#include <netdb.h>
#include <netinet/in.h>
#include <pthread.h>
#include <signal.h>
#include <stdbool.h>
#include <stdio.h>
#include <stdlib.h>
#include <string.h>
#include <sys/socket.h>
#include <sys/types.h>
#include <unistd.h>

#define BUFSIZE 1024

/**
 * @file tcpserver.h
 * @brief Header file containing declarations for the TCP server components.
 */

/**
 * @brief Handle a client connection for transaction-related requests.
 *
 * @param clientfd The client socket file descriptor.
 */
void handle_client_transaction(int clientfd);
/**
 * @brief Clean and preprocess received data to ensure proper handling.
 *
 * @param s A pointer to the data to be cleaned and processed.
 */
void clean_data(char *s);

/**
 * @brief Process received data and generate a response.
 *
 * @param data The received data as a JSON string.
 * @return A dynamically allocated JSON response string.
 */
char *process_received_data(const char *data);

/**
 * @brief Handle received data from a client and send a response.
 *
 * @param buffer The buffer containing received data.
 * @param bytes_received The number of bytes received.
 * @return A dynamically allocated JSON response string.
 */
char *handle_received_data(char *buffer, int bytes_received);

/**
 * @brief Handle a client connection for status-related requests.
 *
 * @param clientfd The client socket file descriptor.
 */
void handle_client_status(int clientfd);

/**
 * @brief start the transaction server on the specified port
 *
 * @param port A pointer to an integer representing the port number
 */
void *start_server_transaction(void *port);

/**
 * @brief start the status server on the specified port
 *
 * @param port A pointer to an integer representing the port number
 */
void *start_server_status(void *port);

/**
 * @brief gracefully shutdown closing servers
 *
 * @param signum represents the code of the signal received
 */
void sigint_handler(int signum);

#endif
