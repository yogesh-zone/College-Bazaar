const cloudinary = require("../Utils/cloudinary");

const uploadCtrl = {
  uploadAvatar: async (req, res) => {
    try {
      const result = await cloudinary.uploader.upload(req.file.path);

      console.log(result);
      res.json({ msg: "testing.." });
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },
};
