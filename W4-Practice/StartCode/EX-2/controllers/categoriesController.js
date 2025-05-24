import { articles, categories } from "../models/data.js";

//list all categories
export const listAllCategories = (req, res) => {
    res.json(categories);
};

//get single category
export const getCategory = (req, res) => {
    const categoryId = parseInt(req.params.id);
    const category = categories.find ( c => c.id === categoryId);
    if (!category) {
        return res.status(404).json({ error: 'Category not found' });
    }
    res.json(category);
};

//create new category
export const createCategory = (req, res) => {
    const { name } = req.body;
    if (!name) {
        return res.status(400).json({ error: 'Name is required' });
    }

    const newCategory = {
        id: categories.length + 1,
        name 
    };

    categories.push(newCategory);
    res.status(201).json(newCategory);
};

// update category
export const updateCategoryById = (req, res) => {
    const categoryId = parseInt(req.params.id);
    const { name } = req.body;
    const category = categories.find(c => c.id === categoryId);
    if (!category) {
        return res.status(404).json({ error: 'Category not found' });
    }
    if (name) category.name = name;
    res.json(category);
};

//delete category
export const deleteCategoryById = (req, res) => {
    const categoryId = parseInt(req.params.id);
    const index = categories.findIndex(c => c.id === categoryId);
    if ( index === -1 ) {
        return res.status(404).json({ error: 'Category not found' });
    }

    categories.splice(index, 1);

    res.status(204).send();
};

// get Articles from a categories 
export const getArticlesByCategory = (req, res) => {
    const categoryId = parseInt(req.params.id);

    //check if category exists
    const category = categories.some(c => c.id === categoryId);
    if(!category) {
        return res.status(404).json({ error: 'Category not found' });
    }
    const categoryArticles = articles.filter( a => a.categoryId === categoryId);

    // if no articles
    if(categoryArticles.length === 0) {
        return res.status(404).json({ error: 'No articles found for this category' });
    }

    res.json(categoryArticles);
};