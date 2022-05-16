# Exemplo Kotlin SmartPOS

## Versão
Para rodar e testar o nosso exemplo, por favor verifique se a versão do SDK instalado na sua máquina é:<br>
**• Plataforma SDK 11.0 API level 30**

## Vídeos Tutoriais
Se você tiver dúvidas sobre como testar o nosso exemplo, assista aos seguintes vídeos.
<br>
[Instalando o Android Studio](#instalando-o-android-studio)
<br>
[Download Exemplo Elgin](#download-exemplo-elgin)
<br>
[Abrindo o Exemplo Kotlin](#abrindo-o-exemplo-kotlin)
<br>
## Funcionalidade NFC-e
[Funcionalidade NFC-e](#elgin-pay-nfc-e)
<br>
[Como testar o apk](#como-testar-o-apk)
<br>
[Para utilizar em seu App essa funcionalidade](#para-utilizar-em-seu-app-essa-funcionalidade)
<br>


<hr>

### Instalando o Android Studio


https://user-images.githubusercontent.com/78883867/157528242-43402c41-ec0b-448e-aa9b-4b70eae574af.mp4


### Download Exemplo Elgin


https://user-images.githubusercontent.com/78883867/157528283-4c7acaa0-eaa3-4ec3-bb5c-a7bd327cc3e4.mp4


### Abrindo o Exemplo Kotlin


https://user-images.githubusercontent.com/78883867/157528300-f1245e30-dfe7-4403-a5f6-45ebebfd1642.mp4

<hr>

### Instalando o Android Studio


https://user-images.githubusercontent.com/78883867/157525423-408397dd-f592-4e79-926b-a4082b133bb9.mp4


### Baixando o Exemplo e Atualizando o SDK API


https://user-images.githubusercontent.com/78883867/157525546-e50a2e67-db39-4722-844e-714d573304fe.mp4


### Executando o Exemplo Elgin


https://user-images.githubusercontent.com/78883867/157525608-385cef1a-9802-4efa-91a4-732bbf1375fa.mp4

<hr>

## Elgin Pay NFC-e

Essa funcionalidade permite emitir e imprimir notas NFC-e utilizando as bibliotecas da Daruma, especificamente a DarumaMobileFramework.

Para poder utilizar essa função, atualize o seu aplicativo para a última versão.

### Como Testar o apk

<img src="https://user-images.githubusercontent.com/78883867/167141273-f326e76a-810f-4cf3-9261-3543d46b3371.jpeg" alt="Botão configurar" title="Botão configurar" width="200">


Deve ser feita a configuração da nota NFC-e a ser emitida com o botão, após a mensagem de sucesso o botão de envio ficará disponível.
<br>
**Observações Importantes**
<br>
- Um ponto importante é que para a configuração da nota NFC-e é preciso de conexão com a internet, pois o número da nota a ser enviado ao WebService deve ser verificado para tal série, a série "chumbada" no código é a de número 133, e a nota mais alta para essa série é a de número 999385199, portanto antes da configuração ser completada é feita uma verificação para que o número correto seja enviado.
- ao se fazer o envio da venda, duas situações podem ocorrer:
    1. Servidor Migrate com funcionamento normal, então a nota será emitida online com sucesso e será impressa. (Um alert avisando que a nota foi impressa em condições ideais será disparado).
    2. Algum problema com o servidor Migrate, ou algum impedimento no estabelecimento da conexão com o mesmo, a nota será emitida em contingência e será impressa. (Um alert avisando que houve um erro no envio da nota será disparado).

- Como para configurar a NFC-e é necessário a conexão com internet de qualquer forma, para testar o segundo caso faça o seguinte: aperte em "Configurar NFC-e" e em seguida desative o Wifi do POS, em seguida faça o envio da venda. A nota será configurada com sucesso, porém a impressão será em contingência dado que houve algum impedimento no envio.

Logo após a configuração serão preenchidas as informações nas textboxes, conforme a imagem:
<br><br>
<img src="https://user-images.githubusercontent.com/78883867/167141399-06c729e0-6102-4ee4-a0ff-4fa68af454d3.jpeg" alt="Dados da NFC-e configurados" title="Dados da NFC-e configurados" width="200">

### Para utilizar em seu App essa funcionalidade

Os dados para usar a função de NFC-e tem de ser pegos com a Sefaz de seu estado, e no código fonte inserir os seus dados:
<br><br>
<img src="https://user-images.githubusercontent.com/78883867/167141455-b5472345-4fce-4877-ad49-930570a20ff4.jpeg" alt="Classe de configuração da NFC-e no app exemplo" title="Classe de configuração da NFC-e no app exemplo" width="500">
