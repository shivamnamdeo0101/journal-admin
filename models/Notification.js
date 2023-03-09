const mongoose = require("mongoose");

const NotificationRef = new mongoose.Schema({
    text: {
        type: String,
        required: [true, "Please provide text"],
    },
    title: {
        type: String,
        required: [true, "Please provide title"],
    },
    timestamp: {
        type: Number,
        default: Date.now()
    },
    
});


const Notification = mongoose.model("Notification", NotificationRef);

module.exports = Notification;