import express from "express";
import "reflect-metadata";
import { AppDataSource } from "./infra/config/dataSource";
import rotas from "./app/rotas";
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
