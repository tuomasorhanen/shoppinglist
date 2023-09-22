import { renderFile } from "https://deno.land/x/eta@v2.0.0/mod.ts";
import * as itemService from "../services/itemService.js";
import { redirectTo } from "../utils/requestUtils.js";

const responseDetails = {
  headers: { "Content-Type": "text/html;charset=UTF-8" },
};

const addNewItemToList = async (request) => {
  const id = new URL(request.url).pathname.split('/')[2];
  const formData = await request.formData();
  const itemName = formData.get("item");
  if (itemName) {
    await itemService.addItemToList(id, itemName);
    return redirectTo(`/lists/${id}`);
  } else {
    return new Response("Invalid item name", { status: 400 });
  }
};

const markItemAsCollected = async (request) => {
  const parts = new URL(request.url).pathname.split('/');
  const listId = parts[2];
  const itemId = parts[4];
  await itemService.markItemCollected(itemId);
  return redirectTo(`/lists/${listId}`);
};

const viewIndividualList = async (id) => {
  const shoppingList = await itemService.getShoppingListById(id);
  const items = await itemService.getItemsByListId(id);
  return new Response(await renderFile("individualList.eta", { shoppingList, items }), responseDetails);
};

export { addNewItemToList, markItemAsCollected, viewIndividualList };
