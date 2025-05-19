import express from 'express';
import { Router } from 'express';
import { getUserById,
         createUser
        //  updateUser,
        //  deleteUser
        } from '../controllers/userController';

const router = Router();

router.get('/:id', getUserById);
router.post('/', createUser);

export default router;
