const express = require("express");
const userCtrl = require("../Controllers/userCtrl");
const router = express.Router();
const auth = require("../Middleware/auth");
const adminAuth = require("../Middleware/authAdmin");
const uploadImage = require("../Middleware/uploadImage");

router.post("/register", userCtrl.register);

router.post("/activation/:activation_token", userCtrl.activateEmail);

router.post("/login", userCtrl.login);

// router
// .post('/refresh_token', userCtrl.getAccessToken);

router.post("/forgot", userCtrl.forgotPassword);

router.post("/reset/:reset_token", auth, userCtrl.resetPassword);

router.get("/my_information", auth, userCtrl.getMyInfor);

router.get("/information/:id", auth, adminAuth, userCtrl.getUserInfor);

router.get("/all_information", auth, adminAuth, userCtrl.getUsersAllInfor);

router.get("/logout", userCtrl.logout);

router.put("/forgotPassword", userCtrl.forgotPassword);

router.put("/updatePassword", auth, userCtrl.updatePassword);

router.patch("/update_User", auth, userCtrl.updateUser);

router.patch("/update_role/:id", auth, adminAuth, userCtrl.updateUserRole);

router.delete("/delete_user/:id", auth, adminAuth, userCtrl.deleteUser);

router.put("/upload_avatar", uploadImage, auth, userCtrl.uploadAvatar);

module.exports = router;
