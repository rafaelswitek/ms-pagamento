import express from "express";
import pagamentosRotas from "../rotas/pagamentosRotas";
const router = (app: express.Router) => {
  app.use("/pagamentos", pagamentosRotas);
};
export default router;
