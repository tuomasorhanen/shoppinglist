import { executeQuery } from "../database/database.js";

const getActiveShoppingLists = async () => {
  try {
    const result = await executeQuery("SELECT * FROM shopping_lists WHERE active = true");
    if (!result.rows) {
      console.log("Result rows are undefined");
    }
    return result.rows;
  } catch (e) {
    console.error("Error in getActiveShoppingLists:", e);
    throw e;
  }
};


const addNewShoppingList = async (name) => {
  await executeQuery("INSERT INTO shopping_lists (name) VALUES ($name)", { name });
};

const deactivateShoppingList = async (id) => {
  await executeQuery("UPDATE shopping_lists SET active = false WHERE id = $id", { id });
};

export { getActiveShoppingLists, addNewShoppingList, deactivateShoppingList };
