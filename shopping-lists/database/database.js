import { Pool } from "https://deno.land/x/postgres@v0.17.0/mod.ts";

const CONCURRENT_CONNECTIONS = 2;
let connectionPool;

if (Deno.env.get("DATABASE_URL")) {
  connectionPool = new Pool({ connectionString: Deno.env.get("DATABASE_URL") }, CONCURRENT_CONNECTIONS);
} else {
  connectionPool = new Pool({}, CONCURRENT_CONNECTIONS);
}

const executeQuery = async (query, params) => {
  const response = {};
  let client;

  try {
    client = await connectionPool.connect();
    const result = await client.queryObject(query, params);
    if (result.rows) {
      response.rows = result.rows;
    }
  } catch (e) {
    response.error = e;
  } finally {
    try {
      await client.release();
    } catch (e) {
      console.log(e);
    }
  }

  return response;
};

export { executeQuery };
