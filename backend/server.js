require("dotenv").config();
const port = process.env.PORT || 5000;
const uri = process.env.ATLAS_URI || "mongodb://127.0.0.1:27017";

const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");

const app = express();
app.use(cors);
app.use(express.json());

mongoose.connect(uri, { useNewUrlParser: true });
const connection = mongoose.connection;
connection.once("open", () => {
    console.log("MongoDB connection established successfully");
});

app.listen(port, () => {
    console.log(`server running on ${port}`);
});
