const router = require("express").Router();
let Chat = require("../models/chat.model");
let Message = require("../models/message.model");

router.route("/").get(async (req, res) => {
  try {
    const messageSearch = await Message.aggregate([
      [
        {
          $search: {
            index: "default",
            text: {
              query: `${req.query.q}`,
              path: {
                wildcard: "*",
              },
            },
          },
        },
      ],
    ]);

    const chatSearch = await Chat.aggregate([
      [
        {
          $search: {
            index: "chats",
            text: {
              query: `${req.body.query}`,
              path: {
                wildcard: "*",
              },
            },
          },
        },
      ],
    ]);

    res.json({ chats: chatSearch, messages: messageSearch });
  } catch (e) {
    res.status(400).json("Error: " + err);
  }
});

module.exports = router;
