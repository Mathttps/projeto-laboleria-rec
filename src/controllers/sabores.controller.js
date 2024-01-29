import { inserirSabor, pegarSaborQuery } from "../repositories/sabores.repo.js";

export async function criarSabores(req, res) {
    const { name } = req.body;

    try {
        const existingFlavour = await inserirSabor(name);
        if (existingFlavour.rowCount > 0) {
            return res.status(409).send('Sabor já existe!');
        }

        await pegarSaborQuery(name);
        res.sendStatus(201);
    } catch (err) {
        res.status(500).send(err.message);
    }
}
