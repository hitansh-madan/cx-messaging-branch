const router = require("express").Router();
let Chat = require("../models/chat.model");
const Message = require("../models/message.model");

router.route("/").get((req, res) => {
    Chat.find()
        .then((users) => res.json(users))
        .catch((err) => res.status(400).json("Error: " + err));
});

router.route("/:id").get((req, res) => {
    Chat.findOne({ id: req.params.id })
        .then((user) => res.json(user))
        .catch((err) => res.status(400).json("Error: " + err));
});

router.route("/update/:id").post((req, res) => {
    Chat.findOne({ id: req.params.id })
        .then((chat) => {
            chat.active = req.body.active;
            chat.assigned = req.body.assigned;
            chat.assignedTo = req.body.assignedTo;
            chat.priority = req.body.priority || chat.priority;

            chat.save()
                .then(() => res.json("Chat updated!"))
                .catch((err) => res.status(400).json("Error: " + err));
        })
        .catch((err) => res.status(400).json("Error: " + err));
});

//--------------------messages-----------------------

router.route("/:id/messages").get((req, res) => {
    Message.find({ chatId: req.params.id })
        .then((messages) => res.json(messages))
        .catch((err) => res.status(400).json("Error: " + err));
});

router.route("/:id/messages").post((req, res) => {
    const senderType = req.body.senderType;
    const senderId = req.body.senderId;
    const chatId = req.params.id;
    const message = req.body.message;

    const newMessage = new Message({ senderType, senderId, chatId, message });

    newMessage
        .save()
        .then(() => res.json("Message added!"))
        .catch((err) => res.status(400).json("Error: " + err));

    Chat.findOne({ id: req.params.id })
        .then((chat) => {
            if (chat.active === false) {
                chat.active = true;
                chat.assigned = senderType === "agent" ? true : false;
                chat.assignedTo = senderType === "agent" ? senderId : undefined;
                chat.priority = "low"; //TODO : get priority based on message

                chat.save()
                    .then(() => res.json("Chat updated!"))
                    .catch((err) => res.status(400).json("Error: " + err));
            }
        })
        .catch((err) => res.status(400).json("Error: " + err));
});

module.exports = router;

// router.route("/add").post((req, res) => {
//     const id = req.body.id;
//     const newChat = new User({ id, active : false });

//     newChat
//         .save()
//         .then(() => res.json("Chat added!"))
//         .catch((err) => res.status(400).json("Error: " + err));
// });
