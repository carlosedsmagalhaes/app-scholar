import { Router } from 'express';
import AuthController from '../controllers/AuthController';
import AlunoController from '../controllers/AlunoController';
import ProfessorController from '../controllers/ProfessorController';

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

export default router;