const { Schema, default: mongoose } = require("mongoose");

const chatSchema = new Schema(
    {
        id: { type: Number, required: true, unique: true, trim: true },
        active: { type: Boolean, required: true },
        assigned: {
            type: Boolean,
            required: function () {
                return this.active;
            },
        },
        assignedTo: {
            type: Number,
            required: function () {
                return this.assigned;
            },
        },
        priority: {
            type: String,
            enum: ["low", "medium", "high"],
            required: function () {
                return this.active;
            },
        },
    },
    { timestamps: true }
);

const Chat = mongoose.model("Chat", chatSchema);
module.exports = Chat;
