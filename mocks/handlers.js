import { graphql } from "msw";

const api = graphql.link("https://devapi.podkrepime.bg/graphql");

export const handlers = [
  api.query("TrainingList", async (req, res, ctx) => {
    console.log("HERE");
    const originalResponse = await ctx.fetch(req);
    const originalResponseData = await originalResponse.json();
    return res(originalResponseData);
  })
];
