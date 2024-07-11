import express from 'express';
import {
  getFunctionPointsByProjectId,
  createFunctionPoint,
  updateFunctionPoint,
  patchFunctionPoint,
  deleteFunctionPoint,
} from '../controllers/functionPointController';

const router = express.Router();

// GET operations
router.get('/projects/:projectId/function-points', getFunctionPointsByProjectId);

// POST operations
router.post('/function-points', createFunctionPoint);

// PUT operations
router.put('/function-points/:id', updateFunctionPoint);

// PATCH operations
router.patch('/function-points/:id', patchFunctionPoint);

// DELETE operations
router.delete('/function-points/:id', deleteFunctionPoint);

export default router;
