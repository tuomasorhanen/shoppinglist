import { postgres } from "../deps.js";

let sql;
if (Deno.env.get("DATABASE_URL")) {
  sql = postgres(Deno.env.get("DATABASE_URL"));
} else {
  sql = postgres({});
}

const executeQuery = async (query, params) => {
  const response = {};
  try {
    const result = await sql.queryObject({ text: query, args: params });
    if (result && result.rows) {
      response.rows = result.rows;
    }
  } catch (e) {
    response.error = e;
  }

  return response;
};

export { sql, executeQuery };
