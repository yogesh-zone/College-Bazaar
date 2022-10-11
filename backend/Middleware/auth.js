const jwt = require("jsonwebtoken");

const auth = (req, res, next) => {
  try {
    const { jwtToken } = req.cookies;

    if (!jwtToken) {
      return res.status(400).json({ msg: "Invalid Authentication." });
    }

    const user = jwt.verify(jwtToken, process.env.JWT_ACCESS_TOKEN_SECRET);
    req.user = user;
    next();
  } catch (error) {
    return res.status(500).json({ msg: error.message });
  }
};

module.exports = auth;
