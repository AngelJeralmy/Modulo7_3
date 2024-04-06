const express = require("express");
const cors = require("cors");
const { Pool } = require("pg");

const app = express();
const port = 3000;

const {agregarPost, obtenerPosts, like, eliminarPost} = require('./consultas.js');


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
 

//Get 
app.get("/posts", async (req, res) => {
    const posts = await obtenerPosts()
    res.json(posts)
    })


//Post 
app.post("/posts", async (req, res) => {
    const { titulo, img, descripcion, likes } = req.body
    await agregarPost(titulo, img, descripcion, likes)
    res.send("Post agregado con éxito")
    })


//Put
app.put("/posts/:id", async (req, res) => {
  const { id } = req.params
  await like(id)
  res.send("Like modificado con éxito")
  })


// Delete
app.delete("/posts/:id", async (req, res) => {
  const { id } = req.params
  await eliminarPost(id)
  res.send("Post eliminado con éxito")
  })