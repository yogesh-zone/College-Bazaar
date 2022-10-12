const Ad = require("../DBmodels/adModel");
const cloudinary = require("cloudinary");
const ApiFetchure = require("../Utils/apiFetch");

const adCtrl = {
  newAd: async (req, res) => {
    try {
      const { name, description, Category, semester, city, state } = req.body;
      const address = {
        city,
        state,
      };
      const image = [];
      const files = req.files;
      for (let file in files) {
        file = files[file];
        const result = await cloudinary.v2.uploader.upload(file.tempFilePath, {
          folder: "College Bazaar",
        });
        const obj = { url: result.secure_url, public_id: result.public_id };
        image.push(obj);
      }
      const newAd = new Ad({
        name,
        description,
        image,
        Category,
        semester,
        user: req.user.id,
        address,
      });
      await newAd.save();
      res.json({ msg: "Ad has been created!" });
    } catch (error) {
      res.status(500).json({ msg: error });
    }
  },

  allAds: async (req, res) => {
    try {
      let ads = Ad.find().populate("user", "name avatar");
      const result = new ApiFetchure(ads, req.query).search().pagination(2);
      ads = await result.ads;
      return res.json({ msg: ads });
    } catch (error) {
      return res.status(500).json({ msg: error.message });
    }
  },
  // allAds: async (req, res) => {
  //   try {
  //     const ads = await Ad.find().populate("user", "name avatar");
  //     res.json({ ads });
  //   } catch (err) {
  //     return res.status(500).json({ msg: err.message });
  //   }
  // },

  aAd: async (req, res) => {
    try {
      const { _id } = req.params;
      const ad = await Ad.find({ _id }).populate("user", "name avatar");
      if (!ad) {
        return res.status(400).json({ msg: "Invalid item!" });
      }
      res.json({ ad });
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },

  adminDeleteAd: async (req, res) => {
    try {
      const { _id } = req.params;
      const item = await Ad.findOne({ _id });
      if (!item) {
        return res.status(400).json({ msg: "Invalid item!" });
      }
      await item.remove();
      res.json({ msg: "Delete success!" });
    } catch (error) {
      return res.status(500).json({ msg: error.message });
    }
  },

  deleteAd: async (req, res) => {
    try {
      const { _id } = req.params;
      const item = await Ad.findOne({ _id });
      if (!item) {
        return res.status(400).json({ msg: "Invalid item!" });
      }
      if (item.user != req.user.id) {
        return res
          .status(400)
          .json({ msg: "You are not authorized to delete this product!" });
      }
      await item.remove();
      res.json({ msg: "Delete success!" });
    } catch (error) {
      return res.status(500).json({ msg: error.message });
    }
  },
};

module.exports = adCtrl;
