const router = require("express").Router();
let Chat = require("../models/chat.model");
let User = require("../models/user.model");

router.route("/").get((req, res) => {
    User.find()
        .then((users) => res.json(users))
        .catch((err) => res.status(400).json("Error: " + err));
});

router.route("/:id").get((req, res) => {
    User.findOne({ id: req.params.id })
        .then((user) => res.json(user))
        .catch((err) => res.status(400).json("Error: " + err));
});

router.route("/add").post((req, res) => {
    const name = req.body.name;
    const id = req.body.id;

    const newUser = new User({ id, name });

    newUser
        .save()
        .then(() => {
            const newChat = new Chat({ id, active: false });
            newChat
                .save()
                .catch((err) => res.status(400).json("Error: " + err));
            res.json("User added!");
        })
        .catch((err) => res.status(400).json("Error: " + err));
});

router.route("/:id").delete((req, res) => {
    User.findOneAndDelete({ id: req.params.id })
        .then(() => res.json("User deleted."))
        .catch((err) => res.status(400).json("Error: " + err));
});

router.route("/update/:id").post((req, res) => {
    User.findOne({ id: req.params.id })
        .then((user) => {
            user.name = req.body.name;
            user.save()
                .then(() => res.json("User updated!"))
                .catch((err) => res.status(400).json("Error: " + err));
        })
        .catch((err) => res.status(400).json("Error: " + err));
});

module.exports = router;
