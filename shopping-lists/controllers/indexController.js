import { renderFile } from "https://deno.land/x/eta@v2.0.0/mod.ts";
import * as statisticsService from "../services/statisticsService.js";

const responseDetails = {
  headers: { "Content-Type": "text/html;charset=UTF-8" },
};

const viewIndexPage = async (request) => {
  const stats = await statisticsService.getStatistics();
  return new Response(await renderFile("index.eta", { ...stats }), responseDetails);
};

const viewStatistics = async (request) => {
  const stats = await statisticsService.getStatistics();
  return new Response(await renderFile("index.eta", { stats }), responseDetails);
};

export { viewIndexPage, viewStatistics };
