import { Router } from 'express';
import AuthController from '../controllers/AuthController';
import AlunoController from '../controllers/AlunoController';

const router = Router();

router.post('/api/login', AuthController.login);
router.post('/api/alunos', AlunoController.create);
router.get('/api/alunos', AlunoController.getAll);
router.get('/api/alunos/:id', AlunoController.getById);
router.put('/api/alunos/:id', AlunoController.update);
router.delete('/api/alunos/:id', AlunoController.delete);

export default router;