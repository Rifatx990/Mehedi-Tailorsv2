import pool from "../config/db.js";
import bcrypt from "bcrypt";

export const createUser = async ({ name, email, password, role }) => {
  const hash = await bcrypt.hash(password, 10);
  const { rows } = await pool.query(
    `INSERT INTO users (name, email, password_hash, role)
     VALUES ($1,$2,$3,$4) RETURNING id, role`,
    [name, email, hash, role]
  );
  return rows[0];
};

export const findUserByEmail = async (email) => {
  const { rows } = await pool.query(
    "SELECT * FROM users WHERE email=$1",
    [email]
  );
  return rows[0];
};
