import { Router } from 'express';
import { login,
         logout,
         getCurrentUser
       } from  '../controllers/authController';
import { validateLogin } from '../validators/validateLogin';
import { requireLogin } from '../middlewares/authMiddleware';

const router = Router();

router.post('/login', validateLogin, login);
router.get('/me', requireLogin, getCurrentUser);
router.post('/logout', requireLogin, logout);


export default router;
