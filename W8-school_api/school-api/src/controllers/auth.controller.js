import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import db from '../models/index.js';

/**
 * @swagger
 * tags:
 *     name: Auth
 *     description: Authentication routes
 */

/**
 * @swagger
 * /auth/register:
 *   post:
 *     summary: Register a new user
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [name, email, password]
 *             properties:
 *               name:
 *                 type: string
 *               email:
 *                 type: string
 *                 format: email
 *               password:
 *                 type: string
 *                 format: password
 *     responses:
 *       201:
 *         description: User registered
 *       400:
 *         description: Email already exists
 */

export const register = async (req, res) => {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
        return res.status(400).json({message: 'All fields are requires'});
    }

    try {
        const existingUser = await db.User.findOne({where: {email} });
        if(existingUser) {
            return res.status(400).json({message: 'Email already in use'});
        }

        const user = await db.User.create({
            name,
            email,
            password
        });

        res.status(201).json({
            message: 'User registered successfully',
            user: {
                id: user.id,
                name: user.name,
                email: user.email,
            },
        });
    }
    catch(err) {
        res.status(500).json({error: err.message });
    }
};

/**
 * @swagger
 * /auth/login:
 *   post:
 *     summary: Login a user
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [email, password]
 *             properties:
 *               email:
 *                 type: string
 *                 format: email
 *               password:
 *                 type: string
 *                 format: password
 *     responses:
 *       200:
 *         description: Successful login
 *       401:
 *         description: Invalid credentials
 *       404:
 *         description: User not found
 */
export const login = async (req, res) => {
    const { email, password } = req.body;

    try {
        const user = await db.User.findOne({ where: { email } });
        if (!user) return res.status(404).json({ error: 'User not found' });

        const match = await bcrypt.compare(password, user.password);
        if (!match) return res.status(401).json({ error: 'Invalid credentials' });
        // jwt.sign(payload,signature,option)
        const token = jwt.sign({ id: user.id, email: user.email }, process.env.JWT_SECRET, {
            expiresIn: '1d',
        });

        res.json({ token, user: { id: user.id, email: user.email } });
    } catch (err) {
        res.status(500).json({ error: 'Login error', details: err.message });
    }
};

/**
 * @swagger
 * /auth/users:
 *   get:
 *     summary: Get all users (protected)
 *     tags: [Auth]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of users
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Forbidden
 */
export const getAllUsers = async (req, res) => {
  try {
    const users = await db.User.findAll({ 
      attributes: ['id', 'email'] 
    });
    res.json(users);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch users' });
  }
};

