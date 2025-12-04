# tech-playground

![Node.js](https://img.shields.io/badge/-Node.js-blue?logo=nodejs&logoColor=white) ![TypeScript](https://img.shields.io/badge/-TypeScript-blue?logo=typescript&logoColor=white) ![License](https://img.shields.io/badge/license-UNLICENSED-green)

Ambiente de playground para desenvolvimento com NestJS, TypeScript, Prisma e PostgreSQL. Prototipação rápida via Docker Compose com banco populado automaticamente.

## Funcionalidades

*   **Coleta de Avaliações de Colaboradores:** Registro de respostas de pesquisa com validações de e-mail, escala Likert,         eNPS (0–10) e data automática de submissão.
*   **Infraestrutura com Docker:** Ambiente padronizado para aplicação e banco de dados via containers Docker.
*   **Imutabilidade das Respostas:** Bloqueio de alterações nos campos de avaliação após o envio da pesquisa,                    garantindo integridade dos dados.
*   **Documentação com Swagger:** Geração automática de documentação completa da API com Swagger, incluindo exemplos             reais de respostas das métricas, facilitando a exploração e testes dos endpoints.
*   **Testes Automatizados:** Testes unitários com Jest cobrindo regras de negócio dos services.
*   **Métricas Corporativas Agregadas:** Cálculo automático de taxa de resposta, médias Likert, favorabilidade e                 distribuição de eNPS com queries agregadas no banco
*   **Coleta de Avaliações de Colaboradores**: Registro de respostas de pesquisa com validações de e-mail, escala Likert          (1–5), eNPS (0–10) e data automática de submissão.

### Pré-requisitos

Certifique-se de ter os seguintes itens instalados:

*   [Git](https://git-scm.com/)
*   [Node.js](https://nodejs.org/) (versão LTS recomendada)
*   [npm](https://www.npmjs.com/) ou [Yarn](https://yarnpkg.com/)
*   [Docker](https://www.docker.com/products/docker-desktop)
*   [Docker Compose](https://docs.docker.com/compose/install/)

### Passo a Passo de Configuração

1.  **Configuração de Ambiente**

    Crie um arquivo `.env` copiando o exemplo fornecido. Esse arquivo armazenará as variáveis de ambiente, como credenciais do banco de dados.

    ```bash
    cp .env.example .env
    # Abra o arquivo .env e ajuste as variáveis se necessário (ex: porta do banco, usuário, senha)
    ```
    
2.  **Instalar Dependências**

    Instale as dependências do projeto usando o gerenciador de pacotes de sua preferência:

    ```bash
    # Usando npm
    # npm install

    # Ou usando Yarn
     yarn install
    ```
    **Importante**:  Se for desenvolver ou testar localmente, sempre execute o`yarn prisma generate` após `yarn install`         para gerar o Prisma Client localmente.
   

4.  **Iniciar Serviços do Docker**

    O projeto utiliza Docker para facilitar o setup do ambiente, incluindo o backend NestJS e o banco de dados PostgreSQL. 
    Para desenvolvimento (com hot reload), execute o projeto completo com um único comando: 

    ```bash
    docker compose up --build
    ```

    O processo automático inclui:

      -   Criação do banco `tech_playground` com usuário/senha que foram definidas no .env.
          
      -   Execução do `00_initsql.sql` (cria extensão pgcrypto e tabela employees)
          
      -   Importação automática do CSV via `01_import.sql` (popula tabela employees)
          
      -   Geração do Prisma client e inicialização do backend na porta `3000`.
  
7.  **Iniciar a Aplicação localmente**

    ```bash
    # Usando npm
    #npm run start:dev

    # Ou usando Yarn
     yarn start:dev
    ```

    A aplicação estará disponível em `http://localhost:3000`.

8.  **Acessando a API**

O projeto `tech-playground` inclui o Swagger UI para exploração da API. Acesse pelo navegador:

*   **Swagger UI:** `http://localhost:3000/api/docs`

