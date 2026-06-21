# 📡 Central de Rastreio - Backend

![TypeScript](https://img.shields.io/badge/typescript-%23007ACC.svg?style=for-the-badge&logo=typescript&logoColor=white)
![NodeJS](https://img.shields.io/badge/node.js-%23339933.svg?style=for-the-badge&logo=node.js&logoColor=white)
![Fastify](https://img.shields.io/badge/fastify-%23000000.svg?style=for-the-badge&logo=fastify&logoColor=white)
![MongoDB](https://img.shields.io/badge/MongoDB-%2347A248.svg?style=for-the-badge&logo=mongodb&logoColor=white)

API robusta e de alta performance desenvolvida para gerenciar sistemas de rastreamento. O projeto utiliza uma arquitetura moderna com validação estrita de dados, tipagem estática e conexão assíncrona com banco de dados NoSQL.

## 🚀 Tecnologias Utilizadas

O ecossistema do projeto foi construído com as seguintes tecnologias e bibliotecas:

- **[Node.js](https://nodejs.org/)** (v18+) - Ambiente de execução JavaScript Server-side.
- **[TypeScript](https://www.typescriptlang.org/)** (v6.0+) - Superset JavaScript que adiciona tipagem estática ao código.
- **[Fastify](https://www.fastify.io/)** / **[Express](https://expressjs.com/)** - Frameworks web focados em performance, flexibilidade e baixo overhead.
- **[Mongoose](https://mongoosejs.com/)** (v9.7+) - Biblioteca de modelagem de dados (ODM) para MongoDB.
- **[Zod](https://zod.dev/)** - Schema validation moderno com inferência de tipos estáticos para TypeScript.
- **[TSX](https://github.com/privatealchemist/tsx)** - Executor TypeScript ultra-rápido para ambiente de desenvolvimento.

---

## 📋 Pré-requisitos

Antes de iniciar, certifique-se de ter instalado em sua máquina:
- [Node.js](https://nodejs.org/) (Versão LTS recomendada)
- [NPM](https://www.npmjs.com/) ou [Yarn](https://yarnpkg.com/)
- Instância do [MongoDB](https://www.mongodb.com/) (Local ou MongoDB Atlas)

---

## 🔧 Configuração e Instalação

1. **Clone o repositório:**
   
2. Instale as dependências:
   npm install

3. Configuração das Variáveis de Ambiente:
Crie um arquivo .env na raiz do projeto (utilize o arquivo .env.example se disponível como base) e configure suas variáveis:

PORT=3333
MONGO_URI="sua_string_de_conexao_do_mongodb"

🏃‍♂️ Como Executar o Projeto
O projeto possui comandos predefinidos para facilitar o fluxo de desenvolvimento e deploy:

Modo de Desenvolvimento (Hot-reload)
Para rodar a aplicação em modo de desenvolvimento com reinicialização automática a cada alteração:

npm run dev


Popular o Banco de Dados (Seed)
Caso precise rodar scripts de sementes para dados iniciais ou testes no banco de dados:

npm run seed

Build (Produção)
Para compilar o código TypeScript em JavaScript otimizado dentro da pasta dist:

npm run build

Iniciar em Produção
Após realizar o build, use este comando para iniciar o servidor de produção:

Bash
npm start

📁 Estrutura de Pastas Sugerida
Para manter o projeto profissional, recomenda-se a seguinte estrutura dentro de src/:

Plaintext
├── dist/                  # Código JavaScript compilado (Produção)
├── src/
│   ├── config/            # Configurações de banco de dados e variáveis
│   ├── controllers/       # Orquestradores das requisições e respostas
│   ├── models/            # Schemas e Models do Mongoose (MongoDB)
│   ├── routes/            # Definição das rotas da API
│   ├── schemas/           # Validações de dados com Zod
│   ├── seed.ts            # Script de população do banco de dados
│   └── server.ts          # Arquivo de inicialização do servidor
├── .env                   # Variáveis de ambiente (Não versionado)
├── tsconfig.json          # Configurações do compilador TypeScript
└── package.json           # Dependências e scripts do projeto

   ```bash
   git clone [https://github.com/seu-usuario/central-rastreio-backend.git](https://github.com/seu-usuario/central-rastreio-backend.git)
   cd central-rastreio-backend
