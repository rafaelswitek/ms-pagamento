<p align="center">
<img loading="lazy" src="./public/POSTECH.gif"/>
</p>

<p align="center">
  <img src="https://img.shields.io/static/v1?label=TypeScript&message=framework&color=blue&style=for-the-badge&logo=typescript"/>
  <img src="https://img.shields.io/static/v1?label=AWS&message=deploy&color=green&style=for-the-badge&logo=aws"/>
  <img src="https://img.shields.io/static/v1?label=Docker&message=container&color=blue&style=for-the-badge&logo=docker"/>
  <img src="https://img.shields.io/static/v1?label=Kubernetes&message=orquestração&color=blue&style=for-the-badge&logo=kubernetes"/>
  <img src="https://img.shields.io/static/v1?label=express&message=4.18.2&color=red&style=for-the-badge&logo=express"/>
  <img src="https://img.shields.io/static/v1?label=mysql&message=3.7.0&color=green&style=for-the-badge&logo=mysql"/>
</p>

> :construction: FASE 5 - DADOS E SEGURANÇA DA INFORMAÇÃO :construction:

### Tópicos

- [Descrição do projeto](#descrição-do-projeto)

- [Funcionalidades](#funcionalidades)

- [Como rodar a aplicação](#como-rodar-a-aplicação-arrow_forward)

- [Pré-requisitos(Docker)](#pré-requisitos-com-docker)

- [Pré-requisitos(Node)](#pré-requisitos-com-node)

- [Swagger](#swagger)

- [Estrutura](#estrutura)

- [Membros](#membros)

## Descrição do projeto

> Este projeto foi desenvolvido no curso de Pós Graduação de Arquitetura de Software da [Fiap](fiap.com.br). Este é um microserviçoe nele é utilizado a arquitetura hexagonal e é escrito em TypeScript, os dados são salvos em um banco SQL, o MySQL, é utilizado containers com o Docker e a orquestração dos containers é feita com Kubernetes.

## Funcionalidades

:heavy_check_mark: Gerar um QR Code para receber pagamento atravez do Mercado Pago

## Como rodar a aplicação :arrow_forward:

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

### Scripts Disponíveis

- start: Inicia o servidor Node.js após observar alterações nos arquivos TypeScript usando o pacote tsc-watch. O servidor é iniciado através do arquivo server.js localizado na pasta build.
- lint: Executa o ESLint para analisar e corrigir automaticamente problemas no código-fonte, promovendo boas práticas de codificação.
- format: Utiliza o Prettier para aplicar formatação consistente ao código do projeto, garantindo uma aparência uniforme e legível.
- test: Executa todos os testes definidos no projeto usando o Jest, um framework popular para testes em JavaScript e TypeScript.
- coverage: Executa os testes e gera um relatório de cobertura usando o Jest, fornecendo insights sobre a extensão dos testes no código.
- coverage:report: Abre o relatório de cobertura gerado pelo Jest no navegador padrão, facilitando a visualização e análise da cobertura de código.

Certifique-se de ter as dependências instaladas antes de executar os scripts.

#### Uso

Para executar o projeto, utilize um dos seguintes comandos:

Para iniciar o servidor Express:

```shell
npm start
```

## Swagger

Para abrir o swagger vá para o navegador e abra o link [http://localhost/](http://localhost/)

## Estrutura

```bash
├── Dockerfile
├── README.md
├── __tests__
|  ├── app
|  |  └── controllers
|  |     └── CriarPagamentoController.test.ts
|  ├── domain
|  |  ├── entities
|  |  |  └── Pagamento.test.ts
|  |  └── useCases
|  |     ├── AtualizarPagamentoUseCase.test.ts
|  |     ├── BuscarPagamentoUseCase.test.ts
|  |     ├── CriarPagamentoUseCase.test.ts
|  |     ├── ListarPagamentoUseCase.test.ts
|  |     └── RemoverPagamentoUseCase.test.ts
|  └── infra
|     ├── repositories
|     |  └── PagamentoRepositoryEmMemoria.test.ts
|     └── services
|        └── MercadoPagoService.test.ts
├── docker-compose.yml
├── package-lock.json
├── package.json
├── server.ts
├── src
|  ├── app
|  |  ├── controllers
|  |  |  ├── AtualizarPagamentoController.ts
|  |  |  ├── BuscarPagamentoController.ts
|  |  |  ├── CriarPagamentoController.ts
|  |  |  ├── ListarPagamentoController.ts
|  |  |  ├── RemoverPagamentoController.ts
|  |  |  └── WebhookController.ts
|  |  ├── dtos
|  |  |  ├── mercadoPago.dto.ts
|  |  |  └── pagamento.dto.ts
|  |  └── rotas
|  |     └── index.ts
|  ├── app.ts
|  ├── domain
|  |  ├── entities
|  |  |  └── Pagamento.ts
|  |  ├── enums
|  |  |  ├── FormasPagamentoEnum.ts
|  |  |  └── StatusPagamentoEnum.ts
|  |  |  └── StatusPedidoEnum.ts
|  |  ├── interfaces
|  |  |  ├── HttpClient.ts
|  |  |  ├── InterfacePagamentoRepository.ts
|  |  |  ├── InterfacePagamentoResposta.ts
|  |  |  └── InterfaceWebhook.ts
|  |  └── useCases
|  |     ├── AtualizarPagamentoUseCase.ts
|  |     ├── BuscarPagamentoUseCase.ts
|  |     ├── CriarPagamentoUseCase.ts
|  |     ├── ListarPagamentoUseCase.ts
|  |     ├── RemoverPagamentoUseCase.ts
|  |     └── WebhookUseCase.ts
|  └── infra
|     ├── adapters
|     |  └── AxiosAdapter.ts
|     ├── config
|     |  └── dataSource.ts
|     ├── repositories
|     |  ├── PagamentoRepository.ts
|     |  └── PagamentoRepositoryEmMemoria.ts
|     └── services
|        └── MercadoPagoService.ts
├── tsconfig.json
└── yarn.lock
```

# Membros

| [<img loading="lazy" src="https://avatars.githubusercontent.com/u/31369320?v=4" width=115><br><sub>André Luiz Silveira Lucas</sub>](https://github.com/andre-luiz1997) | [<img loading="lazy" src="https://avatars.githubusercontent.com/u/23386215?v=4" width=115><br><sub>Bruno Vinicius</sub>](https://github.com/bviniciusilva) | [<img loading="lazy" src="https://avatars.githubusercontent.com/u/6961415?v=4" width=115><br><sub>Rafael Gonçalves Pena</sub>](https://github.com/rafaelswitek) | [<img loading="lazy" src="https://avatars.githubusercontent.com/u/32496280?v=4" width=115><br><sub>Rodrigo Padilha</sub>](https://github.com/RodrigoPadilha) | [<img loading="lazy" src="https://avatars.githubusercontent.com/u/?v=4" width=115><br><sub>Thauã</sub>](https://github.com/) |
| :--------------------------------------------------------------------------------------------------------------------------------------------------------------------: | :--------------------------------------------------------------------------------------------------------------------------------------------------------: | :-------------------------------------------------------------------------------------------------------------------------------------------------------------: | :----------------------------------------------------------------------------------------------------------------------------------------------------------: | :--------------------------------------------------------------------------------------------------------------------------: |
