import Express from 'express';
import authRoutes from './routes/authRoutes.js';
import commentRoutes from './routes/commentRoutes.js';
import likeRoutes from './routes/likeRoutes.js';
import postRoutes from './routes/postRoutes.js';
import relationshipRoutes from './routes/relationshipRoutes.js';
import storiesRoutes from './routes/storiesRoutes.js';
import userRoutes from './routes/userRoutes.js';
import cors from 'cors';
import cookieParser from 'cookie-parser';

const app = Express();

//Middlewares
app.use(Express.json());
app.use(cors());
app.use(cookieParser());

//Routes
app.use('/api/auth', authRoutes);
app.use('/api/comments', commentRoutes);
app.use('/api/likes', likeRoutes);
app.use('/api/posts', postRoutes);
app.use('/api/relationships', relationshipRoutes);
app.use('/api/stories', storiesRoutes);
app.use('/api/users', userRoutes);

app.listen(8800, () => {
  console.log('connected!');
});
