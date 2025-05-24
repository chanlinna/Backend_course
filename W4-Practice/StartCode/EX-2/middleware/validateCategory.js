const validateCategory = (req, res, next) => {
    const { name } = req.body;

    if ( !name ) {
        return res.status(400).json({ error: 'Name is required' });
    }

    next();
};

export default validateCategory;