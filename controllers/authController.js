import bcrypt from "bcrypt";
import { db } from "../config/db.js";

export const register = async (req, res) => {
  const { name, email, password } = req.body;

  const hashedPassword = await bcrypt.hash(password, 10);

  const usersCollection = db.collection("users");

  const user = await usersCollection.insertOne({
    name,
    email,
    password: hashedPassword,
  });

  res.json(user);
};