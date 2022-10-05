const { Schema, default: mongoose } = require("mongoose");

const userSchema = new Schema({
    id: { type: Number, required: true, unique: true, trim: true },
    name: { type: String, required: true, trim: true },
});

const User = mongoose.model("User", userSchema);
module.exports = User;
