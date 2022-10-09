require("dotenv").config();
const port = process.env.PORT || 5000;
const uri = process.env.ATLAS_URI || "mongodb://127.0.0.1:27017";

const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");

const app = express();
app.use(cors());
app.use(express.json());

mongoose.connect(uri, { useNewUrlParser: true });
const connection = mongoose.connection;
connection.once("open", () => {
  console.log("MongoDB connection established successfully");
});

const server = app.listen(port, () => {
  console.log(`server running on ${port}`);
});

const io = require("socket.io")(server, {
  cors: process.env.DEPLOYED_URL || "127.0.0.1",
});

const usersRouter = require("./routes/users");
const chatsRouter = require("./routes/chats")(io);
const agentsRouter = require("./routes/agents");
const searchRouter = require("./routes/search");

app.use("/users", usersRouter);
app.use("/chats", chatsRouter);
app.use("/agents", agentsRouter);
app.use("/search", searchRouter);

io.on("connection", (socket) => {
  console.log("connected socket");

  socket.on("join_chat", async (chatId) => {
    await socket.join(chatId);
    console.log("joined " + chatId);
  });

  socket.on("change_chat", async (chatId) => {
    (await socket.rooms).forEach((room) => {
      socket.leave(room);
    });
    await socket.join(chatId);
    console.log(socket.rooms);
  });
});
