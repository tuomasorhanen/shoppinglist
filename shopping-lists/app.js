import { serve } from "./deps.js";
import { sql } from "./database/database.js";

const handleRequest = async (request) => {
  const url = new URL(request.url);
  if (url.pathname === "/") {
    const rows = await sql`SELECT COUNT(*) as count FROM shopping_lists`;
    let rowCount = -42;
    if (rows.length > 0) {
      rowCount = rows[0].count;
    }

    return new Response(`Total rows: ${rowCount}`);
  }

  return new Response("Not found", { status: 404 });
};

await serve(handleRequest, { port: 7777 });
