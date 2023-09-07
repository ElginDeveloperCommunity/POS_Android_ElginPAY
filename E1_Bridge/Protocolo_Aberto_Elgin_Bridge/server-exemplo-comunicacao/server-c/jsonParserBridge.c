#include "jsonParserBridge.h"

const char *find_key(const char *json, const char *key) {
    const char *pos = strstr(json, key);
    if (pos == NULL)
        return NULL;
    return pos + strlen(key);
}
int parse_json(const char *jsonString, OperationPayload *jsonData) {
    const char *operation_pos = find_key(jsonString, "\"operation\":");
    if (operation_pos == NULL)
        return 0;
    jsonData->operation = atoi(operation_pos);

    const char *tipo_cartao_pos = find_key(jsonString, "\"tipoCartao\":");
    if (tipo_cartao_pos == NULL)
        jsonData->tipoCartao = -1;
    else
        jsonData->tipoCartao = atoi(tipo_cartao_pos);

    return 1;
}
