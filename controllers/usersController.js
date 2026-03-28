import { db } from '../config/db.js';

export const getUsers = async (req, res) => {
  try {
    const users = await db.collection('users').find().toArray();
    res.json(users);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const createUser = async (req, res) => {
  try {
    const user = req.body;

    if (!user.name || !user.email) {
      return res.status(400).json({ error: 'Campos obrigatórios faltando' });
    }

    user.createdAt = new Date();

    const result = await db.collection('users').insertOne(user);

    res.status(201).json(result);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const updateUser = async (req, res) => {
  try {
    const id = new ObjectId(req.params.id);

    const result = await db.collection('users').updateOne(
      { _id: id },
      { $set: req.body }
    );

    res.json(result);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const deleteUser = async (req, res) => {
  try {
    const id = new ObjectId(req.params.id);

    const result = await db.collection('users').deleteOne({ _id: id });

    res.json(result);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};