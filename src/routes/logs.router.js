import express from "express";
import LogController from "../app/controllers/LogController.js";

const logsRouter = express.Router();
logsRouter.get("/", LogController.getLogs);
logsRouter.get("/:id", LogController.getLogById);
logsRouter.post("/", LogController.transform);

export default logsRouter;
