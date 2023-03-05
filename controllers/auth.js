const User = require("../models/User");

exports.googleAuth = async (req, res, next) => {
    try {
        let user = await User.findOne({ "email": req.body.email })
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
    const data = { user, token }
    res.status(statusCode).json({ sucess: true, data: data });
};
