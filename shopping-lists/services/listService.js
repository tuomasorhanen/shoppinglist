import { sql } from "../database/database.js";

const getActiveShoppingLists = async () => {
  const result = await sql("SELECT * FROM shopping_lists WHERE active = true");
  return result.rows;
};

const addNewShoppingList = async (name) => {
  await sql("INSERT INTO shopping_lists (name) VALUES ($name)", { name });
};

const deactivateShoppingList = async (id) => {
  await sql("UPDATE shopping_lists SET active = false WHERE id = $id", { id });
};

export { getActiveShoppingLists, addNewShoppingList, deactivateShoppingList };
