import express from 'express';
import {register, login, getAllUsers} from '../controllers/auth.controller.js';
import { authenticateToken } from '../middlewares/auth.middleware.js';    
import db from '../models/index.js';

const router = express.Router();

router.post('/register', register);
router.post('/login', login);

//Apply the middleware to protect existing routes
router.get('/users', authenticateToken, getAllUsers);




export default router;