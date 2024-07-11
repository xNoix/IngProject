import express from 'express';
import projectRoutes from './routes/projectRoutes';
import taskRoutes from './routes/taskRoutes';
import functionPointRoutes from './routes/functionPointRoutes';
import errorHandler from './middlewares/errorHandler';
import logger from './utils/logger';

const app = express();

app.use(express.json());
app.use(logger);
app.use('/api', projectRoutes);
app.use('/api', taskRoutes);
app.use('/api', functionPointRoutes);
app.use(errorHandler);

export default app;
