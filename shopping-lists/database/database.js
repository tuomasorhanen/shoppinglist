import { Pool } from "https://deno.land/x/postgres@v0.17.0/mod.ts";
import { postgres } from "../deps.js";

const CONCURRENT_CONNECTIONS = 2;

let sql;
let connectionPool;

if (Deno.env.get("DATABASE_URL")) {
  sql = postgres(Deno.env.get("DATABASE_URL"));
} else {
  connectionPool = new Pool({}, CONCURRENT_CONNECTIONS);
}

const executeQuery = async (query, params) => {
  const response = {};
  let client;

  try {
    if (sql) {
      const result = await sql.query(query, ...params);
      if (result.rows) {
        response.rows = result.rows;
      }
    } else {
      client = await connectionPool.connect();
      const result = await client.queryObject(query, params);
      if (result.rows) {
        response.rows = result.rows;
      }
    }
  } catch (e) {
    response.error = e;
  } finally {
    if (client) {
      try {
        await client.release();
      } catch (e) {
        console.log(e);
      }
    }
  }

  return response;
};

export { executeQuery };
