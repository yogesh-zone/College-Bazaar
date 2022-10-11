const express = require("express");
const chatCtrl = require("../Controllers/chatCtrl");
const router = express.Router();
const auth = require("../Middleware/auth");

router.post("/", auth, chatCtrl.accessChat);
router.get("/", auth, chatCtrl.fetchChats);

module.exports = router;
