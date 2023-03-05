const crypto = require("crypto");
const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { type } = require("os");

const UserRef = new mongoose.Schema({
    timestamp: {
        type: Number,
        default: Date.now()
    },
    email: {
        type: String,
        required: [true, "Please provide email"],
        unique: true
    },
    firstName: {
        type: String,
        required: [true, "Please provide firstName"],
    },
    lastName: {
        type: String,
        required: [true, "Please provide lastName"],
    }

});


UserRef.pre("save", async function (next) {
    next();
});

UserRef.methods.getSignedJwtToken = function () {
    return jwt.sign({ id: this._id }, process.env.JWT_SECRET, {
        expiresIn: process.env.JWT_EXPIRE,
    });
};





const User = mongoose.model("User", UserRef);

module.exports = User;