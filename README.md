

# App Scholar - Gerenciamento de Boletim Acadêmico

Sistema mobile multiplataforma para gestão de informações acadêmicas, desenvolvido como atividade avaliativa para a disciplina de **Programação para Dispositivos Móveis I** na **Fatec Jacareí**.

## 📱 Sobre o Projeto
O **App Scholar** permite a autenticação de usuários, cadastro de alunos, professores e disciplinas, além da consulta detalhada de boletins acadêmicos.

---

## 🛠️ Tecnologias Utilizadas

### Mobile (Frontend)
* **React Native** com **Expo** 
* **TypeScript** 
* **React Navigation** (Stack/Native) 
* **Axios** (Para consumo de APIs) 

### Backend & Database
* **Node.js** com **Express.js** 
* **PostgreSQL** 
* **JWT** (JSON Web Token para autenticação) 

### APIs Externas
* **ViaCEP:** Preenchimento automático de endereços.
* **IBGE Localidades:** Listagem dinâmica de estados e cidades.

---

## 🚀 Comandos Utilizados no Desenvolvimento

### 1. Inicialização do App Mobile
Estes foram os comandos executados para criar a estrutura base do aplicativo:
```bash
npm i create-expo-app -g

npm list -g

npx create-expo-app app --template expo-template-blank-typescript
```

### 2. Configuração do Backend
Para iniciar o servidor que processará as requisições:
```bash
npm init -y

npm install express dotenv cors

npm install -D @types/express @types/node

npx tsc --init

**Prisma (ORM):**
npm install prisma --save-dev

npm install @prisma/client

npx prisma init

npx prisma migrate dev

npx prisma db seed

```

---

**Configuração Prisma v7:**
- Ajustar o `tsconfig.json` com `moduleResolution: "nodenext"` para suporte ao Prisma 7 e arquivos de configuração `.ts`.
- Remover a linha `url` do bloco `datasource` no `schema.prisma`.

## 🔗 Links do Projeto
* **Apresentação:** [Demonstração do projeto](https://youtu.be/r45FKyoPgtQ)
* **Apresentação do código-fonte:** [Breve demonstração do código-fonte](https://youtu.be/8dnticig8tM)
* **APK para download:** [Download do aplicativo](https://expo.dev/accounts/carlos_magalhaes/projects/app-scholar/builds/04f749b6-1634-4338-a19f-1652e1e0a6c3)

## 🗄️ Modelagem do Banco de Dados
O sistema utiliza as seguintes tabelas principais:
* `Usuario`: Credenciais e perfis (aluno/professor/admin).
* `Aluno`: Dados pessoais e vínculo acadêmico.
* `Professor`: Informações de titulação e área de atuação.
* `Disciplina`: Carga horária e professor responsável.
* `Notas`: Registro de avaliações e situação final.

---
