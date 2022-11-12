const express = require("express");
const messageCtrl = require("../Controllers/messageCtrl");
const auth = require("../Middleware/auth");
const router = express.Router();

router.get("/all/:chatId", auth, messageCtrl.allMessages);
router.post("/new", auth, messageCtrl.sendMessage);

module.exports = router;
