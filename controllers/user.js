const User = require("../models/User");



const userFields = ["_id","email","firstName","lastName"]


exports.userProfile = async (req, res, next) => {
    try {
        let user = await User.findById(req.params.userId).select(userFields)
        sendToken(user, 200, res);
    } catch (err) {
        next(err);
    }
};

const sendToken = (user, statusCode, res) => {
    const token = user.getSignedJwtToken();
    const data = { user, token }
    res.status(statusCode).json({ sucess: true, data: data });
};
