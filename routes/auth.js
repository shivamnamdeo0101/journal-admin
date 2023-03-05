const express = require("express");
const { googleAuth } = require("../controllers/auth");
const router = express.Router();

router.route("/google-auth").post(googleAuth);

module.exports = router;
