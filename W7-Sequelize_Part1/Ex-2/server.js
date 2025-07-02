import express from 'express';
import { sequelize, Author, Book } from './db/database.js';

const app = express();
app.use(express.json());

const port = 3000;

const Data = async () => {
  try {
  await sequelize.sync({ force: true }); // Reset DB
  } catch (error) {
    console.error("Unable to connect:", error);
  }


  const authors = await Promise.all([
    Author.create({ name: 'Ronan The Best', birthYear: 1990 }),
    Author.create({ name: 'Kim Ang', birthYear: 1995 }),
    Author.create({ name: 'Hok Tim', birthYear: 2015 }),
  ]);

  await authors[0].createBook({ title: 'Ronan Book 1', publicationYear: 2020, pages: 100 });
  await authors[0].createBook({ title: 'Ronan Book 2', publicationYear: 2022, pages: 110 });

  await authors[1].createBook({ title: 'Kim Book 1', publicationYear: 2021, pages: 120 });
  await authors[1].createBook({ title: 'Kim Book 2', publicationYear: 2023, pages: 130 });

  await authors[2].createBook({ title: 'Hok Book 1', publicationYear: 2024, pages: 90 });
  await authors[2].createBook({ title: 'Hok Book 2', publicationYear: 2025, pages: 95 });

  console.log('Sample data created');
};

Data();

// Fetch all books by a given author
app.get('/authors/:id/books', async (req, res) => {
  const author = await Author.findByPk(req.params.id, { include: Book });
  res.json(author?.Books || []);
});

// Create a new book for an existing author using .createBook()
app.post('/authors/:id/books', async (req, res) => {
  const author = await Author.findByPk(req.params.id);
  if (!author) return res.status(404).json({ error: 'Author not found' });

  const book = await author.createBook(req.body); 
  res.json(book);
});

// List all authors along with their books
app.get('/authors', async (req, res) => {
  const authors = await Author.findAll({ include: Book });
  res.json(authors);
});



app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
