import { executeQuery } from "../database/database.js";

const getActiveShoppingLists = async () => {
  const result = await executeQuery(sql`SELECT * FROM shopping_lists WHERE active = true`);
  return result.rows;
};

const addNewShoppingList = async (name) => {
  await executeQuery(sql`INSERT INTO shopping_lists (name) VALUES (${name})`);
};

const deactivateShoppingList = async (id) => {
  await executeQuery(sql`UPDATE shopping_lists SET active = false WHERE id = ${id}`);
};

export { getActiveShoppingLists, addNewShoppingList, deactivateShoppingList };
