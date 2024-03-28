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

const pool = new Pool({
  host: "localhost",
  user: "postgres",
  password: "",
  database: "likeme",
  allowExitOnIdle: true,
});

const agregarPost = async (titulo, img, descripcion, likes) => {
  const consulta = "INSERT INTO  posts values (DEFAULT, $1, $2, $3, $4)";
  const values = [titulo, img, descripcion, likes];
  const result = await pool.query(consulta, values);
  console.log("Post agregado");
};

const obtenerPosts = async () => {
  const { rows } = await pool.query("SELECT * FROM posts");
  console.log(rows);
  return rows;
};


module.exports = {agregarPost, obtenerPosts};
