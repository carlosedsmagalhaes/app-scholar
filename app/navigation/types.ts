import { DadosBoletim } from "../types/index";

export type RootStackParamList = {
  Login: undefined;
  Dashboard: undefined;
  ListAluno: undefined;
  ListProfessor: undefined;
  ListDisciplina: undefined;
  ListBoletim: undefined;
  ListAviso: undefined;
  Aluno: { id?: number } | undefined;
  Professor: { id?: number } | undefined;
  Disciplina: { id?: number } | undefined;
  LancamentoNota: { nota?: DadosBoletim } | undefined;
  Aviso: { id?: number } | undefined;
  ForgotPassword: undefined;
  ResetPassword: undefined; 
};
