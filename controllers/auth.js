const User = require("../models/User");


const userFields = ["_id","email","firstName","lastName","joinedOn"]

exports.googleAuth = async (req, res, next) => {
    try {
        let user = await User.findOne({ "email": req.body.email }).select(userFields)
        if (!user) {
            user = await User.create(req.body)
        }

        sendToken(user, 200, res);
    } catch (err) {
        next(err);
    }
};

const sendToken = (user, statusCode, res) => {
    const token = user.getSignedJwtToken();
     const temp = {
        "_id": user._id,
        "email": user.email,
        "firstName": user.firstName,
        "lastName": user.lastName,
        "joinedOn": user.joinedOn,
        "token":token
    }
    res.status(200).json({ success: true, data: temp });
};
