import pool from "../config/db.js";

export const getAllPostsService = async () => {
  const result = await pool.query("SELECT * FROM posts ORDER BY id ASC");
  return result.rows;
};
export const createPostService = async (title, body) => {
  const query = "INSERT INTO posts (title, body) VALUES ($1, $2) RETURNING *";
  const result = await pool.query(query, [title, body]);
  return result.rows[0];
};
export const getPostByIdService = async (id) => {
  const result = await pool.query("SELECT * FROM posts WHERE id = $1", [id]);
  return result.rows[0];
};
export const updatePostService = async (title, body, id) => {
  const query =
    "UPDATE posts SET title = $1, body = $2 WHERE id = $3 RETURNING *";
  const result = await pool.query(query, [title, body, id]);

  //  if (result.rows.length === 0) {
  //    return res.status(404).send("Post não existe");
  // }
  res.send(result.rows[0]);
};
export const deletePostService = async (id) => {
  const result = await pool.query(
    "DELETE FROM posts WHERE id = $1 RETURNING *",
    [id],
  );

  if (result.rows.length === 0) {
    return res.status(404).send("Post não existe");
  }
  res.send({ message: "Post removido", post: result.rows[0] });
};
