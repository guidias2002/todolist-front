# Todo List - Frontend

Este projeto é um sistema de gerenciamento de tarefas desenvolvido com React e TypeScript. Ele permite que os usuários se cadastrem, façam login e gerenciem suas tarefas de forma intuitiva.

## Tecnologias Utilizadas

- React.js
- TypeScript
- Material-UI (para UI/UX)
- Tailwind CSS (para UI/UX)
- React Router (para navegação)
- Axios (para chamadas à API)

## Funcionalidades

### Cadastro de Usuários
- Criar uma conta (registro com nome, e-mail e senha) ✅
- Tela de login com e-mail e senha ✅

### Gerenciamento de Tarefas
- Criar, editar, excluir e listar tarefas ✅
- Cada tarefa contém:
  - **Título** ✅
  - **Descrição** ✅
  - **Status** (Pendente, Em Andamento, Concluído) ✅
  - **Data de vencimento** ✅
- Apenas o criador da tarefa pode editá-la ou excluí-la ✅

### Filtragem e Ordenação
- Filtrar tarefas por status ✅
- Ordenar tarefas por data de vencimento ✅

## Estrutura das Páginas

A aplicação possui três páginas principais:

1. **Login:** Tela onde os usuários inserem e-mail e senha para acessar a aplicação.
2. **Cadastro:** Tela para criação de nova conta.
3. **Main Page:** Página principal onde as tarefas são listadas, podendo ser filtradas, ordenadas e gerenciadas.

## Como Rodar o Projeto

### Pré-requisitos
Certifique-se de ter instalado:
- [Node.js](https://nodejs.org/)
- Gerenciador de pacotes npm ou yarn

### Passos para execução

1. Clone este repositório:
   ```sh
   git clone https://github.com/guidias2002/todolist-front.git
   ```
2. Acesse o diretório do projeto:
   ```sh
   cd todolist-front
   ```
3. Instale as dependências:
   ```sh
   npm install  
   # ou
   yarn install
   ```
4. Inicie o servidor de desenvolvimento:
   ```sh
   npm run dev  
   # ou
   yarn dev
   ```
5. Acesse no navegador: `http://localhost:sua-porta`

