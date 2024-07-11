import express from 'express';
import {
  getTasks,
  getTaskById,
  createTask,
  updateTask,
  patchTask,
  deleteTask,
} from '../controllers/taskController';

const router = express.Router();

// GET operations
router.get('/tasks', getTasks);
router.get('/tasks/:id', getTaskById);

// POST operations
router.post('/tasks', createTask);

// PUT operations
router.put('/tasks/:id', updateTask);

// PATCH operations
router.patch('/tasks/:id', patchTask);

// DELETE operations
router.delete('/tasks/:id', deleteTask);

export default router;
