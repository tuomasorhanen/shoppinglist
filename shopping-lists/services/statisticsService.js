import { executeQuery } from "../database/database.js";

const getStatistics = async () => {
  const shoppingListCountResult = await executeQuery("SELECT COUNT(*) as count FROM shopping_lists");
  const shoppingListItemCountResult = await executeQuery("SELECT COUNT(*) as count FROM shopping_list_items");

  return {
    shoppingListsCount: shoppingListCountResult.rows[0]?.count || 0,
    shoppingListItemsCount: shoppingListItemCountResult.rows[0]?.count || 0,
  };
};

export { getStatistics };
