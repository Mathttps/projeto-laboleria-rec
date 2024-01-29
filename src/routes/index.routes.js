import { Router } from "express";
import rotaBolo from "./bolo.routes.js";
import rotaPedido from "./pedido.routes.js";
import rotaCliente from "./cliente.routes.js";
import rotaSabores from "./sabores.routes.js";

const router = Router()
router.use(rotaBolo)
router.use(rotaCliente)
router.use(rotaPedido)
router.use(rotaSabores)

export default router