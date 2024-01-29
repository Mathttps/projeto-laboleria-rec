import { Router } from "express";
import { cakeSchema } from "../schemas/bolo.schema.js";
import { criarBolo } from "../controllers/bolo.controller.js";
import { validateSchema } from "../middlewares/validate.schema.js";

const rotaBolo = Router()
rotaBolo.post("/cakes", validateSchema(cakeSchema), criarBolo)

export default rotaBolo