
# Pagamento

Este projeto foi desenvolvido no curso de Pós Graduação de Arquitetura de Software da Fiap. Este é um microserviçoe nele é utilizado a arquitetura hexagonal e é escrito em TypeScript, os dados são salvos em um banco SQL, o MySQL, é utilizado containers com o Docker e a orquestração dos containers é feita com Kubernetes.

## Instruções para rodar a aplicação

## Pré requisitos com Docker

:warning: [Docker](https://www.docker.com/)

Para iniciar o projeto utilizando a configuração deixada no Dockerfile
Já com o Docker instalado na máquina, abra um terminal e insira o seguinte comando:

```shell
docker-compose -f .\docker-compose.yaml up
```

ou apenas:

```shell
docker-compose up -d
```

## Pré requisitos com Node

:warning: [Node.js](https://nodejs.org/en/download) | [NPM](https://www.npmjs.com/)

### Instalação

1. Clone este repositório em sua máquina:

   ```shell
   git clone https://github.com/rafaelswitek/ms-pagamento.git
    cd ms-pagamento
    npm install
   ```

## Justificativa do Padrão SAGA escolhido

Por se um cenário de uma saga simples, com poucas operações, realizamos a escolha da saga coreografada para o nosso projeto.
A coreografia permite que cada serviço adapte sua parte da transação com base nos eventos que ocorrem em tempo real. Isso permite uma maior flexibilidade para lidar com casos de uso complexos e cenários de exceção. Os serviços permanecem desacoplados e independentes uns dos outros. Eles não precisam se comunicar diretamente para coordenar a transação, o que reduz a complexidade e facilita a manutenção e escalabilidade do sistema. Como cada serviço pode operar de forma independente, é mais fácil escalar partes específicas do sistema conforme necessário, sem afetar outras partes. Em resumo, o padrão SAGA coreografada oferece uma abordagem mais flexível e distribuída para coordenar transações em um ambiente de microserviços e mensageria, mantendo os serviços desacoplados e independentes uns dos outros. Isso resulta em sistemas mais escaláveis, resilientes e flexíveis.A coreografia permite que cada serviço adapte sua parte da transação com base nos eventos que ocorrem em tempo real. Isso permite uma maior flexibilidade para lidar com casos de uso complexos e cenários de exceção. Os serviços permanecem desacoplados e independentes uns dos outros. Eles não precisam se comunicar diretamente para coordenar a transação, o que reduz a complexidade e facilita a manutenção e escalabilidade do sistema. Como cada serviço pode operar de forma independente, é mais fácil escalar partes específicas do sistema conforme necessário, sem afetar outras partes. Em resumo, o padrão SAGA coreografada oferece uma abordagem mais flexível e distribuída para coordenar transações em um ambiente de microserviços e mensageria, mantendo os serviços desacoplados e independentes uns dos outros. Isso resulta em sistemas mais escaláveis, resilientes e flexíveis.

## Links com os relatórios dos processamentos do OWASP ZAP (antes e após a correção)

 - [Relatórios](https://drive.google.com/drive/folders/1pJjhw0QPAzLBOyBY4ikpfnUWOcGlHmzp?usp=sharing)


## Link com o relatório RIPD do sistema

 - [RIPD](https://drive.google.com/file/d/1QwHcXojaKHjKTMpnIp0xWjB1zfmLlcNg/view?usp=sharing)

 ## Link para o desenho da arquitetura

  - [Desenho da arquitetura](https://drive.google.com/file/d/1NQ8dryi6pV_g6jYlQqqKA2JAvkYT4xku/view?usp=sharing)

 ## Link para o video
 
- Projeto rodando, inclusive com o padrão SAGA funcionando;
- Explicação do padrão SAGA escolhido e sua justificativa;
- Apresentação do cluster,infra estrutura e chamada das rotinas pelas APIs na AWS: [VIDEO](https://youtu.be/8MXB1xWqfrE)
- Apresentação da aplicação e padrão SAGA: [VIDEO](https://youtu.be/Gy2Mrp_-068)
