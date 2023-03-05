const express = require("express");
const { userProfile } = require("../controllers/user");
const { protect } = require("../middleware/auth");
const router = express.Router();


router.route("/profile/:userId").get(protect,userProfile);

module.exports = router;
