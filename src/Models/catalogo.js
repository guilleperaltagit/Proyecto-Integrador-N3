const { DataTypes } = require('sequelize');
const sequelize = require('../connection/connection');

const Catalogo = sequelize.define('catalogo', {
    idPelicula: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    poster: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    titulo: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    categoria: {
      type: DataTypes.STRING,
      allowNull: false,
    },  
    resumen: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    temporadas: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    trailer: {
      type:DataTypes.STRING,
      allowNull: true,
    }
}, {
  tableName: 'catalogo',
  timestamps: false,
});

module.exports = Catalogo;
