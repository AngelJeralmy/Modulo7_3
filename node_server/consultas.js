const express = require("express");
const cors = require("cors");
const { Pool } = require("pg");

const app = express();
const port = 4000;

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

// New Pool
const pool = new Pool({
  host: "localhost",
  user: "postgres",
  password: "",
  database: "likeme",
  allowExitOnIdle: true,
});

//  Agregar Post
const agregarPost = async (titulo, img, descripcion, likes) => {
 try{
  const consulta = "INSERT INTO  posts values (DEFAULT, $1, $2, $3, $4)";
  const values = [titulo, img, descripcion, likes];
  const result = await pool.query(consulta, values);
  console.log("Post agregado");
 }catch (error){
    res.status(500).send(error)
 }
};

// Obetener Posts
const obtenerPosts = async () => {
  try{
    const { rows } = await pool.query("SELECT * FROM posts");
    return rows;
  }catch (error){
    res.status(500).send(error)
  }
};

// Modificar un Post
const like = async (id) => {
  try {
    let likes = 0;
    const { rows } = await pool.query("SELECT * FROM posts");
    rows.forEach((post) => {
      if (parseInt(post.id) === parseInt(id)) 
      likes = post.likes + 1;
    });
    const modificar = "UPDATE posts SET likes = $1 WHERE id =$2";
    const valores = [likes, id];
    const resultado = await pool.query(modificar, valores);
    console.log("Likes modificados");
  } catch (error) {
      res.status(500).send(error)
  }
};

// Eliminar un Post
const eliminarPost = async (id) => {
  try{
    const consulta = "DELETE FROM posts WHERE id = $1";
    const values = [parseInt(id)];
    const result = await pool.query(consulta, values);
    console.log("Post eliminado con éxito");
  }catch (error){
      res.status(500).send(error)
  }
};

module.exports = { agregarPost, obtenerPosts, like, eliminarPost };
