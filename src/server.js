const dotenv = require('dotenv');
dotenv.config();
const express = require('express');
const { Op } = require("sequelize")
const sequelize = require("./connection/connection")
const Catalogo = require("./Models/catalogo")
const Categorias = require("./Models/categorias")
const Peliculaygenero = require("./Models/peliculaygenero")

const server = express();

// Middlewares
server.use(express.json());

//Listado de Categorias
server.get("/categorias", async (req, res) =>  {
    try {
        const categorias = await Categorias.findAll()
        res.status(200).send(categorias)
    } catch (err) {
        console.log(err.message)
        res.status(500).send(err)
}})

// Listado de todas las películas
server.get("/catalogo", async (req, res) =>  {
    try {
        const peliculas = await Catalogo.findAll()
        // Concateno la url a poster    
        peliculas.forEach((i) => {i.poster = "http://dummyurl" + i.poster})
        res.status(200).send(peliculas)  
    } catch (err){
        console.log(err.message)
        res.status(500).send(err)
}})

// Pelicula por ID
server.get("/catalogo/:idpelicula", async (req, res) =>  {
    //Valido si idpelicula es un número y no es cero
    const ID = Number(req.params.idpelicula)
    const esString = isNaN(ID)
    if (esString === true || ID === 0){
        res.status(400).send({message: "El ID debe ser un número y no puede ser cero"})
        return
    }

    try {
        const pelicula = await Catalogo.findByPk(req.params.idpelicula)
        console.log(pelicula)
        // Valido si idpelicula trae una pélicula válida del catálogo
        if (!pelicula) {
            res.status(400).send({message: "El ID debe ser un número válido del catálogo"})
            return
        }
        // Concateno la url a poster
        pelicula.poster = "http://dummyurl" + pelicula.poster
        res.status(200).send(pelicula)
    } catch (err) {
        console.log(err.message)
        res.status(500).send(err.message)
}})

// Listado de películas filtrado por nombre
server.get("/catalogo/nombre/:nombre", async (req, res) => {
    try {
        const peliculas = await Catalogo.findAll({
            where: { titulo: { [Op.substring]: req.params.nombre}}
        })
        // Concateno la url a poster    
        peliculas.forEach((i) => {i.poster = "http://dummyurl" + i.poster})
        res.status(200).send(peliculas);        
    } catch (err) {
        console.log(err.message)
        res.status(500).send(err.message)
}})

// Listado de películas filtrado por género
server.get("/catalogo/genero/:genero", async (req, res) =>  {
    try {
        const peliculas = await Peliculaygenero.findAll({
            where: { genero: req.params.genero}
        })
        if (peliculas.length === 0) {
            res.status(400).send({message: "El género no es válido. Ingrese un género válido"})
            return
        }
        // Concateno la url a poster
        peliculas.forEach((i) => {i.poster = "http://dummyurl" + i.poster})
        res.status(200).send(peliculas)
    } catch (err) {
        console.log(err.message)
        res.status(500).send(err.message)
}})

// Listado de películas filtrado por categoría
server.get("/catalogo/categoria/:categoria", async (req, res) =>  {
    try {
    const peliculas = await Catalogo.findAll({
        where: { categoria: req.params.categoria }
    })
    if (peliculas.length === 0) {
        res.status(400).send({message: "La categoría no es válida. Ingrese un categoría válida"})
        return
    }
    // Concateno la url a poster
    peliculas.forEach((i) => {i.poster = "http://dummyurl" + i.poster})
    res.status(200).send(peliculas);
    } catch (err) {
        console.log(err.message)
        res.status(500).send(err.message)
}})

// Manejo de rutas inexistentes
server.use('*', (req, res) => {
    res.status(404).send({error: "La URL solicitada no existe en este servidor"});
});

// Escucha de peticiones
sequelize.authenticate().then(()=>{
    sequelize.sync({ force: false }).then(()=>{
        server.listen(process.env.PORT, process.env.HOST, () => {
            console.log(`El servidor está escuchando en: http://${process.env.HOST}:${process.env.PORT}`);
        });
    }).catch(()=>{
        console.log("Hubo un problema con la sincronización de los modelos.")
    });
}).catch(()=>{
    console.log("Hubo un problema con la conexión a la base de datos.")
});

