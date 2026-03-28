import { db } from '../config/db.js';
import { ObjectId } from 'mongodb';

// GET ALL
export const getWorkouts = async (req, res) => {
  try {
    const workouts = await db.collection('workouts').find().toArray();
    res.status(200).json(workouts);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// GET BY ID
export const getWorkoutById = async (req, res) => {
  try {
    const id = new ObjectId(req.params.id);
    const workout = await db.collection('workouts').findOne({ _id: id });

    if (!workout) {
      return res.status(404).json({ error: 'Treino não encontrado' });
    }

    res.status(200).json(workout);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// CREATE
export const createWorkout = async (req, res) => {
  try {
    const workout = req.body;

    if (!workout.name || !workout.type) {
      return res.status(400).json({ error: 'Campos obrigatórios faltando' });
    }

    workout.createdAt = new Date();

    const result = await db.collection('workouts').insertOne(workout);

    res.status(201).json(result);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// UPDATE
export const updateWorkout = async (req, res) => {
  try {
    const id = new ObjectId(req.params.id);

    const result = await db.collection('workouts').updateOne(
      { _id: id },
      { $set: req.body }
    );

    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// DELETE
export const deleteWorkout = async (req, res) => {
  try {
    const id = new ObjectId(req.params.id);

    const result = await db.collection('workouts').deleteOne({ _id: id });

    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};