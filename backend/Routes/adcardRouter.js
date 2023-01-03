const express = require("express");
const adCtrl = require("../Controllers/adcardCtrl");
const auth = require("../Middleware/auth");
const authAdmin = require("../Middleware/authAdmin");
const upload = require("../Middleware/uploadImage");
const router = express.Router();

router.post("/new", auth, adCtrl.newAd);
// router.post("/new", auth, upload, adCtrl.newAd);

router.delete("/delete/:_id", auth, adCtrl.deleteAd);

router.delete("/admin/delete/:_id", auth, authAdmin, adCtrl.adminDeleteAd);
router.post("/admin/all", auth, authAdmin, adCtrl.adminAllAds);
router.get(
  "/admin/underVerification",
  auth,
  authAdmin,
  adCtrl.adminVerificationAds
);
router.put("/admin/approve/:_id", adCtrl.adminApproveAds);

router.get("/all", adCtrl.allAds);

router.get("/userAds", auth, adCtrl.userAllAds); //new added

router.get("/:_id", adCtrl.aAd);

module.exports = router;
