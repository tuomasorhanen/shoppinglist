import { executeQuery } from "../database/database.js";

const getStatistics = async () => {
  let shoppingListsCount = 0;
  let shoppingListItemsCount = 0;

  try {
    const shoppingListCountResult = await executeQuery("SELECT COUNT(*) as count FROM shopping_lists");
    const shoppingListItemCountResult = await executeQuery("SELECT COUNT(*) as count FROM shopping_list_items");

    if (shoppingListCountResult.rows) {
      shoppingListsCount = shoppingListCountResult.rows[0]?.count || 0;
    }
    
    if (shoppingListItemCountResult.rows) {
      shoppingListItemsCount = shoppingListItemCountResult.rows[0]?.count || 0;
    }
  } catch (error) {
    console.log('Database error:', error);
    return { error: 'Database error' };
  }

  return {
    shoppingListsCount,
    shoppingListItemsCount,
  };
};
export { getStatistics };
