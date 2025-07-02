export default (sequelize, DataTypes) => {
  return sequelize.define('Book', {
    title: DataTypes.STRING,
    publicationYear: DataTypes.INTEGER,
    pages: DataTypes.INTEGER,
  });
};
