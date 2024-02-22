const express = require("express");
const productsRoutes = require("./routes/productsRoutes");
const usersRoutes = require("./routes/usersRoutes");
const salesRoutes = require("./routes/salesRoutes");
const db = require("./db");

const app = express();

app.use(express.json());
app.use(productsRoutes);
app.use(usersRoutes);
app.use(salesRoutes);

db.sync(() => console.log(`Banco de dados conectado: ${process.env.PGDATABASE}`));

app.listen(3000, () => console.log("Servidor iniciado na porta 3000"));
