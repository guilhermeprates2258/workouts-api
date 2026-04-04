import express from 'express';
import session from "express-session";
import { connectDB } from './config/db.js';
import workoutRoutes from './routes/workoutRoutes.js';
import userRoutes from './routes/usersRoutes.js';
import swaggerUi from 'swagger-ui-express';
import swaggerSpec from './config/swagger.js';
import cors from 'cors';
import passport from 'passport';
import './config/passport.js';
import dotenv from 'dotenv';
import authRoutes from "./routes/authRoutes.js";


connectDB();


dotenv.config();

const app = express();





app.use(cors());
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));


app.use('/users', userRoutes);

app.use(express.json());

app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: true,
  })
);
app.use(passport.initialize());
app.use(passport.session());

app.use("/auth", authRoutes);

app.use('/workouts', workoutRoutes);



app.get('/', (req, res) => {
  res.send(`
    <h1>🏋️ Workouts API</h1>
    <p>API funcionando com sucesso 🚀</p>

    <h2>Rotas disponíveis:</h2>
    <ul>
      <li>GET /workouts</li>
      <li>POST /workouts</li>
      <li>PUT /workouts/:id</li>
      <li>DELETE /workouts/:id</li>
      <li>GET /users</li>
      <li>POST /users</li>
    </ul>
  `);
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});