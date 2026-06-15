export interface Curso {
  id: number;
  nome: string;
  sigla: string;
  qtd_semestre: number;
}

export interface Aluno {
  id: number;
  nome: string;
  matricula: string;
  curso_id: number;
  semestre: number;
  usuario_id: number;
  usuario: Usuario;
  telefone: string;
  cep: string;
  logradouro: string;
  numero: string;
  bairro: string;
  cidade: string;
  estado: string;
  complemento: string | null;
  curso?: Curso;
}

export interface Disciplina {
  id: number;
  nome: string;
  carga_horaria: number;
  semestre: number;
  professores: Professor_Disciplina[];
  cursos: Curso_Disciplina[];
}

export interface DadosBoletim {
  id: string;
  disciplina: Disciplina;
  aluno: Aluno;
  nota1: string;
  nota2: string;
}

export interface Area {
  id: number;
  descricao: string;
}

export interface Titutulacao {
  id: number;
  descricao: string;
}

export interface Professor {
  id: number;
  nome: string;
  titulacao_id: number;
  usuario_id: number;
  usuario: Usuario;
  area_id: number;
  area: Area;
  titulacao: Titutulacao;
  tempo_docencia: number;
  disciplinas: Disciplina[];
}

export interface Professor_Disciplina {
  id: number;
  professor: Professor;
  disciplina_id: number;
}

export interface Curso_Disciplina {
  id: number;
  curso: Curso;
  disciplina_id: number;
}

export interface Usuario {
  id: number;
  email: string;
  senha: string;
  perfil: "ALUNO" | "PROFESSOR" | "ADMIN";
}

export interface Aviso {
  id: number;
  titulo: string;
  descricao:string;
  prioridade:   "URGENTE" | "IMPORTANTE" | "INFORMATIVO"
}