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
    const categorias = await Categorias.findAll()
    res.status(200).send(categorias);
})

// Listado de todas las películas
server.get("/catalogo", async (req, res) =>  {
    // const products = await sequelize.query("select * from Products")

    const peliculas = await Catalogo.findAll()
    // Concateno la url a poster    
    peliculas.forEach((i) => {i.poster = "http://dummyurl" + i.poster})

    // const pricegte = Number(req.query.pricegte)
    // const products = await Products.findAll({attributes: ["ProductName", "UnitPrice"]})

    // const pricegte = Number(req.query.pricegte)
    // const priceorder = req.query.priceorder
    // const products = await Products.findAll({
    //     attributes: ["ProductName", "UnitPrice"],
    //     where: { UnitPrice: { [Op.gte]: pricegte} },
    //    order: [ ['UnitPrice', priceorder] ] })
   
    res.status(200).send(peliculas);
})

// Pelicula por ID
server.get("/catalogo/:idpelicula", async (req, res) =>  {
    // const product = await Products.findOne({where: { ProductId : { [Op.eq]: req.params.productid } } })
    // const product = await Products.findOne({where: { ProductId : req.params.productid }})

    const pelicula = await Catalogo.findByPk(req.params.idpelicula)
    // Concateno la url a poster
    pelicula.poster = "http://dummyurl" + pelicula.poster
    res.status(200).send(pelicula);
})

// Listado de películas filtrado por nombre
server.get("/catalogo/nombre/:nombre", async (req, res) =>  {
    const peliculas = await Catalogo.findAll({
        where: { titulo: { [Op.substring]: req.params.nombre}}
    })
    // Concateno la url a poster    
    peliculas.forEach((i) => {i.poster = "http://dummyurl" + i.poster})
    res.status(200).send(peliculas);
})

// Listado de películas filtrado por género
server.get("/catalogo/genero/:genero", async (req, res) =>  {
    const peliculas = await Peliculaygenero.findAll({
        where: { genero: req.params.genero}
    })
    // Concateno la url a poster
    peliculas.forEach((i) => {i.poster = "http://dummyurl" + i.poster})
    res.status(200).send(peliculas);
})

// Listado de películas filtrado por categoría
server.get("/catalogo/categoria/:categoria", async (req, res) =>  {
    const peliculas = await Catalogo.findAll({
        where: { categoria: req.params.categoria }
    })
    // Concateno la url a poster
    peliculas.forEach((i) => {i.poster = "http://dummyurl" + i.poster})
    res.status(200).send(peliculas);
})

// Control de rutas inexistentes
server.use('*', (req, res) => {
    res.status(404).send({error: `La URL indicada no existe en este servidor`});
});

// Método oyente de solicitudes
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

