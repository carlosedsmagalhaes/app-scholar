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
}

export interface Disciplina {
  id: number;
  nome: string;
  carga_horaria: number;
  semestre: number;
}

export interface DadosBoletim {
  id: string;
  disciplina: Disciplina;
  aluno: Aluno;
  nota1: string;
  nota2: string;
}

export type RootStackParamList = {
  Login: undefined;
  Dashboard: undefined;
  ListAluno: undefined;
  ListProfessor: undefined;
  ListDisciplina: undefined;
  Aluno: { id?: string } | undefined;
  Professor: { id?: string } | undefined;
  Disciplina: { id?: string } | undefined;
  ListBoletim: undefined;
  LancamentoNota: { nota?: DadosBoletim } | undefined; 
};
