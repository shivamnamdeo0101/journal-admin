const { default: mongoose } = require("mongoose");
const User = require("../models/User");

const userFields = ["_id", "email", "firstName", "lastName"]

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


//Broker................



exports.getAllUserBroker = async (req, res, next) => {
    try {
        const user = await User.findById(req.params.userId);
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }
        res.status(200).json({ length: user.brokers.length, data: user.brokers });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Internal server error" });
    }
};


exports.addBroker = async (req, res, next) => {
    try {
        const user = await User.findById(req.body.userId);
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }
        const broker = req.body;
        if (!broker) {
            return res.status(400).json({ message: "Missing broker parameter" });
        }
        user.brokers.push(broker);
        await user.save();
        res.status(200).json({ message: "Broker added successfully" });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Internal server error" });
    }
};

exports.updateBroker = async (req, res, next) => {

    var brokerId = req.body.brokerId;
    var userId = new mongoose.Types.ObjectId(req.body.userId);
    const user = await User.findById(userId);
    if (!user) {
        return res.status(404).json({ message: "user not found" });
    }
    const newBrokerObject = req.body.broker;

    let brokerList = user.brokers;

    const brokerIndex = brokerList.findIndex(
        (broker) => broker._id == brokerId
    );
    brokerList[brokerIndex] = { _id: brokerId, ...newBrokerObject };

    user.brokers = brokerList;

    await user.save();

    return res.status(200).json({ message: "broker updated" });


};

exports.setDefaultBroker = async (req, res, next) => {

    var brokerId = req.body.brokerId;
    var userId = new mongoose.Types.ObjectId(req.body.userId);
    const user = await User.findById(userId);
    if (!user) {
        return res.status(404).json({ message: "user not found" });
    }

    user.defaultBrokerId = brokerId;
    await user.save();
    return res.status(200).json({ message: "default broker updated" });

};
exports.deleteBroker = async (req, res, next) => {

    var brokerId = req.body.brokerId;
    var userId = new mongoose.Types.ObjectId(req.body.userId);
    let user = await User.findById(userId);

    if (!user) {
        return res.status(404).json({ message: "user not found" });
    }

    user = await User.updateOne(
        { _id: userId },
        { $pull: { brokers: { _id: brokerId } } },
    )
    return res.status(200).json({ message: "broker deleted" });
};



//Trade................


exports.getAllUserTrade = async (req, res, next) => {
    try {

        const data = [
            { name: 'Alice', date: '2023-03-01T10:30:00.000Z' },
            { name: 'Bob', date: '2023-03-02T12:00:00.000Z' },
            { name: 'Charlie', date: '2023-03-03T15:30:00.000Z' },
            { name: 'Dave', date: '2023-03-04T09:00:00.000Z' },
            { name: 'Alice', date: '2023-03-05T10:30:00.000Z' },
            { name: 'Bob', date: '2023-03-06T12:00:00.000Z' },
            { name: 'Charlie', date: '2023-03-07T15:30:00.000Z' },
            { name: 'Dave', date: '2023-03-08T08:00:00.000Z' },
            { name: 'Bob', date: '2023-03-09T12:00:00.000Z' },
            { name: 'Charlie', date: '2023-03-10T15:30:00.000Z' }
        ];

        //   const startDate = new Date();
        //   startDate.setDate(startDate.getDate() - 5); // set the start date to 7 days ago

        //   const filteredData = data.filter(item => {
        //     const date = new Date(item.date);
        //     return date >= startDate;
        //   });

        //   console.log(startDate)

        // const startDate = new Date('2023-03-03T00:00:00.000Z'); // set the start date
        // const endDate = new Date('2023-03-08T23:59:59.999Z'); // set the end date

        // const filteredData = data.filter(item => {
        //     const date = new Date(item.date);
        //     return date >= startDate && date <= endDate; // check if the date is within the range
        // });

        const user = await User.findById(req.params.userId);
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }
        res.status(200).json({ length: user.trades.length, data: user.trades });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Internal server error" });
    }
};


exports.addTrade = async (req, res, next) => {
    try {
        const user = await User.findById(req.body.userId);
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }
        const trade = req.body.trade;
        if (!trade) {
            return res.status(400).json({ message: "Missing trade parameter" });
        }
        user.trades.push(trade);
        await user.save();
        res.status(200).json({ message: "Trade added successfully" });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Internal server error" });
    }
};

exports.updateTrade = async (req, res, next) => {

    var brokerId = req.body.tradeId;
    var userId = new mongoose.Types.ObjectId(req.body.userId);
    const user = await User.findById(userId);
    if (!user) {
        return res.status(404).json({ message: "user not found" });
    }
    const newBrokerObject = req.body.trade;

    let tradeList = user.trades;

    const tradeIndex = brokerList.findIndex(
        (t) => t._id == tradeId
    );

    tradeList[tradeIndex] = { _id: tradeId, ...newBrokerObject };

    user.trades = tradeList;

    await user.save();

    return res.status(200).json({ message: "trade updated" });


};

exports.deleteTrade = async (req, res, next) => {

    var tradeId = req.body.tradeId;
    var userId = new mongoose.Types.ObjectId(req.body.userId);
    let user = await User.findById(userId);

    if (!user) {
        return res.status(404).json({ message: "user not found" });
    }

    user = await User.updateOne(
        { _id: userId },
        { $pull: { trades: { _id: tradeId } } },
    )
    return res.status(200).json({ message: "trade deleted" });
};

