// controllers/authController.js
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import { createUser, findUserByEmail } from "../models/User.js";

export const register = async (req, res) => {
  const user = await createUser(req.body);
  res.json(user);
};

export const login = async (req, res) => {
  const user = await findUserByEmail(req.body.email);
  if (!user) return res.status(401).json({ message: "Invalid credentials" });

  const match = await bcrypt.compare(req.body.password, user.password_hash);
  if (!match) return res.status(401).json({ message: "Invalid credentials" });

  const token = jwt.sign(
    { id: user.id, role: user.role },
    process.env.JWT_SECRET,
    { expiresIn: "1d" }
  );

  res.json({ token, role: user.role });
};
