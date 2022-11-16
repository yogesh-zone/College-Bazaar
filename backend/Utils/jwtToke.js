const jwt = require("jsonwebtoken");

const sendToken = (user, statusCode, res, message) => {
  const token = createAccessToken({ id: user._id });

  const options = {
    expires: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
    httpOnly: true,
  };
  res
    .status(statusCode)
    .cookie("jwtToken", token, options)
    .json({ message, user });
};

const createAccessToken = (payload) => {
  return jwt.sign(payload, process.env.JWT_ACCESS_TOKEN_SECRET, {
    expiresIn: process.env.JWT_EXPIRE_IN,
  });
};

module.exports = sendToken;
