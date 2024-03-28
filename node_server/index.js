const express = require("express");
const cors = require("cors");
const { Pool } = require("pg");

const app = express();
const port = 3000;

const {agregarPost, obtenerPosts} = require('./consultas.js');


// Servidor encendido
app.listen(port, () => {
  console.log("¡Servidor encendido! en puerto: " + port);
});

// CORS
app.use(cors());

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));

//get 
app.get("/posts", async (req, res) => {
    const posts = await obtenerPosts()
    res.json(posts)
    })


//post 
app.post("/posts", async (req, res) => {
    const { titulo, img, descripcion, likes } = req.body
    await agregarPost(titulo, img, descripcion, likes)
    res.send("Post agregado con éxito")
    })
