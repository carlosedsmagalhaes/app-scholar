import { Router } from 'express';
import AuthController from '../controllers/AuthController';
import AlunoController from '../controllers/AlunoController';
import ProfessorController from '../controllers/ProfessorController';
import DisciplinaController from '../controllers/DisciplinaController';
import NotasController from '../controllers/NotasController'; 

const router = Router();

router.post('/api/login', AuthController.login);
router.post('/api/alunos', AlunoController.create);
router.get('/api/alunos', AlunoController.getAll);
router.get('/api/alunos/:id', AlunoController.getById);
router.put('/api/alunos/:id', AlunoController.update);
router.delete('/api/alunos/:id', AlunoController.delete);
router.post('/api/professores', ProfessorController.create);
router.get('/api/professores', ProfessorController.getAll);
router.get('/api/professores/:id', ProfessorController.getById);
router.put('/api/professores/:id', ProfessorController.update);
router.delete('/api/professores/:id', ProfessorController.delete);
router.post('/api/disciplinas', DisciplinaController.create);
router.get('/api/disciplinas', DisciplinaController.getAll);
router.get('/api/disciplinas/:id', DisciplinaController.getById);
router.put('/api/disciplinas/:id', DisciplinaController.update);
router.delete('/api/disciplinas/:id', DisciplinaController.delete);
router.post('/api/notas', NotasController.upsert);
router.get('/api/notas/aluno/:alunoId', NotasController.getByAluno);
router.get('/api/notas/:id', NotasController.getById);

export default router;