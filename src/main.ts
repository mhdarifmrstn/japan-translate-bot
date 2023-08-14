import { Telegraf } from "telegraf";
import env from "./services/env.js";
import translate from "./services/translate.js";

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

bot.launch();

process.once("SIGINT", () => bot.stop("SIGINT"));
process.once("SIGTERM", () => bot.stop("SIGTERM"));
