import { Request, Response } from 'express';
import prisma from '../models/prismaClient';

/////////////////////
// GET OPERATIONS  //
/////////////////////

export const getTasks = async (req: Request, res: Response): Promise<void> => {
  try {
    const tasks = await prisma.task.findMany();
    res.status(200).json(tasks);
  } catch (error) {
    res.status(500).json({ error: 'Failed to retrieve tasks' });
  }
};

export const getTaskById = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;
    const task = await prisma.task.findUnique({ where: { id: Number(id) } });
    if (task) {
      res.status(200).json(task);
    } else {
      res.status(404).json({ error: 'Task not found' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Failed to retrieve task' });
  }
};

/////////////////////
// POST OPERATIONS //
/////////////////////

export const createTask = async (req: Request, res: Response): Promise<void> => {
  try {
    const { title, description, status, projectId } = req.body;
    const task = await prisma.task.create({
      data: {
        title,
        description,
        status,
        projectId: Number(projectId),
      },
    });
    res.status(201).json(task);
  } catch (error) {
    res.status(500).json({ error: 'Failed to create task' });
  }
};

/////////////////////
// PUT OPERATIONS  //
/////////////////////

export const updateTask = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;
    const { title, description, status } = req.body;
    const task = await prisma.task.update({
      where: { id: Number(id) },
      data: {
        title,
        description,
        status,
      },
    });
    res.status(200).json(task);
  } catch (error) {
    res.status(500).json({ error: 'Failed to update task' });
  }
};

/////////////////////
// PATCH OPERATIONS //
/////////////////////

export const patchTask = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;
    const data = req.body;
    const task = await prisma.task.update({
      where: { id: Number(id) },
      data,
    });
    res.status(200).json(task);
  } catch (error) {
    res.status(500).json({ error: 'Failed to partially update task' });
  }
};

/////////////////////
// DELETE OPERATIONS //
/////////////////////

export const deleteTask = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;
    await prisma.task.delete({
      where: { id: Number(id) },
    });
    res.status(200).json({ message: 'Task deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete task' });
  }
};
