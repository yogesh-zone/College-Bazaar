const app = require("./app");
const dotenv = require("dotenv");
const connectDB = require("./Config/database");
// var mail = require("./Config/sendMailDummy")();
// if app on development then use config we defined here
if (process.env.NODE_ENV !== "PRODUCTION") {
  dotenv.config({ path: "./backend/Config/config.env" });
}

//database connection
connectDB();

const port = process.env.PORT || 4000;
const server = app.listen(port, () => {
  console.log(`server is working on http:\\localhost:${port}`);
});

const io = require("socket.io")(server, {
  pingTimeout: 60000,
  cors: {
    origin: "http://localhost:3000",
    // credentials: true,
  },
});

io.on("connection", (socket) => {
  console.log("Connected to socket.io");
  socket.on("setup", (userData) => {
    socket.join(userData._id);
    socket.emit("connected");
  });

  socket.on("join chat", (room) => {
    socket.join(room);
    console.log("User Joined Room: " + room);
  });

  socket.on("new message", (newMessageRecieved) => {
    var chat = newMessageRecieved.chat;

    if (!chat.users) return console.log("chat.users not defined");

    chat.users.forEach((user) => {
      if (user._id == newMessageRecieved.sender._id) return;

      socket.in(user._id).emit("message recieved", newMessageRecieved);
    });
  });

  socket.on("typing", (room) => socket.in(room).emit("typing"));
  socket.on("stop typing", (room) => socket.in(room).emit("stop typing"));

  socket.off("setup", () => {
    console.log("USER DISCONNECTED");
    socket.leave(userData._id);
  });
});

// mail.send();
