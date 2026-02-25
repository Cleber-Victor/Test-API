import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import pool from "./config/db.js";

import userRoutes from "./routes/userRoutes.js";
import errorHandling from "./middlewares/errorHandler.js";

import createUserTable from "./data/createPostTable.js";
import { z } from "zod";

const app = express();

const PORT = 3000;

//Middlewares
app.use(express.json());
app.use(cors());

//ROutes
app.use("/api", userRoutes);
//Error handling middlware
app.use;

createUserTable();

//TEsting POSTGRES connection
app.get("/", async (req, res) => {
  const result = await pool.query("SELECT current_database()");
  res.send(`The database name is: ${result.rows[0].current_database}`);
});

const postsSchema = z.object({
  title: z.string().min(3),
  body: z.string().min(1),
});

app.get("/api/posts", async (req, res) => {
  const result = await pool.query("SELECT * FROM posts ORDER BY id ASC");
  res.send(result.rows);
});
/*
app.get("/api/posts/:id", async (req, res) => {
  const { id } = req.params;
  const result = await pool.query("SELECT * FROM posts WHERE id = $1", [id]);

  if (result.rows.length === 0) {
    return res.status(404).send("Post não existe");
  }
  res.send(result.rows[0]);
});

app.post("/api/posts", async (req, res) => {
  const validation = postsSchema.safeParse(req.body);
  if (!validation.success) {
    return res
      .status(400)
      .json({ errors: validation.error.flatten().fieldErrors });
  }

  const { title, body } = req.body;
  const query = "INSERT INTO posts (title, body) VALUES ($1, $2) RETURNING *";
  const result = await pool.query(query, [title, body]);

  res.status(201).send(result.rows[0]);
});

app.put("/api/posts/:id", async (req, res) => {
  const { id } = req.params;
  const validation = postsSchema.safeParse(req.body);
  if (!validation.success) {
    return res
      .status(400)
      .json({ errors: validation.error.flatten().fieldErrors });
  }

  const { title, body } = req.body;
  const query =
    "UPDATE posts SET title = $1, body = $2 WHERE id = $3 RETURNING *";
  const result = await pool.query(query, [title, body, id]);

  if (result.rows.length === 0) {
    return res.status(404).send("Post não existe");
  }
  res.send(result.rows[0]);
});

app.delete("/api/posts/:id", async (req, res) => {
  const { id } = req.params;
  const result = await pool.query(
    "DELETE FROM posts WHERE id = $1 RETURNING *",
    [id],
  );

  if (result.rows.length === 0) {
    return res.status(404).send("Post não existe");
  }
  res.send({ message: "Post removido", post: result.rows[0] });
});
*/
app.listen(PORT, () => {
  console.log(`🚀 API rodando em http://localhost:${PORT}`);
});
