import { Router } from "express";
import { orderSchema } from "../schemas/pedido.schema.js";
import { validateSchema } from "../middlewares/validate.schema.js";
import { pegarPedCliente } from "../controllers/pedido.controller.js";
import { criarPedid, getOrderById, criarPedidos } from "../controllers/pedido.controller.js";


const rotaPedido = Router()
rotaPedido.post("/order", validateSchema(orderSchema), criarPedid)
rotaPedido.get("/order", criarPedidos)
rotaPedido.get("/order/:id", getOrderById)

export default rotaPedido