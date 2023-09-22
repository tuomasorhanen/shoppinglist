import { executeQuery } from "../database/database.js";

const getStatistics = async () => {
  const shoppingListCount = await executeQuery("SELECT COUNT(*) as count FROM shopping_lists");
  const shoppingListItemCount = await executeQuery("SELECT COUNT(*) as count FROM shopping_list_items");

  return {
    shoppingListsCount: shoppingListCount.rows[0]?.count || 0,
    shoppingListItemsCount: shoppingListItemCount.rows[0]?.count || 0,
  };
};

export { getStatistics };
