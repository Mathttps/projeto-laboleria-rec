import { Router } from "express";
import { clientsSchema } from "../schemas/cliente.schema.js";
import { validateSchema } from "../middlewares/validate.schema.js";
import { criarCliente, pegarPedidoID } from "../controllers/cliente.controller.js";

const rotaCliente = Router()
rotaCliente.post("/clients", validateSchema(clientsSchema), criarCliente)
rotaCliente.get("/clients/:id/order", pegarPedidoID)

export default rotaCliente