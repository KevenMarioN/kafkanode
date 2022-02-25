# Micro-serviço com Node.js

- Utilizando Kafka;
- Utlizando Node;

## Aplicações

- API principal (Station);
- Geração de certificado;

## Fluxo

- API princiapl envia uma mensagem pro serviço de certificado para gerar o certificado;
- Micro-serviço de certificado devolve uma resposta (sicrona/assincrona);

Se conseguir sicrona/assincrona;

- Receber uma resposta assíncrona de quando o e-mail com certificado foi enviado;

## O que sabemos?

- REST (latência)
- Redis / RabbitMQ / **Kafka**;

- Nubank, Uber, Paypal, Netflix;