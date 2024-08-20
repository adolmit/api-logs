import express from "express";
import logsRouter from "./logs.router.js";

const routerApi = (app) => {
  const router = express.Router();
  app.use("/api/v1", router);
  router.use("/logs", logsRouter);
};

export default routerApi;
