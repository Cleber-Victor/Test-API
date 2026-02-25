import pool from "../config/db.js";

const createPostTable = async () => {
  const queryText = `CREATE TABLE IF NOT EXISTS posts (
  id SERIAL PRIMARY KEY,
  title VARCHAR(100) NOT NULL,
  body VARCHAR(100) NOT NULL,
  created_at TIMESTAMP DEFAULT NOW()
)`;

  try {
    pool.query(queryText);
    console.log("POsta table created if not exist");
  } catch (error) {
    console.log("Error creating: ", error);
  }
};

export default createPostTable;
