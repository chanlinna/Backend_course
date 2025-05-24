import express from 'express';
import {
    listAllCategories,
    getCategory,
    createCategory,
    updateCategoryById,
    deleteCategoryById,
    getArticlesByCategory
} from '../controllers/categoriesController.js';
import validateCategory from '../middleware/validateCategory.js';

const router = express.Router();

router.get('/', listAllCategories);
router.get('/:id', getCategory);
router.post('/', validateCategory, createCategory);
router.put('/:id', validateCategory, updateCategoryById);
router.delete('/:id', deleteCategoryById);
router.get('/:id/articles', getArticlesByCategory);

export default router;