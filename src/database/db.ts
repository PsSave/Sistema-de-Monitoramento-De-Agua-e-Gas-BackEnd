import { Pool } from "pg";

const pool = new Pool({
  user: "root",
  host: "postgres",
  database: "image_reader",
  password: "secretpassword",
  port: 5432,
});

export const query = (text: string, params?: any[]) => pool.query(text, params);
