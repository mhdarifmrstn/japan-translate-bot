import { Telegraf } from "telegraf";
import env from "./services/env.js";
import translate from "./services/translate.js";
import express from "express";

const bot = new Telegraf(env.botToken);

bot.start(async (ctx) => {
  await ctx.reply(
    `Welcome ${ctx.from.first_name}\n` +
      `Feel free to send me any text and I will translate it for you`
  );
});
bot.on("text", async (ctx) => {
  const text = ctx.message.text;
  const { pronunciation, resultText } = await translate(text);

  if (pronunciation) {
    await ctx.reply(pronunciation);
  }
  await ctx.reply(resultText);
});

if (process.env.DEVELOPMENT) {
  bot.launch();
} else {
  const server = express();
  const domain = process.env.WEBHOOK_DOMAIN;
  const port = process.env.PORT || 8080;

  if (!domain) {
    throw Error("Provide WEBHOOK_DOMAIN");
  }
  server.use(await bot.createWebhook({ domain }));
  server.listen(port, () => console.log(`Server listening on ${port}`));
}

process.once("SIGINT", () => bot.stop("SIGINT"));
process.once("SIGTERM", () => bot.stop("SIGTERM"));
