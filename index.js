import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import connect from './src/database/database.js';
import cookieParser from "cookie-parser";

import usersRoute from './src/routes/users.js';
import projectsRoute from './src/routes/projects.js';
import proposalRoute from "./src/routes/proposal.js";
import authRoute from './src/routes/auth.js';

dotenv.config()

const port = process.env.PORT || 5000;
const app = express();

//Middlewares
app.use(cors());
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//Rutas
app.use("/api/auth", authRoute);
app.use("/api/users",usersRoute);
app.use("/api/projects",projectsRoute);
app.use("/api/proposals", proposalRoute);

app.use((err, req, res, next) =>
{
    const status = err.status || 500;
    const message = err.message || "Error interno del servidor";

    return res.status(status).json({
        success: false,
        status: status,
        message: message,
        stack: err.stack,
    });
});

app.listen(port, () =>
{
    connect();
    console.log(`Servidor corriendo en https://localhost:${port}`);
});