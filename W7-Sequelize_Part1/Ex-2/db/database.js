import { Sequelize } from 'sequelize';
import { DataTypes } from 'sequelize';
import AuthorModel from '../models/author.js';
import BookModel from '../models/book.js';

const sequelize = new Sequelize({
  dialect: 'sqlite',
  storage: './db/database.sqlite'
});

const Author = AuthorModel(sequelize, DataTypes);
const Book = BookModel(sequelize, DataTypes);

Author.hasMany(Book);
Book.belongsTo(Author);

export { sequelize, Author, Book };