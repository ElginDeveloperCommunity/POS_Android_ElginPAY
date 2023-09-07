#ifndef HANDLERS_H
#define HANDLERS_H

#include <stdio.h>
#include <stdlib.h>
#include <string.h>
#include <errno.h>

typedef struct {
    int code;
    char *content;
    char *is_special_operation;
} Payload;

typedef struct {
    int operation;
    int idTransacao;
    const char *pdv;
    int64_t valorTotal;
    int tipoCartao;
    int tipoFinanciamento;
    int numParcelas;
    const char *dataHora;
    const char *nsu;
} OperationPayload;

typedef char *(*ProcessingFunction)(OperationPayload *params);

Payload *create_payload(int code, const char *content,
                        const char *is_special_operation);
char *create_payload_confirmation();
char *create_payload_status();
char *create_payload_error(const char *errorMessage);
char *create_payload_test(const char *data);

void free_payload(Payload *payload);

char *process_iniciar_venda(OperationPayload *params);
char *payload_to_string(Payload *payload);
char *process_adm_menu(OperationPayload *params);
char *process_iniciar_cancelamento_venda(OperationPayload *params);

char *payload_to_string(Payload *payload);
void clean_data(char *s);
void error(const char *msg);

#endif
