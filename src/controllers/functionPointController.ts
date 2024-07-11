import { Request, Response } from 'express';
import prisma from '../models/prismaClient';

/////////////////////
// GET OPERATIONS  //
/////////////////////

export const getFunctionPointsByProjectId = async (req: Request, res: Response): Promise<void> => {
  try {
    const { projectId } = req.params;
    const functionPoints = await prisma.functionPoint.findMany({
      where: { projectId: Number(projectId) },
    });
    res.status(200).json(functionPoints);
  } catch (error) {
    res.status(500).json({ error: 'Failed to retrieve function points' });
  }
};

/////////////////////
// POST OPERATIONS //
/////////////////////

export const createFunctionPoint = async (req: Request, res: Response): Promise<void> => {
  try {
    const { type, complexity, count, projectId } = req.body;
    const functionPoint = await prisma.functionPoint.create({
      data: {
        type,
        complexity,
        count,
        projectId: Number(projectId),
      },
    });
    res.status(201).json(functionPoint);
  } catch (error) {
    res.status(500).json({ error: 'Failed to create function point' });
  }
};

/////////////////////
// PUT OPERATIONS  //
/////////////////////

export const updateFunctionPoint = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;
    const { type, complexity, count } = req.body;
    const functionPoint = await prisma.functionPoint.update({
      where: { id: Number(id) },
      data: {
        type,
        complexity,
        count,
      },
    });
    res.status(200).json(functionPoint);
  } catch (error) {
    res.status(500).json({ error: 'Failed to update function point' });
  }
};

/////////////////////
// PATCH OPERATIONS //
/////////////////////

export const patchFunctionPoint = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;
    const data = req.body;
    const functionPoint = await prisma.functionPoint.update({
      where: { id: Number(id) },
      data,
    });
    res.status(200).json(functionPoint);
  } catch (error) {
    res.status(500).json({ error: 'Failed to partially update function point' });
  }
};

/////////////////////
// DELETE OPERATIONS //
/////////////////////

export const deleteFunctionPoint = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;
    await prisma.functionPoint.delete({
      where: { id: Number(id) },
    });
    res.status(200).json({ message: 'Function point deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete function point' });
  }
};
