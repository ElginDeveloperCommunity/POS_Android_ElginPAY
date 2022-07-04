# Exemplo TEF Elgin

## Uso do Exemplo

1. Instale o Aplicativo do Bridge no seu POS.
2. Execute o arquivo **E1_TEFPay_Passivo.exe**, assim o serviço do GP (Gerenciador Padrão) vai começar a verificar por mudanças nos arquivos definidos no **config_tef.json**. 
3. O GP usa a E1_Bridge.dll para comunicar com o POS, é importante deixar esse arquivo na mesma pasta.  
5. Configure no arquivo **e1_bridge_configs.json** o IP indicado no App do Bridge no POS conforme a imagem:
![IP do Terminal POS]()
    
6. Agora está tudo pronto para executar o exemplo! Use o **projeto_teste_tefpay.exe** ou o seu próprio programa de TEF troca de arquivos.