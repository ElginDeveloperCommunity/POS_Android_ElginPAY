#include "operationHandlers.h"

void free_payload(Payload *payload) {
    if (payload != NULL)
        return;

    free(payload->content);
    free(payload->is_special_operation);
    free(payload);
}

Payload *create_payload(int code, const char *content,
                        const char *is_special_operation) {
    Payload *payload = (Payload *)malloc(sizeof(Payload));
    payload->code = code;
    payload->content = strdup(content);
    payload->is_special_operation = strdup(is_special_operation);
    return payload;
}

char *create_payload_confirmation() {
    Payload *payload = create_payload(0, "ACK", "false");
    char *payload_str = payload_to_string(payload);

    free_payload(payload);
    return payload_str;
}

char *create_payload_error(const char *errorMessage) {
    Payload *payload = create_payload(-1, errorMessage, "false");
    char *payload_str = payload_to_string(payload);

    free_payload(payload);
    return payload_str;
}

char *create_payload_test(const char *data) {
    Payload *payload = create_payload(0, data, "false");
    char *payload_str = payload_to_string(payload);

    free_payload(payload);
    return payload_str;
}

char *create_payload_status() {
    Payload *payload = create_payload(0, "", "false");
    char *payload_str = payload_to_string(payload);
    free_payload(payload);
    return payload_str;
}

char *process_iniciar_venda(OperationPayload *params) {
    char *mensagem;

    if (params->tipoCartao != -1) {
        if (params->tipoCartao == 1)
            mensagem = "{ \"mensagem\": \"A implementar IniciarVendaCredito\"}";
        else
            mensagem = "{ \"mensagem\": \"A implementar IniciarVendaDebito\"}";
    } else {
        mensagem = "{ \"mensagem\": \"A implementar IniciarVenda\"}";
    }

    Payload *payload = create_payload(0, mensagem, "false");
    char *payload_str = payload_to_string(payload);

    free_payload(payload);
    return payload_str;
}

char *process_adm_menu(OperationPayload *params) {
    char *mensagem = "{ \"mensagem\": \"A implementar Adm Menu\"}";

    Payload *payload = create_payload(0, mensagem, "false");
    char *payload_str = payload_to_string(payload);

    free_payload(payload);
    return payload_str;
}

char *process_iniciar_cancelamento_venda(OperationPayload *params) {
    char *mensagem = "{ \"mensagem\": \"A implementar Cancelamento\"}";

    Payload *payload = create_payload(0, mensagem, "false");
    char *payload_str = payload_to_string(payload);

    free_payload(payload);
    return payload_str;
}

/*
 * error - wrapper for perror
 */
void error(const char *msg) {
    fprintf(stderr, "\n[ERROR]: %s - %s\n", msg, strerror(errno));
}

char *payload_to_string(Payload *payload) {
    /* check if the content is a JSON object or a string */
    const char *content = payload->content;
    const char *content_format = NULL;

    int size_content = strlen(content) + 3; // add 3 for quotes and null
    char quoted_content[size_content];

    if (content[0] == '{')
        content_format = content;
    else {
        snprintf(quoted_content, size_content, "\"%s\"", content);
        content_format = quoted_content;
    }

    /* calculate the required size for the JSON string */
    int required_size =
        snprintf(NULL, 0,
                 "{\"code\":\x20%d,\x20\"content\":\x20%s,"
                 "\x20\"is_special_operation\":\x20\"%s\"}",
                 payload->code, content_format, payload->is_special_operation);

    /* allocate memory for the JSON string (terminator included) */
    char *result = (char *)malloc(required_size + 1);
    if (result == NULL) {
        perror("\nERROR allocatin memory\n");
        return NULL;
    }

    /* create the JSON string */
    snprintf(result, required_size + 1,
             "{\"code\":\x20%d,\x20\"content\":\x20%s,\x20\"is_special_"
             "operation\":\x20\"%s\"}",
             payload->code, content_format, payload->is_special_operation);

    return result;
}

// Function to clean data
void clean_data(char *s) {
    // Remove non-printable and other non-valid JSON characters
    for (int i = 0; s[i]; i++) {
        if ((s[i] >= 32 || s[i] == '\n' || s[i] == '\r' || s[i] == '\t') &&
            s[i] != '\\') {
            s[i] = s[i];
        } else {
            s[i] = ' ';
        }
    }
}
