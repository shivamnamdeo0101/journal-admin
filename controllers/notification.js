const { default: mongoose } = require("mongoose");
const Notification = require("../models/Notification");
const { sendPushNotification } = require("../utils/sendPushNotification");


exports.addNotification= async (req, res, next) => {
    try {
        const notification = await Notification.create(req.body);
        await sendPushNotification(req.body)
        res.status(200).json({ message: "Notification added successfully" });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Internal server error" });
    }
};
exports.getAllNotification= async (req, res, next) => {
    try {
        const notification = await Notification.find({}).sort({'timestamp': -1});

        res.status(200).json({ length:notification.length,data:notification });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Internal server error" });
    }
};