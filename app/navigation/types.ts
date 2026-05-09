import { DadosBoletim } from "../types/index";

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
  ForgotPassword: undefined;
  ResetPassword: undefined; 
};
