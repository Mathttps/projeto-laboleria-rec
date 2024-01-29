import { db } from "../database.js";

export async function pegarSaborId(flavourId) {
  return db.query('SELECT * FROM flavours WHERE id=$1', [flavourId]);
}

export async function pegarSaborQuery({ name }) {
  return db.query('INSERT INTO flavours (name) VALUES ($1)', [name]);
}

export async function inserirSabor(name) {
  return db.query('SELECT * FROM flavours WHERE name=$1', [name]);
}


