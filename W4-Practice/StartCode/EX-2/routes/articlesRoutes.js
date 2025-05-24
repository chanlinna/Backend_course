import express from 'express';
import {
    listAllArticles,
    getArticle,
    createArticle,
    updateArticleById,
    deleteArticleById
} from '../controllers/articleController.js';
import validateArticle from '../middleware/validateArtcle.js';

const router = express.Router();

router.get('/', listAllArticles);
router.get('/:id', getArticle);
router.post('/', validateArticle, createArticle);
router.put('/:id', validateArticle, updateArticleById);
router.delete('/:id', deleteArticleById);

export default router;