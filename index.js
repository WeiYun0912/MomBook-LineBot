import linebot from "linebot";
import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import Book from "./models/book.js";

dotenv.config();

var bot = linebot({
  channelId: process.env.LINE_channelId,
  channelSecret: process.env.LINE_channelSecret,
  channelAccessToken: process.env.LINE_channelAccessToken,
});

const uri = process.env.ATLAS_URI;

mongoose.connect(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const connection = mongoose.connection;

connection.once("open", () => {
  console.log("mogoose connect!!!");
});

bot.on("message", async (e) => {
  let b = await Book.findOne({ ISBN: e.message.text }); //test
  console.log(b);
  bot.push(
    "Ua1f9a2bb1d951e2e78a03a9e0b7d5993",
    "妳已經買過這本書了 書名：" + b.name
  );
  //   console.log(e);
});

const app = express();
const linebotParser = bot.parser();
app.post("/", linebotParser);

//因為 express 預設走 port 3000，而 heroku 上預設卻不是，要透過下列程式轉換
// var server = app.listen(process.env.PORT || 8080, function () {
//   var port = server.address().port;
//   console.log("App now running on port", port);
// });

bot.listen("/line", 4020);
