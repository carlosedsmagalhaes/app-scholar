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
  usuario_id: number;
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
  area_id: number;
  area: Area;
  titulacao: Titutulacao;
  disciplinas: Disciplina[];
}

export interface Professor_Disciplina {
  id: number;
  professor: Professor;
  disciplina_id: number;
}

export type RootStackParamList = {
  Login: undefined;
  Dashboard: undefined;
  ListAluno: undefined;
  ListProfessor: undefined;
  ListDisciplina: undefined;
  Aluno: { id?: number } | undefined;
  Professor: { id?: number } | undefined;
  Disciplina: { id?: number } | undefined;
  ListBoletim: undefined;
  LancamentoNota: { nota?: DadosBoletim } | undefined; 
};
