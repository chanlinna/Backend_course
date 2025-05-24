const validateArticle = (req, res, next) => {
    const { title, content, journalistId, categoryId } = req.body;

    if ( !title || !content || !journalistId || !categoryId ) {
        return res.status(400).json({ error: 'title, content, journalistId, categoryId are required' });
    }

    next();
};

export default validateArticle;