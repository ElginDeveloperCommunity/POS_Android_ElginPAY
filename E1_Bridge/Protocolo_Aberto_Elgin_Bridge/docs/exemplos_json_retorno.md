## Venda

Exemplo sucesso de comunicação com Bridge, porém erro na transação

```json
{
  "e1_bridge_code": 0,
  "e1_bridge_msg": "Sucesso",
  "e1_cupom_fiscal": false,
  "e1_pdv": "PDV01",
  "existeComprovanteGrafico": false,
  "existeTransacaoPendente": false,
  "identificadorTransacaoAutomacao": "1",
  "mensagemResultado": "Tempo limite excedido",
  "numeroParcelas": 0,
  "operacao": "VENDA",
  "provedor": "PROVEDOR_DESCONHECIDO",
  "requerConfirmacao": true,
  "resultadoTransacao": -2490,
  "tipoCartao": "CARTAO_DESCONHECIDO",
  "tipoFinanciamento": "FINANCIAMENTO_NAO_DEFINIDO",
  "valorTotal": "1000",
  "viasImprimir": "VIA_NENHUMA"
}
```

Exemplo erro comunicação com Bridge
```json
{
  "e1_bridge_code": -1245,
  "e1_bridge_msg": "Erro ao ler o retorno da transação"
}
```
# Administrativas

```json
{
  "e1_bridge_code": 0,
  "e1_bridge_msg": "Sucesso",
  "e1_cupom_fiscal": false,
  "e1_pdv": "PDV01",
  "existeComprovanteGrafico": false,
  "existeTransacaoPendente": false,
  "identificadorConfirmacaoTransacao": "null.null.null.null.null",
  "identificadorPontoCaptura": "3517",
  "identificadorTransacaoAutomacao": "1",
  "mensagemResultado": "0004.0000.0103.0012",
  "numeroParcelas": 0,
  "operacao": "ADMINISTRATIVA",
  "provedor": "PROVEDOR_DESCONHECIDO",
  "requerConfirmacao": false,
  "resultadoTransacao": 0,
  "tipoCartao": "CARTAO_DESCONHECIDO",
  "tipoFinanciamento": "FINANCIAMENTO_NAO_DEFINIDO",
  "viasImprimir": "VIA_NENHUMA"
}
```