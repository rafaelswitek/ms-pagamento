import express from "express";
import rotas from "./rotas";
import "reflect-metadata";
import { AppDataSource } from "./config/dataSource";
const app = express();
app.use(express.json());
rotas(app);

AppDataSource.initialize()
    .then(() => {
        console.log("Banco de dados conectado");
    })
    .catch((erro) => {
        console.log(erro);
    });

export default app;
