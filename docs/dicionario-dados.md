## Tabela: Usuario

| Campo | Tipo | Obrigatório | Descrição |
| :--- | :--- | :--- | :--- |
| id | Int (PK) | Sim | Identificador único (Serial) |
| email | String | Sim | E-mail para login (Unique) |
| senha | String | Sim | Hash da senha para autenticação  |
| perfil | String | Sim | Perfil do usuário (aluno, professor, admin)  |

## Tabela: Aluno

| Campo | Tipo | Obrigatório | Descrição |
| :--- | :--- | :--- | :--- |
| id | Int (PK) | Sim | Identificador único do aluno  |
| nome | String | Sim | Nome completo do aluno  |
| matricula | String | Sim | Matrícula acadêmica única  |
| curso_id | Int (FK) | Sim | Relacionamento com a tabela Curso |
| usuario_id | Int (FK) | Sim | Relacionamento com a tabela Usuario |
| telefone | String | Não | Telefone de contato  |
| cep | String | Sim | Código de Endereçamento Postal  |
| logradouro | String | Não | Nome da rua/avenida  |
| numero | String | Não | Número da residência |
| bairro | String | Não | Bairro do aluno |
| cidade | String | Não | Cidade  |
| estado | String | Não | UF |
| complemento | String | Não | Complemento do endereço |

## Tabela: Professor

| Campo | Tipo | Obrigatório | Descrição |
| :--- | :--- | :--- | :--- |
| id | Int (PK) | Sim | Identificador único do professor  |
| nome | String | Sim | Nome completo do docente  |
| titulacao_id | Int (FK) | Sim | Relacionamento com a tabela Titulacao  |
| area_id | Int (FK) | Sim | Relacionamento com a tabela Area  |
| usuario_id | Int (FK) | Sim | Relacionamento com a tabela Usuario |
| tempo_docencia | Int | Não | Tempo de experiência em anos  |

## Tabela: Disciplina

| Campo | Tipo | Obrigatório | Descrição |
| :--- | :--- | :--- | :--- |
| id | Int (PK) | Sim | Identificador único da disciplina  |
| nome | String | Sim | Nome da disciplina [cite: 60] |
| carga_horaria | Int | Sim | Carga horária total  |
| semestre | Int | Sim | Semestre letivo da disciplina  |

## Tabela: Notas

| Campo | Tipo | Obrigatório | Descrição |
| :--- | :--- | :--- | :--- |
| id | Int (PK) | Sim | Identificador único do registro  |
| aluno_id | Int (FK) | Sim | Relacionamento com a tabela Aluno  |
| disciplina_id | Int (FK) | Sim | Relacionamento com a tabela Disciplina  |
| nota1 | Decimal | Não | Nota da primeira avaliação  |
| nota2 | Decimal | Não | Nota da segunda avaliação  |
| media | Decimal | Não | Média aritmética calculada  |
| situacao | String | Não | Situação final (Ex: Aprovado)  |

## Tabela: Curso

| Campo | Tipo | Obrigatório | Descrição |
| :--- | :--- | :--- | :--- |
| id | Int (PK) | Sim | Identificador único do curso |
| nome | String | Sim | Nome da graduação |
| qtd_semestre | Int | Não | Duração total em semestres |

## Tabela: Titulacao

| Campo | Tipo | Obrigatório | Descrição |
| :--- | :--- | :--- | :--- |
| id | Int (PK) | Sim | Identificador único |
| descricao | String | Sim | Descrição do título  |

## Tabela: Area

| Campo | Tipo | Obrigatório | Descrição |
| :--- | :--- | :--- | :--- |
| id | Int (PK) | Sim | Identificador único |
| descricao | String | Sim | Descrição da área  |

## Tabela: Professor_Disciplina (Associativa)

| Campo | Tipo | Obrigatório | Descrição |
| :--- | :--- | :--- | :--- |
| professor_id | Int (FK) | Sim | Relacionamento com Professor |
| disciplina_id | Int (FK) | Sim | Relacionamento com Disciplina |

## Tabela: Curso_Disciplina (Associativa)

| Campo | Tipo | Obrigatório | Descrição |
| :--- | :--- | :--- | :--- |
| curso_id | Int (FK) | Sim | Relacionamento com Curso |
| disciplina_id | Int (FK) | Sim | Relacionamento com Disciplina |