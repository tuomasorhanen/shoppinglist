import { executeQuery } from "../database/database.js";

const getItemsByListId = async (id) => {
  return await getItemsByListIdOrdered(id);
};

const addItemToList = async (listId, itemName) => {
  await executeQuery(
    sql`INSERT INTO shopping_list_items (name, shopping_list_id) VALUES (${itemName}, ${listId})`
  );
};

const markItemCollected = async (itemId) => {
  await executeQuery(
    sql`UPDATE shopping_list_items SET collected = true WHERE id = ${itemId}`
  );
};

const getItemsByListIdOrdered = async (id) => {
  const result = await executeQuery(
    sql`SELECT * FROM shopping_list_items WHERE shopping_list_id = ${id} ORDER BY collected ASC, name ASC`
  );
  return result.rows;
};

const getShoppingListById = async (id) => {
  const result = await executeQuery(
    sql`SELECT * FROM shopping_lists WHERE id = ${id}`
  );
  return result.rows[0];
};

export {
  getItemsByListId,
  addItemToList,
  markItemCollected,
  getItemsByListIdOrdered,
  getShoppingListById,
};
