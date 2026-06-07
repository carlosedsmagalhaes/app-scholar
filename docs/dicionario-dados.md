## Tabela: Usuario

| Campo | Tipo | Obrigatório | Descrição |
| :--- | :--- | :--- | :--- |
| id | Int (PK) | Sim | Identificador único (Serial) |
| email | String | Sim | E-mail para login (Unique) |
| senha | String | Sim | Hash da senha para autenticação  |
| perfil | Enum Perfil | Sim | Perfil do usuário (ALUNO, PROFESSOR, ADMIN) |
| status | Enum STATUS | Sim | Situação do usuário (ATIVO, INATIVO) |
| reset_token | String | Não | Token único para redefinição de senha |

## Tabela: Aluno

| Campo | Tipo | Obrigatório | Descrição |
| :--- | :--- | :--- | :--- |
| id | Int (PK) | Sim | Identificador único do aluno  |
| nome | String | Sim | Nome completo do aluno  |
| matricula | String | Sim | Matrícula acadêmica única (Unique) |
| curso_id | Int (FK) | Sim | Relacionamento com a tabela Curso |
| usuario_id | Int (FK) | Sim | Relacionamento com a tabela Usuario (Unique) |
| telefone | String | Não | Telefone de contato  |
| cep | String | Sim | Código de Endereçamento Postal  |
| logradouro | String | Não | Nome da rua/avenida  |
| numero | String | Não | Número da residência |
| bairro | String | Não | Bairro do aluno |
| cidade | String | Não | Cidade  |
| estado | String | Não | UF |
| complemento | String | Não | Complemento do endereço |
| status | Enum STATUS | Sim | Situação do aluno (ATIVO, INATIVO) |
| semestre | Int | Sim | Semestre atual do aluno |

## Tabela: Professor

| Campo | Tipo | Obrigatório | Descrição |
| :--- | :--- | :--- | :--- |
| id | Int (PK) | Sim | Identificador único do professor  |
| nome | String | Sim | Nome completo do docente  |
| titulacao_id | Int (FK) | Sim | Relacionamento com a tabela Titulacao  |
| area_id | Int (FK) | Sim | Relacionamento com a tabela Area  |
| usuario_id | Int (FK) | Sim | Relacionamento com a tabela Usuario (Unique) |
| tempo_docencia | Int | Não | Tempo de experiência em anos  |
| status | Enum STATUS | Sim | Situação do professor (ATIVO, INATIVO) |

## Tabela: Disciplina

| Campo | Tipo | Obrigatório | Descrição |
| :--- | :--- | :--- | :--- |
| id | Int (PK) | Sim | Identificador único da disciplina  |
| nome | String | Sim | Nome da disciplina |
| carga_horaria | Int | Sim | Carga horária total  |
| semestre | Int | Sim | Semestre letivo da disciplina  |
| status | Enum STATUS | Sim | Situação da disciplina (ATIVO, INATIVO) |

## Tabela: Notas

| Campo | Tipo | Obrigatório | Descrição |
| :--- | :--- | :--- | :--- |
| id | Int (PK) | Sim | Identificador único do registro  |
| aluno_id | Int (FK) | Sim | Relacionamento com a tabela Aluno  |
| disciplina_id | Int (FK) | Sim | Relacionamento com a tabela Disciplina  |
| nota1 | Decimal(5,2) | Não | Nota da primeira avaliação  |
| nota2 | Decimal(5,2) | Não | Nota da segunda avaliação  |
| media | Decimal(5,2) | Não | Média aritmética calculada  |
| situacao | String | Não | Situação final (Ex: Aprovado)  |

## Tabela: Curso

| Campo | Tipo | Obrigatório | Descrição |
| :--- | :--- | :--- | :--- |
| id | Int (PK) | Sim | Identificador único do curso |
| nome | String | Sim | Nome da graduação |
| sigla | String | Não | Sigla do curso |
| qtd_semestre | Int | Não | Duração total em semestres |
| status | Enum STATUS | Sim | Situação do curso (ATIVO, INATIVO) |

## Tabela: Titulacao

| Campo | Tipo | Obrigatório | Descrição |
| :--- | :--- | :--- | :--- |
| id | Int (PK) | Sim | Identificador único |
| descricao | String | Sim | Descrição do título  |
| status | Enum STATUS | Sim | Situação da titulação (ATIVO, INATIVO) |

## Tabela: Area

| Campo | Tipo | Obrigatório | Descrição |
| :--- | :--- | :--- | :--- |
| id | Int (PK) | Sim | Identificador único |
| descricao | String | Sim | Descrição da área  |
| status | Enum STATUS | Sim | Situação da área (ATIVO, INATIVO) |

## Tabela: Professor_Disciplina (Associativa)

| Campo | Tipo | Obrigatório | Descrição |
| :--- | :--- | :--- | :--- |
| professor_id | Int (FK) | Sim | Relacionamento com Professor |
| disciplina_id | Int (FK) | Sim | Relacionamento com Disciplina |
| chave primária | Composta | Sim | Combinação de professor_id e disciplina_id |

## Tabela: Curso_Disciplina (Associativa)

| Campo | Tipo | Obrigatório | Descrição |
| :--- | :--- | :--- | :--- |
| curso_id | Int (FK) | Sim | Relacionamento com Curso |
| disciplina_id | Int (FK) | Sim | Relacionamento com Disciplina |
| chave primária | Composta | Sim | Combinação de curso_id e disciplina_id |