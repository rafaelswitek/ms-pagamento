
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

Aqui justificativa.

## Links com os relatórios dos processamentos do OWASP ZAP (antes e após a correção)

 - [Antes](https://drive.google.com/file/d/1IlyXzk6v3-LyMF0739PYIV8EUwbysm-H/view?usp=drive_link)
 - [Depois](https://drive.google.com/file/d/1NxbwyWja7CuOeX6dwDLJ1YdY14LlIZ3X/view?usp=drive_link)

## Link com o relatório RIPD do sistema

 - [RIPD](https://drive.google.com/file/d/1QwHcXojaKHjKTMpnIp0xWjB1zfmLlcNg/view?usp=drive_link)

 ## Link para o desenho da arquitetura

  - [Desenho da arquitetura](https://drive.google.com/drive/folders/1yGdvC0Sts3Vi8ygJf4vMCwODX5S0RhRF?usp=sharing)

 ## Link para o video
 
- Projeto rodando, inclusive com o padrão SAGA funcionando;
- Explicação do padrão SAGA escolhido e sua justificativa;
- Arquitetura da estrutura da nuvem e como a comunicação SAGA está montada.

- [VIDEO](https://drive.google.com/drive/folders/1yGdvC0Sts3Vi8ygJf4vMCwODX5S0RhRF?usp=sharing)