const crypto = require("crypto");
const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { type } = require("os");

const UserRef = new mongoose.Schema({

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
    },
    joinedOn: {
        type: Number,
        default: Date.now()
    },
    defaultBrokerId: {
        type: String,
    },

    brokers: [{
        brokerName: {
            type: String,
            required: [true, "Please provide brokerName"],
        },
        amtWithdraw: {
            type: Number,
        },
        amtDeposit: {
            type: Number,
            required: [true, "Please provide deposit amount"],
        }

    }],

    trades: [{

        brokerId: {
            type: String,
            default: null
        },
        date: {
            type: String,
            default: null
        },
        addOn: {
            type: Number,
            default: Date.now()
        },
        updateOn: {
            type: Number,
            default: Date.now()
        },
        tradeName: {
            type: String,
            default: null
        },
        action: {
            type: String,
            default: null
        },
        segment: {
            type: String,
            default: null
        },
        tradeType: {
            type: String,
            default: null
        },
        chartTimeFrame: {
            type: String,
            default: null
        },
        mindSetBeforeTrade: {
            type: String,
            default: null
        },
        mindSetAfterTrade: {
            type: String,
            default: null
        },
        session: {
            type: String,
            default: null
        },
        quantity: {
            type: Number,
            default: null
        },
        entryPrice: {
            type: Number,
            default: null
        },
        exitPrice: {
            type: Number,
            default: null
        },
        entryNote: {
            type: String,
            default: null
        },
        exitNote: {
            type: String,
            default: null
        }

    }],

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