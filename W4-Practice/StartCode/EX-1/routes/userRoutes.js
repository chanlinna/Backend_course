import express from "express";
import {
    listAllUsers,
    getUser,
    createUser,
    updateUserById,
    deleteUserById
} from "../controllers/userController.js";
import validate from "../middleware/validate.js";

const router = express.Router();

router.get('/', listAllUsers);
router.get('/:id', getUser);
router.post('/',validate, createUser);
router.put('/:id',validate, updateUserById);
router.delete('/:id', deleteUserById);

export default router;