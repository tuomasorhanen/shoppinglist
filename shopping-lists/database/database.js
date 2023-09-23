import { Pool } from "https://deno.land/x/postgres@v0.17.0/mod.ts";

const CONCURRENT_CONNECTIONS = 2;

const defaultConfig = {
  user: "username",
  database: "database",
  hostname: "database-p1-0ba6f12b-5f0c-4a34-9f0d-ea7be548a6d2",
  port: 5432,
};

let pool;

if (Deno.env.get("DATABASE_URL")) {
  pool = new Pool({ connectionString: Deno.env.get("DATABASE_URL") }, CONCURRENT_CONNECTIONS);
} else {
  pool = new Pool(defaultConfig, CONCURRENT_CONNECTIONS);
}

const executeQuery = async (query, params) => {
  const response = {};
  let client;

  try {
    client = await pool.connect();
    const result = await client.queryObject({ text: query, args: params });
    if (result.rows) {
      response.rows = result.rows;
    }
  } catch (e) {
    console.error("Database query error:", e);
    response.error = e;
  } finally {
    try {
      await client.release();
    } catch (e) {
      console.error("Error releasing client:", e);
    }
  }

  return response;
};

export { executeQuery };
