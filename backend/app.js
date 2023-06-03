const express = require("express");
const app = express();
const cors = require("cors");
const path = require("path");
const cookieParser = require("cookie-parser");
const fileUpload = require("express-fileupload");
const error = require("./Middleware/error");
const ErrorHandler = require("./Utils/errorHandler");
app.use(express.json());
app.use(cors());
app.use(cookieParser());
app.use(
  fileUpload({
    useTempFiles: true,
  })
);

// select config.env if app is in dev mode
if (process.env.NODE_ENV !== "PRODUCTION") {
  require("dotenv").config({ path: "./backend/Config/config.env" });
} else {
  // if app on production use build index file as root
  app.use(express.static("../frontend/build"));
  app.get("*", (req, res) => {
    res.sendFile(
      path.join(__dirname, "../", "frontend", "build", "index.html")
    );
  });
}

//all routes here
//for user
app.use("/api/user", require("./Routes/userRouter"));
// for ads
app.use("/api/adCard", require("./Routes/adcardRouter"));
// for chats
app.use("/api/chat", require("./Routes/chatRouter"));
// for messages
app.use("/api/message", require("./Routes/messageRouter"));

app.get("/cpi", (req, res, next) => {
  return next(new ErrorHandler("hey we did it", 400));
  // res.status(404);
  // res.json({ succes: false, msg: "hello frontend" });
});

app.use(error);

module.exports = app;
