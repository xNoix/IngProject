import { Request, Response } from 'express';
import prisma from '../models/prismaClient';

/////////////////////
// GET OPERATIONS  //
/////////////////////

export const getProjects = async (req: Request, res: Response): Promise<void> => {
  try {
    const projects = await prisma.project.findMany({
      include: {
        functionPoints: true,
        tasks: true,
      },
    });
    res.status(200).json(projects);
  } catch (error) {
    res.status(500).json({ error: 'Failed to retrieve projects' });
  }
};

export const getProjectById = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;
    const project = await prisma.project.findUnique({
      where: { id: Number(id) },
      include: {
        functionPoints: true,
        tasks: true,
      },
    });
    if (project) {
      res.status(200).json(project);
    } else {
      res.status(404).json({ error: 'Project not found' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Failed to retrieve project' });
  }
};

/////////////////////
// POST OPERATIONS //
/////////////////////

export const createProject = async (req: Request, res: Response): Promise<void> => {
  try {
    const { name, description } = req.body;
    const project = await prisma.project.create({
      data: {
        name,
        description,
      },
    });
    res.status(201).json(project);
  } catch (error) {
    res.status(500).json({ error: error });
  }
};

/////////////////////
// PUT OPERATIONS  //
/////////////////////

export const updateProject = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;
    const { name, description } = req.body;
    const project = await prisma.project.update({
      where: { id: Number(id) },
      data: {
        name,
        description,
      },
    });
    res.status(200).json(project);
  } catch (error) {
    res.status(500).json({ error: 'Failed to update project' });
  }
};

/////////////////////
// PATCH OPERATIONS //
/////////////////////

export const patchProject = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;
    const data = req.body;
    const project = await prisma.project.update({
      where: { id: Number(id) },
      data: data,
    });
    res.status(200).json(project);
  } catch (error) {
    res.status(500).json({ error: 'Failed to partially update project' });
  }
};

/////////////////////
// DELETE OPERATIONS //
/////////////////////

export const deleteProject = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;
    await prisma.project.delete({
      where: { id: Number(id) },
    });
    res.status(200).json({ message: 'Project deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete project' });
  }
};
