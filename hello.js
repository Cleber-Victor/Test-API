const express = require("express");
const z = require("zod");
const app = express();
app.use(express.json());
const PORT = 3000;

const Posts = [];

app.listen(PORT, () => {
  console.log(`Listening to ${PORT} `);
});

app.get("/api/posts", (req, res) => {
  res.send(Posts);
});

app.get("/api/posts/:id", (req, res) => {
  const achou = Posts.find((p) => p.id === parseInt(req.params.id));
  if (!achou) {
    return res.status(404).send("Post não existe");
  }
  res.send(achou);
});

const postsSchema = z.object({
  title: z.string().min(3),
  body: z.string().min(1),
});

app.post("/api/posts", (req, res) => {
  // validar formato
  const result = postsSchema.safeParse(req.body);

  if (!result.success) {
    return res.status(400).json({
      message: "Dados inválidos",
      errors: result.error.flatten().fieldErrors,
    });
  }

  const post = {
    id: Posts.length + 1,
    title: req.body.title,
    body: req.body.body,
  };
  Posts.push(post);
  res.send(post);
});

app.put("/api/posts/:id", (req, res) => {
  const achou = Posts.find((p) => p.id === parseInt(req.params.id));
  if (!achou) {
    return res.status(404).send("Post não existe");
  }
  const result = postsSchema.safeParse(req.body);

  if (!result.success) {
    return res.status(400).json({
      message: "Dados inválidos",
      errors: result.error.flatten().fieldErrors,
    });
  }
  achou.title = req.body.title;
  res.send(achou);
});

app.delete("/api/posts/:id", (req, res) => {
  const achou = Posts.find((p) => p.id === parseInt(req.params.id));
  if (!achou) {
    return res.status(404).send("Post não existe");
  }
  const index = Posts.indexOf(achou);
  Posts.splice(index, 1);
  res.send(achou);
});
