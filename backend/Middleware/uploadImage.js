const fs = require("fs");

const removeTmp = (path) => {
  fs.unlink(path, (err) => {
    if (err) throw err;
  });
};

module.exports = async function (req, res, next) {
  try {
    console.log(req.body);
    return res.json({ msg: "api success" });
    if (!req.files || Object.keys(req.files).length === 0)
      return res.status(400).json({ msg: "No files were uploaded." });

    const files = req.files;
    for (let file in files) {
      file = files[file];
      if (file.size > 1024 * 1024 * 2.5) {
        removeTmp(file.tempFilePath);
        return res.status(400).json({ msg: "Size too large." });
      } // 2.5mb

      if (file.mimetype !== "image/jpeg" && file.mimetype !== "image/png") {
        removeTmp(file.tempFilePath);
        return res.status(400).json({ msg: "File format is incorrect." });
      }
    }
    next();
  } catch (err) {
    return res.status(500).json({ msg: err.message });
  }
};
