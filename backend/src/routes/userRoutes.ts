import express from 'express';
import { getUserById,
         createUser
        //  updateUser,
        //  deleteUser
        } from '../controllers/userController';

const router = express.Router();

router.get('/:id', getUserById);
router.post('/', createUser);

export default router;
