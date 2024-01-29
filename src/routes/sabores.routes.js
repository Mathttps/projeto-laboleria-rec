import { Router } from "express";
import { flavoursSchema } from "../schemas/sabor.schema.js";
import { validateSchema } from "../middlewares/validate.schema.js";
import { criarSabores } from "../controllers/sabores.controller.js";

const rotaSabores = Router()
rotaSabores.post("/flavours", validateSchema(flavoursSchema), criarSabores)

export default rotaSabores