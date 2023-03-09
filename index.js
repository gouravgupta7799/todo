import express from 'express';
import dotenv from 'dotenv';
import connectionDB from './database/connectionDB.js'
import cookieParser from 'cookie-parser';
import todosRoutes from './routes/todos.js';
import usersRoutes from './routes/users.js';
import cors from 'cors';

const app = express();

var corsOptions = {
  origin: 'http://127.0.0.1:5501',
  optionsSuccessStatus: 200, // For legacy browser support
  methods: "GET, PUT, POST, DELETE", // add per need
}

app.use(cors(corsOptions));

dotenv.config();

connectionDB()

app.use(express.json());

app.use(express.urlencoded({ extended: true }));

app.use(cookieParser());

app.use("/api/todos", todosRoutes);
app.use("/api/users", usersRoutes);

const port = process.env.PORT || 4000
app.listen(port, () => console.log(`server is running on PORT ${port}`))

