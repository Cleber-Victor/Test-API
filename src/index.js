import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
dotenv.config({ path: path.resolve(__dirname, "../.env") });
import express from "express";
import pkg from "pg";
const { Pool } = pkg;
import { z } from "zod";

const app = express();
app.use(express.json());
const PORT = 3000;

const pool = new Pool({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  password: String(process.env.DB_PASSWORD),
  port: parseInt(process.env.DB_PORT || "5432"),
});

console.log("Banco:", process.env.DB_NAME);
console.log("Usuário:", process.env.DB_USER);
try {
  await pool.connect();
  console.log("✅ Conectado ao banco usando a Connection String!");
} catch (err) {
  console.error("❌ Erro na conexão:", err.message);
}

const postsSchema = z.object({
  title: z.string().min(3),
  body: z.string().min(1),
});

app.get("/api/posts", async (req, res) => {
  const result = await pool.query("SELECT * FROM posts ORDER BY id ASC");
  res.send(result.rows);
});

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

app.listen(PORT, () => {
  console.log(`🚀 API rodando em http://localhost:${PORT}`);
});
