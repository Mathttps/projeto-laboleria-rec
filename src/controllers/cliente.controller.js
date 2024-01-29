import dayjs from "dayjs";
import { getClientsOrderByIdQuery } from "../repositories/pedido.repo.js";
import { pegarIDclientQ, inserirCliente } from "../repositories/cliente.repo.js";


function formatarPedido(order) {
    return {
        ...order,
        totalPrice: parseFloat(order.totalPrice),
        createdAt: dayjs(order.createdAt).format('YYYY-MM-DD HH:mm')
    };
}


export async function criarCliente(req, res) {
    const { name, address, phone } = req.body;

    try {
        await inserirCliente(name, address, phone);
        res.sendStatus(201);
    } catch (err) {
        res.status(500).send(err.message);
    }
}

export async function pegarPedidoID(req, res) {
    const clientId = req.params.id;

    try {
        const clientExists = await pegarIDclientQ(clientId);
        if (clientExists.rowCount === 0) {
            return res.status(404).send('Cliente não existe!');
        }

        const result = await getClientsOrderByIdQuery(clientId);
        const clientOrders = result.rows.map(formatarPedido);

        res.status(200).send(clientOrders);
    } catch (err) {
        res.status(500).send(err.message);
    }
}

