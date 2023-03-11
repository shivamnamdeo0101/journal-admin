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
        let list;
        const filterType = req.body.filterType
        const user = await User.findById(req.body.userId);
        const tempDate = new Date();

        if (filterType === "a") {
            return res.status(200).json({ length: user.trades.length, data: user.trades });
        }
        if (filterType === "t") {
            const today = new Date().toISOString().substr(0, 10); // get the current date in UTC format
            list = user.trades.filter(item => {
                const itemDate = new Date(item.date).toISOString().substr(0, 10); // convert the trade date to UTC format
                return itemDate === today; // include trades that occurred on the current date
            }) .sort((a, b) => {
                const dateA = new Date(a.date);
                const dateB = new Date(b.date);
                return dateB - dateA;
              });;
        }

        if (filterType === "r") {

            const startDate = new Date(req.body.startDate);
            const endDate = new Date(req.body.endDate);

            list =  user.trades.filter(item => {
                const date = new Date(item.date);
                return date >= startDate && date <= endDate;
            }) .sort((a, b) => {
                const dateA = new Date(a.date);
                const dateB = new Date(b.date);
                return dateB - dateA;
              });;
            return res.status(200).json({ length: list.length, data: list });
        }
        if (filterType === "d") {

            const filterDate = new Date(req.body.date);
            list = user.trades.filter(item => {
                const date = new Date(item.date);
                return date.toDateString() === filterDate.toDateString();
            }) .sort((a, b) => {
                const dateA = new Date(a.date);
                const dateB = new Date(b.date);
                return dateB - dateA;
              });;
            return res.status(200).json({ length: list.length, data: list });
        }


        if (filterType === "y") {
            tempDate.setDate(tempDate.getDate() - 1); // set the start date to 1 days ago   
        }
        if (filterType === "7D") {
            tempDate.setDate(tempDate.getDate() - 7); // set the start date to 7 days ago  
        }
        if (filterType === "1M") {
            tempDate.setUTCMonth(tempDate.getUTCMonth() - 1); // set the start date to one month ago    
        }
        if (filterType === "3M") {
            tempDate.setUTCMonth(tempDate.getUTCMonth() - 3); // set the start date to 3 month ago  
        }
        if (filterType === "6M") {
            tempDate.setUTCMonth(tempDate.getUTCMonth() - 6); // set the start date to 6 month ago   
        }
        if (filterType === "1Y") {
            tempDate.setUTCFullYear(tempDate.getUTCFullYear() - 1); // set the start date to one year ago    
        }
        list = user.trades.filter(item => {
            const date = new Date(item.date);
            return date >= tempDate;
        }).sort((a, b) => {
            const dateA = new Date(a.date);
            const dateB = new Date(b.date);
            return dateB - dateA;
          });;
        return res.status(200).json({ length: list.length, data: list });

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

    var tradeId = req.body.tradeId;
    var userId = new mongoose.Types.ObjectId(req.body.userId);
    const user = await User.findById(userId);
    if (!user) {
        return res.status(404).json({ message: "user not found" });
    }
    const newBrokerObject = req.body.trade;

    let tradeList = user.trades;

    const tradeIndex = tradeList.findIndex(
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

