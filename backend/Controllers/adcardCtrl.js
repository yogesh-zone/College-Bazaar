// const Ad = require("../DBmodels/adModel");
// const cloudinary = require("cloudinary");
// const ApiFetchure = require("../Utils/apiFetch");
// const ErrorHandler = require("../Middleware/error");
// const adCtrl = {
//   newAd: async (req, res) => {
//     try {
//       const { name, description, Category, semester, city, state } = req.body;
//       const address = {
//         city,
//         state,
//       };
//       const image = [];
//       const files = req.files;
//       for (let file in files) {
//         file = files[file];
//         const result = await cloudinary.v2.uploader.upload(file.tempFilePath, {
//           folder: "College Bazaar",
//         });
//         const obj = { url: result.secure_url, public_id: result.public_id };
//         image.push(obj);
//       }
//       const newAd = new Ad({
//         name,
//         description,
//         image,
//         Category,
//         semester,
//         user: req.user.id,
//         address,
//       });
//       await newAd.save();

//       res.status(201).json({ message: "Ad has been created!" });
//     } catch (error) {
//       return next(new ErrorHandler(error.message, 500));
//     }
//   },

//   allAds: async (req, res, next) => {
//     try {
//       let ads = Ad.find().populate("user", "name avatar");
//       const result = new ApiFetchure(ads, req.query).search().pagination(2);
//       ads = await result.ads;
//       return res.status(200).json({ ads });
//     } catch (error) {
//       return next(new ErrorHandler(error.message, 500));
//     }
//   },
//   // allAds: async (req, res) => {
//   //   try {
//   //     const ads = await Ad.find().populate("user", "name avatar");
//   //     res.json({ ads });
//   //   } catch (err) {
//   //     return res.status(500).json({ msg: err.message });
//   //   }
//   // },

//   aAd: async (req, res, next) => {
//     try {
//       const { _id } = req.params;
//       const ad = await Ad.find({ _id }).populate("user", "name avatar");
//       if (!ad) {
//         return next(new ErrorHandler("Invalid Item!"), 400);
//       }
//       res.json({ ad });
//     } catch (error) {
//       return next(new ErrorHandler(error.message, 500));
//     }
//   },

//   adminDeleteAd: async (req, res) => {
//     try {
//       const { _id } = req.params;
//       const item = await Ad.findOne({ _id });
//       if (!item) {
//         return next(new ErrorHandler("Invalid Item!"), 400);
//       }
//       await item.remove();
//       res.status(201).json({ message: "Delete success!" });
//     } catch (error) {
//       return next(new ErrorHandler(error.message, 500));
//     }
//   },

//   deleteAd: async (req, res, next) => {
//     try {
//       const { _id } = req.params;
//       const item = await Ad.findOne({ _id });
//       if (!item) {
//         return next(new ErrorHandler("Invalid Item!"), 400);
//       }
//       if (item.user != req.user.id) {
//         return next(
//           new ErrorHandler(
//             "You are not authorized to delete this product!",
//             400
//           )
//         );
//       }
//       await item.remove();
//       res.status(201).json({ message: "Delete success!" });
//     } catch (error) {
//       return next(new ErrorHandler(error.message, 500));
//     }
//   },
// };

// module.exports = adCtrl;

const Ad = require("../DBmodels/adModel");
const ApiFetchure = require("../Utils/apiFetch");
const ErrorHandler = require("../Utils/errorHandler");
const cloudinary = require("../Utils/cloudinary");
const adCtrl = {
  newAd: async (req, res) => {
    try {
      console.log(req.body);

      const {
        name,
        description,
        Category,
        course,
        semester,
        price,
        state,
        city,
        images,
      } = req.body;
      const address = {
        city,
        state,
      };
      const newAd = new Ad({
        name,
        description,
        Category,
        course,
        semester,
        price,
        images,
        user: req.user.id,
        address,
      });
      await newAd.save();
      console.log(newAd);
      res.status(201).json({ message: "Ad has been created!" });
    } catch (error) {
      return next(new ErrorHandler(error.message, 500));
    }
  },

  allAds: async (req, res, next) => {
    try {
      let ads = Ad.find().sort({ createdAt: -1 });
      // .populate("user", "name avatar")
      const result = new ApiFetchure(ads, req.query).search().pagination(8);
      ads = await result.ads.find({ verified: true });
      if (ads.length === 0) {
        return next(new ErrorHandler("No ads found"));
      }
      return res.status(200).json({ ads });
    } catch (error) {
      return next(new ErrorHandler(error.message, 500));
    }
  },

  adminAllAds: async (req, res, next) => {
    try {
      const { name } = req.body;
      const ads = await Ad.find({
        ...{ name: { $regex: name, $options: "i" }, verified: true },
      })
        .populate("user", "name")
        .sort({ createdAt: -1 });
      if (ads.length === 0) {
        return next(new ErrorHandler("No ad found"));
      }
      return res.status(200).json({ ads });
    } catch (error) {
      return next(new ErrorHandler(error.message, 500));
    }
  },
  adminVerificationAds: async (req, res, next) => {
    try {
      const ads = await Ad.find({
        verified: false,
      })
        .populate("user", "name")
        .sort({ createdAt: -1 });
      if (ads.length === 0) {
        return next(new ErrorHandler("No ad found"));
      }
      return res.status(200).json({ ads });
    } catch (error) {
      return next(new ErrorHandler(error.message, 500));
    }
  },

  adminApproveAds: async (req, res, next) => {
    try {
      const { _id } = req.params;
      const ad = await Ad.findById(_id);
      if (!ad) {
        return next(new ErrorHandler("Invalid Ad"));
      }
      ad.verified = true;
      ad.save();
      return res.status(200).json({ success: true });
    } catch (error) {
      return next(new ErrorHandler(error.message, 500));
    }
  },

  userAllAds: async (req, res, next) => {
    try {
      // const ads = await Ad.find({ user: { $elemMatch: { $eq: req.user.id } } });
      const ads = await Ad.find({ user: req.user.id });
      if (ads.length === 0) {
        return next(new ErrorHandler("No ads found"));
      }
      return res.status(200).json({ ads });
    } catch (error) {
      next(new ErrorHandler(error.message), 500);
    }
  },

  aAd: async (req, res, next) => {
    try {
      const { _id } = req.params;
      const ad = await Ad.find({ _id }).populate(
        "user",
        "name avatar email phone"
      );
      if (ad.length === 0) {
        return next(new ErrorHandler("Invalid Item!"), 400);
      }
      return res.status(200).json({ ad: ad[0] });
    } catch (error) {
      return next(new ErrorHandler(error.message, 500));
    }
  },

  adminDeleteAd: async (req, res) => {
    try {
      const { _id } = req.params;
      const item = await Ad.findOne({ _id });
      if (!item) {
        return next(new ErrorHandler("Invalid Item!"), 400);
      }
      for (i in item.images) {
        const imgId = item.images[i].public_id;
        await cloudinary.v2.uploader.destroy(imgId);
      }
      await item.remove();
      res.status(201).json({ message: "Delete success!" });
    } catch (error) {
      return next(new ErrorHandler(error.message, 500));
    }
  },

  deleteAd: async (req, res, next) => {
    try {
      const { _id } = req.params;
      const item = await Ad.findOne({ _id });
      if (!item) {
        return next(new ErrorHandler("Invalid Item!"), 400);
      }
      if (item.user != req.user.id) {
        return next(
          new ErrorHandler(
            "You are not authorized to delete this product!",
            400
          )
        );
      }
      for (i in item.images) {
        const imgId = item.images[i].public_id;
        await cloudinary.v2.uploader.destroy(imgId);
      }
      await item.remove();
      res.status(201).json({ message: "Delete success!" });
    } catch (error) {
      return next(new ErrorHandler(error.message, 500));
    }
  },
};

module.exports = adCtrl;
