import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import pool from "./config/db.js";

import postRoutes from "./routes/postRoutes.js";
import errorHandling from "./middlewares/errorHandler.js";

import createUserTable from "./data/createPostTable.js";

const app = express();

const PORT = 3000;

//Middlewares
app.use(express.json());
app.use(cors());

//Routes
app.use("/api", postRoutes);
//Error handling middleware
app.use(errorHandling);

createUserTable();

//TEsting POSTGRES connection
app.get("/", async (req, res) => {
  const result = await pool.query("SELECT current_database()");
  res.send(`The database name is: ${result.rows[0].current_database}`);
});

app.listen(PORT, () => {
  console.log(`🚀 API rodando em http://localhost:${PORT}`);
});
