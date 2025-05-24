import express from 'express';
import articlesRoutes from './routes/articlesRoutes.js';
import journalistsRoutes from './routes/journalistsRoutes.js';
import categoriesRoutes from './routes/categoriesRoutes.js';
import logger from './middleware/logger.js';

const app = express();

const PORT = 3000;
app.use(express.json());
app.use(logger);

// app.get('/', (req, res) => {
//     res.json(articles)
// });

app.use('/articles', articlesRoutes);
app.use('/journalists', journalistsRoutes);
app.use('/categories', categoriesRoutes);

app.listen(PORT, () => {
    console.log(`🚀 Server is running on http://localhost:${PORT}`);
});