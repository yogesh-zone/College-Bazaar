const express = require("express");
const app = express();
const cors = require("cors");
const path = require("path");
const cookieParser = require("cookie-parser");
const fileUpload = require("express-fileupload");

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
app.use("/user", require("./Routes/userRouter"));
// for ads
app.use("/adCard", require("./Routes/adcardRouter"));
// for chats
app.use("/api/chat", require("./Routes/chatRouter"));
// for messages
app.use("/api/message", require("./Routes/messageRouter"));

app.get("/", (req, res, next) => {
  res.send("hello this is the landing page");
});

app.get("/home", (req, res, next) => {
  res.send("hello this is the home page");
});

module.exports = app;
