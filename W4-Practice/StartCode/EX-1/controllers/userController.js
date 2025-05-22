import {
    getAllUsers,
    getUserById,
    addUser,
    updateUser,
    deleteUser
} from '../models/userModel.js';

export const listUsers = (req, res) => {
    res.json(getAllUsers());
};

export const getUser = (req, res) => {
    const id = parseInt(req.params.id);
    const user = getUserById(id);
    if (!user) return res.status(404).json({ error: 'User not found' });
    res.json(user);
};

export const createUser = (req, res) => {
    const { name, email } = req.body;
    if (!name || !email) {
        return res.status(400).json({ error: 'Name and email are required' });
    }
    const newUser = addUser(name, email);
    res.status(201).json(newUser);
};

export const updateUserById = (req, res) => {
    const id = parseInt(req.params.id);
    const { name, email } = req.body;
    const updatedUser = updateUser(id, name, email);
    if (!updatedUser) return res.status(404).json({ error: 'User not found' });
    res.json(updatedUser);
};

export const deleteUserById = (req, res) => {
    const id = parseInt(req.params.id);
    const success = deleteUser(id);
    if (!success) return res.status(404).json({ error: 'User not found' });
    res.status(204).send();
};