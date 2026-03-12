<h1 align="center">
  🚀 Blog Posts API 
</h1>

<p align="center">
  <img alt="Node.js" src="https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white"/>
  <img alt="Express" src="https://img.shields.io/badge/Express.js-000000?style=for-the-badge&logo=express&logoColor=white"/>
  <img alt="PostgreSQL" src="https://img.shields.io/badge/PostgreSQL-316192?style=for-the-badge&logo=postgresql&logoColor=white"/>
  <img alt="Docker" src="https://img.shields.io/badge/Docker-2CA5E0?style=for-the-badge&logo=docker&logoColor=white"/>
</p>

> Uma API RESTful desenvolvida com Node.js e Express para gerenciamento de postagens de blog, focada na aplicação prática da arquitetura MVC.

## 📖 Sobre o Projeto
Este projeto nasceu como uma iniciativa **didática** para consolidar conhecimentos em desenvolvimento backend. O objetivo principal foi ir além do básico, evoluindo de um CRUD em memória para uma aplicação estruturada.

A API permite a criação, leitura, atualização e exclusão de posts de um blog, persistindo os dados de forma segura em um banco de dados **PostgreSQL**, cujo ambiente é perfeitamente orquestrado via **Docker**.

### ✨ Principais Características
- **Arquitetura MVC:** Separação clara de responsabilidades (Rotas, Controllers e Models).
- **Tratamento Global de Erros:** Middleware dedicado para capturar falhas de forma padronizada.
- **Auto-criação de Tabelas:** Script inteligente que assegura a integridade do banco inicializando as tabelas automaticamente.
- **Infraestrutura com Docker:** Um `compose.yaml` pronto para subir o PostgreSQL com um único comando.

## 🛠️ Tecnologias Utilizadas
- **[Node.js](https://nodejs.org/)** - Ambiente de execução Javascript.
- **[Express](https://expressjs.com/)** - Framework minimalista para a criação das rotas e middlewares da API.
- **[PostgreSQL (`pg`)](https://node-postgres.com/)** - Banco de Dados relacional.
- **[Docker / Docker Compose](https://www.docker.com/)** - Para abstração e containerização do Banco de Dados.
- **[Zod](https://zod.dev/) e [CORS](https://expressjs.com/en/resources/middleware/cors.html)** - Segurança e estrutura.

---

## ⚙️ Como Executar Localmente

Siga o passo a passo abaixo para rodar o projeto na sua máquina. 

**Pré-requisitos:**
* [Node.js](https://nodejs.org/en/download/) (v18 ou superior)
* [Docker e Docker Compose](https://docs.docker.com/get-docker/)

### 1. Clonar e Instalar
```bash
# Clone este repositório
$ git clone https://github.com/Cleber-Victor/Test-API.git

# Acesse a pasta do projeto
$ cd Test-API

# Instale as dependências
$ npm install
```

### 2. Configurar Variáveis de Ambiente
Crie um arquivo `.env` na raiz do projeto contendo as credenciais de acesso ao banco (ou utilize o mesmo do seu `compose.yaml`):

```env
DB_USER=seu_usuario
DB_PASSWORD=sua_senha
DB_HOST=localhost
DB_NAME=seu_banco
DB_PORT=5432
```

### 3. Subir o Banco de Dados (Docker)
Inicie o container do PostgreSQL em background:
```bash
$ docker compose -f infra/compose.yaml up -d
```

### 4. Rodar a Aplicação
Inicie o servidor de desenvolvimento:
```bash
$ npm run dev
```
A API estará rodando em: `http://localhost:3000`. 🎉

---

## 📡 Endpoints (Rotas da API)

Aqui estão as rotas disponíveis para interagir com a aplicação:

| Método | Rota                | Descrição                             | Parâmetros Body (JSON) |
|--------|---------------------|---------------------------------------|-------------------------|
| `POST` | `/api/posts`        | Cria um novo post no blog             | `title`, `body`         |
| `GET`  | `/api/posts`        | Retorna a lista de todos os posts     | -                       |
| `GET`  | `/api/posts/:id`    | Retorna um post específico pelo ID    | -                       |
| `PUT`  | `/api/posts/:id`    | Atualiza o título de um post existente| `title`                 |
| `DELETE`| `/api/posts/:id`   | Deleta um post do banco de dados      | -                       |

### 📝 Exemplo de Requisição (Criar Post)
```json
// POST /api/posts
{
  "title": "Aprenda MVC!",
  "body": "A Arquitetura MVC separa o código em Models, Views e Controllers."
}
```

---

<p align="center">
  Desenvolvido com ☕ e dedicação por <a href="https://github.com/Cleber-Victor">Cleber Victor</a>.
</p>