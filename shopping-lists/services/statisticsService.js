import { sql } from "../database/database.js";

const getStatistics = async () => {
  const shoppingListCount = await sql`SELECT COUNT(*) as count FROM shopping_lists`;
  const shoppingListItemCount = await sql`SELECT COUNT(*) as count FROM shopping_list_items`;

  return {
    shoppingListsCount: shoppingListCount.rows[0]?.count || 0,
    shoppingListItemsCount: shoppingListItemCount.rows[0]?.count || 0,
  };
};

export { getStatistics };
