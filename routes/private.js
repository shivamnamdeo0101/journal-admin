const express = require("express");
const { userProfile, addBroker, updateBroker, setDefaultBroker, deleteBroker, addTrade, updateTrade, deleteTrade, getAllUserTrade, getAllUserBroker } = require("../controllers/user");
const { protect } = require("../middleware/auth");
const router = express.Router();



//Profile
router.route("/profile/:userId").get(protect,userProfile);


//Broker
router.route("/brokers").post(protect,addBroker);
router.route("/brokers").put(protect,updateBroker);
router.route("/brokers").delete(protect,deleteBroker);
router.route("/brokers/:userId").get(protect,getAllUserBroker);
router.route("/default-broker").post(protect,setDefaultBroker);

//Trade
router.route("/trades").post(protect,addTrade);
router.route("/trades").put(protect,updateTrade);
router.route("/trades").delete(protect,deleteTrade);
router.route("/trades/:userId").get(protect,getAllUserTrade);



module.exports = router;
