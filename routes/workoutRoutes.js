import express from 'express';
import { isAuthenticated } from '../middleware/authMiddleware.js';
import {
  getWorkouts,
  getWorkoutById,
  createWorkout,
  updateWorkout,
  deleteWorkout
} from '../controllers/workoutController.js';

const router = express.Router();

/**
 * @swagger
 * /workouts:
 *   get:
 *     security:
 *       - cookieAuth: []
 *     summary: Retorna todos os treinos
 *     responses:
 *       200:
 *         description: Lista de treinos
 */
router.get('/', isAuthenticated, getWorkouts);

/**
 * @swagger
 * /workouts/{id}:
 *   get:
 *     security:
 *       - cookieAuth: []
 *     summary: Retorna um treino pelo ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Treino encontrado
 *       404:
 *         description: Treino não encontrado
 */
router.get('/:id', isAuthenticated, getWorkoutById);

/**
 * @swagger
 * /workouts:
 *   post:
 *     security:
 *       - cookieAuth: []
 *     summary: Cria um novo treino
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               type:
 *                 type: string
 *               duration:
 *                 type: number
 *               difficulty:
 *                 type: string
 *               exercises:
 *                 type: array
 *                 items:
 *                   type: string
 *               caloriesBurned:
 *                 type: number
 *     responses:
 *       201:
 *         description: Treino criado com sucesso
 *       400:
 *         description: Erro de validação
 */
router.post('/', isAuthenticated, createWorkout);

/**
 * @swagger
 * /workouts/{id}:
 *   put:
 *     security:
 *       - cookieAuth: []
 *     summary: Atualiza um treino
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *     responses:
 *       200:
 *         description: Treino atualizado
 *       404:
 *         description: Treino não encontrado
 */
router.put('/:id', isAuthenticated, updateWorkout);

/**
 * @swagger
 * /workouts/{id}:
 *   delete:
 *     security:
 *       - cookieAuth: []
 *     summary: Deleta um treino
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Treino deletado
 *       404:
 *         description: Treino não encontrado
 */
router.delete('/:id', isAuthenticated, deleteWorkout);

export default router;