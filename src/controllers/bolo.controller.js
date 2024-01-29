import { pegarSaborId } from "../repositories/sabores.repo.js";
import { pegarNomeBolo, inserirBolo } from "../repositories/bolo.repo.js";


export async function criarBolo(req, res) {
    const { name, price, image, description, flavourId } = req.body;

    try {
        const isFlavourValid = (await pegarSaborId(flavourId)).rowCount > 0;
        if (!isFlavourValid) {
            return res.status(404).send("Digite um válido!");
        }

        const isCakeNameUnique = (await pegarNomeBolo(name)).rowCount === 0;
        if (!isCakeNameUnique) {
            return res.status(409).send("Esse nome já existe!");
        }

        await inserirBolo(name, price, image, description, flavourId);
        
        res.sendStatus(201);
    } catch (err) {
        res.status(500).send(err.message);
    }
}
