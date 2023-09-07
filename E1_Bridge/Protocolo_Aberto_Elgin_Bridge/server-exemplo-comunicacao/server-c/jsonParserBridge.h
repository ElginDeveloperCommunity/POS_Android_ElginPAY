#ifndef JSON_H
#define JSON_H

#include "operationHandlers.h"
#include <string.h>

const char *find_key(const char *json, const char *key);
int parse_json(const char *jsonString, OperationPayload *jsonData);

#endif
