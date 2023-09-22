import { serve } from "https://deno.land/std@0.171.0/http/server.ts";
import { configure } from "https://deno.land/x/eta@v2.0.0/mod.ts";
import * as indexController from "./controllers/indexController.js";
import * as listController from "./controllers/listController.js";
import * as itemController from "./controllers/itemController.js";

configure({
  views: `${Deno.cwd()}/views/`,
});

const handleRequest = async (request) => {
  const url = new URL(request.url);

  if (url.pathname === "/" && request.method === "GET") {
    return await indexController.viewIndexPage(request);
  } else if (url.pathname === "/lists" && request.method === "GET") {
    return await listController.viewActiveShoppingLists(request);
  } else if (url.pathname === "/lists" && request.method === "POST") {
    return await listController.addNewShoppingList(request);
  } else if (url.pathname.startsWith("/lists") && url.pathname.endsWith("/deactivate") && request.method === "POST") {
    const id = url.pathname.split('/')[2];
    return await listController.deactivateShoppingList(id);
  } else if (url.pathname.startsWith("/lists/") && request.method === "GET") {
    const id = url.pathname.split('/')[2];
    return await itemController.viewIndividualList(id);
  } else if (url.pathname.startsWith("/lists/") && url.pathname.endsWith("/items") && request.method === "POST") {
    return await itemController.addNewItemToList(request);
  } else if (url.pathname.startsWith("/lists/") && url.pathname.endsWith("/collect") && request.method === "POST") {
    return await itemController.markItemAsCollected(request);
  }
  
    return new Response("Not found", { status: 404 });
};

await serve(handleRequest, { port: 7777 });