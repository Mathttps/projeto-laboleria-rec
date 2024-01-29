import { db } from "../database.js";

export async function getCakeQuery(cakeId) {
  return db.query('SELECT * FROM cakes WHERE id=$1', [cakeId]);
}

export async function insertOrder(clientId, cakeId, quantity, totalPrice) {
  return db.query(
    `INSERT INTO orders ("clientId", "cakeId", quantity, "totalPrice", "createdAt") 
     VALUES ($1, $2, $3, $4, NOW())`,
    [clientId, cakeId, quantity, totalPrice]
  );
}

export async function getClientQuery(clientId) {
  return db.query('SELECT * FROM clients WHERE id=$1', [clientId]);
}



export async function getOrderByIdQuery(orderId) {
  const query = `
    SELECT 
      o.*, 
      o.id AS orderId,
      c.name AS clientName,
      k.name AS cakeName,
      c.address,
      c.phone,
      k.price,
      k.image,
      k.description
    FROM orders o
    JOIN clients c ON c.id = o."clientId"
    JOIN cakes k ON k.id = o."cakeId"
    WHERE o.id=$1`;
  
  return db.query(query, [orderId]);
}

export async function getClientsOrderByIdQuery(clientId) {
  return db.query(`
    SELECT 
      o.id AS orderId, 
      o.quantity, 
      o."createdAt", 
      o."totalPrice",
      k.name AS cakeName
    FROM orders o
    JOIN cakes k ON o."cakeId" = k.id
    WHERE o."clientId" = $1
  `, [clientId]);
}

export async function getAllOrdersQuery(date) {
  const query = `
    SELECT 
      o.*, 
      c.name AS clientName,
      k.name AS cakeName,
      c.address,
      c.phone,
      k.price,
      k.image,
      k.description,
      k."flavourId"
    FROM orders o
    JOIN clients c ON c.id = o."clientId"
    JOIN cakes k ON k.id = o."cakeId"
    JOIN flavours f ON f.id = k."flavourId"
    ${date
      ? 'WHERE o."createdAt" >= TO_TIMESTAMP($1, \'YYYY-MM-DD\') AND o."createdAt" < TO_TIMESTAMP($1, \'YYYY-MM-DD\') + INTERVAL \'1 DAY\''
      : ''
    }`;
  
  return db.query(query, date ? [date] : []);
}
