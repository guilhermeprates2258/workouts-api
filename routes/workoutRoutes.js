import express from 'express';
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
 *     summary: Retorna todos os treinos
 *     responses:
 *       200:
 *         description: Lista de treinos
 */
router.get('/', getWorkouts);

/**
 * @swagger
 * /workouts/{id}:
 *   get:
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
router.get('/:id', getWorkoutById);

/**
 * @swagger
 * /workouts:
 *   post:
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
router.post('/', createWorkout);

/**
 * @swagger
 * /workouts/{id}:
 *   put:
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
router.put('/:id', updateWorkout);

/**
 * @swagger
 * /workouts/{id}:
 *   delete:
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
router.delete('/:id', deleteWorkout);


export default router;