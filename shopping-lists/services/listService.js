import { executeQuery } from "../database/database.js";

const getActiveShoppingLists = async () => {
  const result = await executeQuery("SELECT * FROM shopping_lists WHERE active = true");
  return result.rows;
};

const addNewShoppingList = async (name) => {
  await executeQuery("INSERT INTO shopping_lists (name) VALUES ($name)", { name });
};

const deactivateShoppingList = async (id) => {
  await executeQuery("UPDATE shopping_lists SET active = false WHERE id = $id", { id });
};

export { getActiveShoppingLists, addNewShoppingList, deactivateShoppingList };
