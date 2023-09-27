const { DataTypes } = require('sequelize');
const sequelize = require('../connection/connection');

const Peliculaygenero = sequelize.define('peliculaygenero', {
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
    genero: {
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
  tableName: 'peliculaygenero',
  timestamps: false,
});

module.exports = Peliculaygenero;
