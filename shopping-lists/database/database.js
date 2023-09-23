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

  console.log('DATABASE_URL:', Deno.env.get("DATABASE_URL"));  // Debugging environment variable
  console.log('SQL initialized as:', sql);  // Debugging sql
  console.log('Connection Pool initialized as:', connectionPool);  // Debugging connection pool
  
  try {
    if (sql) {
      const testResult = await sql.query('SELECT 1;');  // Debugging with a test query
      console.log('Test Query Result:', testResult);

      console.log(`Executing query with sql: ${query}`);
      console.log('Query Parameters:', params);  // Debugging query parameters
      const result = await sql.query(query, params);
      if (result.rows) {
        response.rows = result.rows;
      }
    } else {
      console.log(`Executing query with connectionPool: ${query}`);
      client = await connectionPool.connect();
      const result = await client.queryObject(query, params);
      if (result.rows) {
        response.rows = result.rows;
      }
    }
  } catch (e) {
    console.error(`Database Query Error: ${e}`);
    response.error = e;
  } finally {
    if (client) {
      try {
        await client.release();
      } catch (e) {
        console.error(`Failed to release client: ${e}`);
      }
    }
  }

  return response;
};

export { executeQuery };