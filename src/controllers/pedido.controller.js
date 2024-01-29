import dayjs from "dayjs";
import {
  getAllOrdersQuery,
  getCakeQuery,
  getClientQuery,
  getOrderByIdQuery,
  insertOrder,
  getClientsOrderByIdQuery
} from "../repositories/pedido.repo.js";

const mapCampo = (order) => ({
  client: {
    id: order.clientId,
    name: order.clientName,
    address: order.address,
    phone: order.phone
  },
  cake: {
    id: order.cakeId,
    name: order.cakeName,
    price: parseFloat(order.price),
    description: order.description,
    image: order.image,
    flavourId: order.flavourId
  },
  orderId: order.id,
  quantity: order.quantity,
  totalPrice: parseFloat(order.totalPrice),
  createdAt: dayjs(order.createdAt).format("YYYY-MM-DD HH:mm")
});


export async function pegarPedCliente(req, res) {
  const clientId = req.params.id;

  try {
    const ordersQuery = await getClientsOrderByIdQuery(clientId);

    if (ordersQuery.rowCount === 0) {
      return res.status(404).send("Teste");
    }
    const orders = ordersQuery.rows;
    res.status(200).json(orders);
  } catch (err) {
    return res.status(500).send(`Erro: ${err.message}`);
  }
}


export async function criarPedid(req, res) {
  const { clientId, cakeId, quantity, totalPrice } = req.body;

  try {
    const clientQuery = await getClientQuery(clientId);
    if (clientQuery.rowCount === 0) {
      return res.status(404).send("Cliente não encontrado.");
    }

    const cakeQuery = await getCakeQuery(cakeId);
    if (cakeQuery.rowCount === 0) {
      return res.status(404).send("Bolo não encontrado.");
    }

    await insertOrder(clientId, cakeId, quantity, totalPrice);

    res.sendStatus(201);
  } catch (err) {
    return res.status(500).send(`Erro ao criar pedido: ${err.message}`);
  }
}

export async function criarPedidos(req, res) {
  const date = req.query.date;

  try {
    const response = await getAllOrdersQuery(date);

    if (response.rowCount === 0) {
      return res.status(404).send([]);
    }

    const orders = response.rows.map(mapCampo);
    res.json(orders);
  } catch (err) {
    return res.status(500).send(`Erro ao buscar pedido: ${err.message}`);
  }
}


export async function getOrderById(req, res) {
  const orderId = req.params.id;

  try {
    const result = await getOrderByIdQuery(orderId);
    if (result.rowCount === 0) {
      return res.status(404).send("Pedido não existe!");
    }

    const order = mapCampo(result.rows[0]);
    res.json(order);
  } catch (err) {
    return res.status(500).send(`Erro ao buscar pedido por ID: ${err.message}`);
  }
}
