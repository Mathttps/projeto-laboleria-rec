import { db } from "../database.js";

export async function inserirBolo(name, price, image, description, flavourId) {
    const result = await db.query(
        `INSERT INTO cakes (name, price, image, description, "flavourId")
         VALUES ($1, $2, $3, $4, $5)`,
        [name, price, image, description, flavourId]
    );
    return result;
}

export async function pegarNomeBolo(name) {
    const result = await db.query('SELECT * FROM cakes WHERE name=$1', [name]);
    return result;
}

