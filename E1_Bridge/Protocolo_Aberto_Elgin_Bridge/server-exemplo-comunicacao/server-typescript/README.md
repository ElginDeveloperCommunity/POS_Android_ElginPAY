# Server Bridge Typescript

## Executar o Server

No arquivo [index.js](./src/index.ts) atualizar a variável **HOST** para o IP da sua máquina, ou para `127.0.0.1` caso vá executar em localhost.

Após instalar os pacotes necessários com 
```bash
npm i
```

transpilar o projeto e então executar:
```bash
# se tiver typescrit instalado globalmente
tsc 

node dist/index.js
```

## Testes

Os testes foram realizados com o server executando em uma raspberry pi e utilizando o [client windows](../../../Exemplo_E1_Bridge_Windows/Exemplo_E1_Brigde_Windows_Exemplo_Delphi.zip) no windows.
