import express from 'express';
import {
  getProjects,
  getProjectById,
  createProject,
  updateProject,
  patchProject,
  deleteProject,
} from '../controllers/projectController';

const router = express.Router();

// GET operations
router.get('/projects', getProjects);
router.get('/projects/:id', getProjectById);

// POST operations
router.post('/projects', createProject);

// PUT operations
router.put('/projects/:id', updateProject);

// PATCH operations
router.patch('/projects/:id', patchProject);

// DELETE operations
router.delete('/projects/:id', deleteProject);

export default router;
