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

router.get("/", auth, userCtrl.loadUser);

router.get("/information/:id", auth, adminAuth, userCtrl.getUserInfor);

router.post("/all_information", auth, adminAuth, userCtrl.getUsersAllInfor);

router.get("/logout", userCtrl.logout);

router.put("/forgotPassword", userCtrl.forgotPassword);

router.put("/updatePassword", auth, userCtrl.updatePassword);

router.put("/update_User", auth, userCtrl.updateUser);

router.put("/update_role/:id", auth, adminAuth, userCtrl.updateUserRole);

router.delete("/delete_user/:id", auth, adminAuth, userCtrl.deleteUser);

router.put("/upload_avatar", auth, userCtrl.uploadAvatar); // uploadImage
//api.cloudinary.com/v1_1/dbej3vdgp/image/upload

https: module.exports = router;
