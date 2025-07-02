export default (sequelize, DataTypes) => {
  return sequelize.define('Author', {
    name: DataTypes.STRING,
    birthYear: DataTypes.INTEGER,
  });
};
