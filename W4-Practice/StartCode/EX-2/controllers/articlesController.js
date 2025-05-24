import { articles, journalists, categories } from "../models/data.js";

//list all articles
export const listAllArticles = (req, res) => {
    res.json(articles);
};

//get single article
export const getArticle = (req, res) => {
    const articleId = parseInt(req.params.id);
    const article = articles.find(a => a.id === articleId);
    if(!article) {
        return res.status(404).json({ error: 'Article not found'});
    }
    res.json(article);
};

//creare new article
export const createArticle = (req, res) => {
    const { title, content, journalistId, categoryId } = req.body;
    if (!title || !content || !journalistId || !categoryId) {
        return res.status(400).json({ error: 'Title, content, journalistId, and categoryId are required' });
    }

    // Check if journalist exists
    const journalist = journalists.some(j => j.id === journalistId);
    if (!journalist) {
        return res.status(400).json({ error: 'Invalid journalistId' });
    }

    // Check if category exists
    const category = categories.some(c => c.id === categoryId);
    if (!category) {
        return res.status(400).json({ error: 'Invalid categoryId' });
    }

    const newArticle = {
        id: articles.length + 1,
        title,
        content,
        journalistId,
        categoryId
    };
    articles.push(newArticle);
    res.status(201).json(newArticle);
};

//update article
export const updateArticleById = (req, res) => {
    const articleId = parseInt(req.params.id);
    const {title, content, journalistId, categoryId} = req.body;

    const article = articles.find( a => a.id === articleId);
    if(!article) {
        return res.status(404).json({ error: 'Article not found'});
    }

    // Check if journalist exists
    const journalist = journalists.some(j => j.id === journalistId);
    if (!journalist) {
        return res.status(400).json({ error: 'Invalid journalistId' });
    }

    // Check if category exists
    const category = categories.some(c => c.id === categoryId);
    if (!category) {
        return res.status(400).json({ error: 'Invalid categoryId' });
    }
    
    if(title) article.title = title;
    if(content) article.content = content;
    if(journalistId) article.journalistId = journalistId;
    if(categoryId) article.categoryId = categoryId;

    res.json(article);
}

//delete article
export const deleteArticleById = (req, res) => {
    const articleId = parseInt(req.params.id);
    const index = articles.findIndex( a => a.id === articleId);
    if(index === -1) {
        return res.status(404).json({ error: 'Article not found' });
    }
    articles.splice(index, 1);

    res.status(204).send();
};
