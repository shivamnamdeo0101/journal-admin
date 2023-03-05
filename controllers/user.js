const User = require("../models/User");

exports.userProfile = async (req, res, next) => {
    const {userId } = req.params;
    try {
        let user = await User.findById(req.params.userId)
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
