import express from 'express';
import session from 'express-session';
import { connectDB } from './config/db.js';
import workoutRoutes from './routes/workoutRoutes.js';
import userRoutes from './routes/usersRoutes.js';
import swaggerUi from 'swagger-ui-express';
import swaggerSpec from './config/swagger.js';
import cors from 'cors';
import passport from 'passport';
import './config/passport.js';
import dotenv from 'dotenv';
import authRoutes from './routes/authRoutes.js';

dotenv.config();

const app = express();
connectDB();

const isProduction = process.env.NODE_ENV === 'production';

app.set('trust proxy', 1);

app.use(cors({
  origin: true,
  credentials: true
}));

app.use(express.json());

app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: {
      httpOnly: true,
      secure: isProduction,
      sameSite: isProduction ? 'none' : 'lax'
    }
  })
);

app.use(passport.initialize());
app.use(passport.session());

app.use('/auth', authRoutes);
app.use('/users', userRoutes);
app.use('/workouts', workoutRoutes);

app.use(
  '/api-docs',
  swaggerUi.serve,
  swaggerUi.setup(swaggerSpec, {
    swaggerOptions: {
      withCredentials: true
    }
  })
);

app.get('/', (req, res) => {
  res.send(`
    <h1>🏋️ Workouts API</h1>
    <p>API funcionando com sucesso 🚀</p>
    <p><a href="/auth/google">Login com Google</a></p>
    <p><a href="/api-docs">Abrir Swagger</a></p>
  `);
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});