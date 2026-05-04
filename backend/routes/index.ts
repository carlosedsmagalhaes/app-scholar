import { Router } from 'express';
import AuthController from '../controllers/AuthController';
import AlunoController from '../controllers/AlunoController';
import ProfessorController from '../controllers/ProfessorController';
import DisciplinaController from '../controllers/DisciplinaController';
import NotasController from '../controllers/NotasController'; 
import { authMiddleware } from '../middlewares/auth';
import { checkRole } from '../middlewares/checkRole';
import { Perfil } from '@prisma/client';

const router = Router();

router.post('/api/login', AuthController.login);
router.get('/usuarios/perfil', authMiddleware, (req, res) => {
  return res.json({ ok: true }); 
});
router.use(authMiddleware);
router.post('/api/alunos', checkRole([Perfil.ADMIN]), AlunoController.create);
router.get('/api/alunos', checkRole([Perfil.ADMIN]), AlunoController.getAll);
router.get('/api/alunos/:id', checkRole([Perfil.ADMIN]), AlunoController.getById);
router.put('/api/alunos/:id', checkRole([Perfil.ADMIN]), AlunoController.update);
router.delete('/api/alunos/:id', checkRole([Perfil.ADMIN]), AlunoController.delete);
router.post('/api/professores', checkRole([Perfil.ADMIN]), ProfessorController.create);
router.get('/api/professores', checkRole([Perfil.ADMIN]), ProfessorController.getAll);
router.get('/api/professores/:id', checkRole([Perfil.ADMIN]), ProfessorController.getById);
router.put('/api/professores/:id', checkRole([Perfil.ADMIN]), ProfessorController.update);
router.delete('/api/professores/:id', checkRole([Perfil.ADMIN]), ProfessorController.delete);
router.post('/api/disciplinas', checkRole([Perfil.ADMIN]), DisciplinaController.create);
router.get('/api/disciplinas', checkRole([Perfil.ADMIN, Perfil.PROFESSOR, Perfil.ALUNO]), DisciplinaController.getAll);
router.get('/api/disciplinas/:id', checkRole([Perfil.ADMIN]), DisciplinaController.getById);
router.put('/api/disciplinas/:id', checkRole([Perfil.ADMIN]), DisciplinaController.update);
router.delete('/api/disciplinas/:id', checkRole([Perfil.ADMIN]), DisciplinaController.delete);
router.post('/api/notas', checkRole([Perfil.ADMIN, Perfil.PROFESSOR]), NotasController.upsert);
router.get('/api/notas/aluno/:alunoId', checkRole([Perfil.ADMIN, Perfil.PROFESSOR, Perfil.ALUNO]), NotasController.getByAluno);
router.get('/api/notas/:id', checkRole([Perfil.ADMIN, Perfil.PROFESSOR]), NotasController.getById);

export default router;