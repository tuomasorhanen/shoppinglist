import { renderFile } from "https://deno.land/x/eta@v2.0.0/mod.ts";
import * as listService from "../services/listService.js";
import { redirectTo } from "../utils/requestUtils.js";

const responseDetails = {
  headers: { "Content-Type": "text/html;charset=UTF-8" },
};

const viewActiveShoppingLists = async (request) => {
  const activeLists = await listService.getActiveShoppingLists();
  return new Response(await renderFile("shoppingList.eta", { activeLists }), responseDetails);
};

const addNewShoppingList = async (request) => {
  try {
    const formData = await request.formData();
    const name = formData.get("name");
    if (name) {
      await listService.addNewShoppingList(name);
      return redirectTo("/lists");
    } else {
      return new Response("Invalid name", { status: 400 });
    }
  } catch (error) {
    console.error(error);
    return new Response("Internal Server Error", { status: 500 });
  }
};

const deactivateShoppingList = async (id) => {
  await listService.deactivateShoppingList(id);
  return redirectTo("/lists");
};

export { viewActiveShoppingLists, addNewShoppingList, deactivateShoppingList };
