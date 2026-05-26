import express from "express";
import errorHandler from './shared/middleware/errorHandler.js';
import { userRouter } from "./modules/user/user.routes.js";

const app = express();
app.use(express.json());

app.use("/user", userRouter);

app.use(errorHandler)

const PORT = 3030
app.listen(PORT, () => {
    console.log(`Servidor rodando em http://localhost:${PORT}`)
})
