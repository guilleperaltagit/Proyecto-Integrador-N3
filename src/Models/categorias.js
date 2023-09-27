const { DataTypes } = require('sequelize');
const sequelize = require('../connection/connection');

const Categorias = sequelize.define('categorias', {
    idCategoria: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    nombreCategoria: {
      type: DataTypes.STRING,
      allowNull: false,
    }
}, {
  tableName: 'categorias',
  timestamps: false,
});

module.exports = Categorias;
