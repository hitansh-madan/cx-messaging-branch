const router = require("express").Router();
let Agent = require("../models/agent.model");

router.route("/").get((req, res) => {
    Agent.find()
        .then((exercises) => res.json(exercises))
        .catch((err) => res.status(400).json("Error: " + err));
});

router.route("/:id").get((req, res) => {
    Agent.findOne({ id: req.params.id })
        .then((agent) => res.json(agent))
        .catch((err) => res.status(400).json("Error: " + err));
});

router.route("/add").post((req, res) => {
    const name = req.body.name;
    const id = req.body.id;

    const newAgent = new Agent({ id, name });

    newAgent
        .save()
        .then(() => res.json("Agent added!"))
        .catch((err) => res.status(400).json("Error: " + err));
});

router.route("/:id").delete((req, res) => {
    Agent.findOneAndDelete({ id: req.params.id })
        .then(() => res.json("Agent deleted."))
        .catch((err) => res.status(400).json("Error: " + err));
});

router.route("/update/:id").post((req, res) => {
    Agent.findOne({ id: req.params.id })
        .then((agent) => {
            agent.name = req.body.name;
            agent
                .save()
                .then(() => res.json("Agent updated!"))
                .catch((err) => res.status(400).json("Error: " + err));
        })
        .catch((err) => res.status(400).json("Error: " + err));
});

module.exports = router;
