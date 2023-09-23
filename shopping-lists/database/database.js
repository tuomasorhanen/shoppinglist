import { Pool, postgres } from "../deps.js";

const CONCURRENT_CONNECTIONS = 2;

let connectionPool;
if (Deno.env.get("DATABASE_URL")) {
  connectionPool = new Pool({ connectionString: Deno.env.get("DATABASE_URL") }, CONCURRENT_CONNECTIONS);
} else {
  connectionPool = new Pool({}, CONCURRENT_CONNECTIONS);
}

export { connectionPool as sql };
