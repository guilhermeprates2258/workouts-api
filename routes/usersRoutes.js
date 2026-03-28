import express from 'express';
import { createUser, getUsers, updateUser, deleteUser } from '../controllers/usersController.js';

const router = express.Router();

/**
 * @swagger
 * users:
 *   get:
 *     summary: Retorna todos os usuários
 *     responses:
 *       200:
 *         description: Lista de usuários
 */
router.get('/', getUsers);

/**
 * @swagger
 * users:
 *   post:
 *     summary: Cria um novo usuário
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               email:
 *                 type: string
 *               age:
 *                 type: number
 *               weight:
 *                 type: number
 *               height:
 *                 type: number
 *               goal:
 *                 type: string
 *     responses:
 *       201:
 *         description: Usuário criado com sucesso
 *       400:
 *         description: Erro de validação
 */
router.post('/', createUser);

/**
 * @swagger
 * users/{id}:
 *   put:
 *     summary: Atualiza um usuário
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
 *         description: Usuário atualizado
 *       404:
 *         description: Usuário não encontrado
 */
router.put('/:id', updateUser);

/**
 * @swagger
 * users/{id}:
 *   delete:
 *     summary: Deleta um usuário
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Usuário deletado
 *       404:
 *         description: Usuário não encontrado
 */
router.delete('/:id', deleteUser);

export default router;