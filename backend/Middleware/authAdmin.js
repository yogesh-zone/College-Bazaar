const User = require("../DBmodels/userModel");

const adminAuth = async (req, res, next) => {
  try {
    const user = await User.findById(req.user.id).select("+role");

    if (!user.role) {
      return res.status(200).json({ msg: "Admin resources access denied." });
    }
    next();
  } catch (err) {
    return res.status(500).json({ msg: err.message });
  }
};

module.exports = adminAuth;
