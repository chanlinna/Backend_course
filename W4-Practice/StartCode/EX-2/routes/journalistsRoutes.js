import express from 'express';
import {
    listAllJournalists,
    getJournalist,	
    createJournalist,
    updateJournalistById,
    deleteJournalistById,
    getArticlesByJournalist
} from '../controllers/journalistsController.js';
import validateJournalist from '../middleware/validateJournalist.js';

const router = express.Router();

router.get('/', listAllJournalists);
router.get('/:id', getJournalist);
router.post('/', validateJournalist, createJournalist);
router.put('/:id', validateJournalist, updateJournalistById);
router.delete('/:id', deleteJournalistById);
router.get('/:id/articles', getArticlesByJournalist);

export default router;