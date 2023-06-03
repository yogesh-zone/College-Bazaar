const Chat = require("../DBmodels/chatModel"); // just create a room for both user and if room already exist then it returns latest message
const User = require("../DBmodels/userModel");

const chatCtrl = {
  // on click to chat with a person and it returns the chats of both user if exist

  // it just return chat with one user
  // what we can do is if chat room does not exist then it creates and it exist it returns
  // update late -> return only the chat id and the sender means opposite user
  accessChat: async (req, res) => {
    try {
      const { senderId } = req.params;

      if (!senderId) {
        return res
          .status(400)
          .json({ msg: "SenderId params not sent with request" });
      }

      let isChat = await Chat.find({
        $and: [
          { users: { $elemMatch: { $eq: req.user.id } } },
          { users: { $elemMatch: { $eq: senderId } } },
        ],
      }).populate("users", "name avatar.url email phone");
      // .populate("latestMessage", "content sender read updatedAt");

      // console.log(isChat && isChat[0].users);

      // isChat = await User.populate(isChat, {
      //   path: "latestMessage.sender",
      //   select: "name",
      // });

      // console.log("\n\n\n", isChat, isChat[0].users);

      console.log("printing...", isChat);
      if (isChat.length > 0) {
        return res.json({ msg: "fetch cht success", chat: isChat[0] });
      }

      // if they didn't had a chat before then create a chat room for both the user
      var chatData = {
        users: [req.user.id, senderId],
      };

      const createChat = await Chat.create(chatData);
      const fullChat = await Chat.findOne({ _id: createChat._id }).populate(
        "users",
        "name email avatar phone"
      );
      return res.json({
        msg: "Chat has been created!",
        chat: fullChat,
      });
      // it is returning
      //   "msg": "Chat has been created!",
      // "chat": {
      //     "_id": "637850850bcea339f1b75936",
      //     "users": [
      //         {
      //             "avatar": {
      //                 "url": "https://res.cloudinary.com/dbej3vdgp/image/upload/v1664800251/College%20Bazaar/userIcon_l7k486.png"
      //             },
      //             "phone": {
      //                 "phone": "8368616227",
      //                 "showPhone": false
      //             },
      //             "_id": "6374afdcd6efda65a9f96b50",
      //             "name": "Yogesh Balodi",
      //             "email": "yogeshbalodi1001@gmail.com"
      //         },
      //         {
      //             "avatar": {
      //                 "url": "https://res.cloudinary.com/dbej3vdgp/image/upload/v1664800251/College%20Bazaar/userIcon_l7k486.png"
      //             },
      //             "phone": "886-086-5632",
      //             "_id": "633d1b8f39b233bd7a76cfc1",
      //             "name": "Sonu Balodi",
      //             "email": "sonubalodi1@gmail.com"
      //         }
      //     ],
      //     "createdAt": "2022-11-19T03:41:57.379Z",
      //     "updatedAt": "2022-11-19T03:41:57.379Z",
      //     "__v": 0
      // }
    } catch (error) {
      return res.status(500).json({ msg: error.message });
    }
  },

  // fetch all the chats of user with diff persons (Left side)
  fetchChats: async (req, res) => {
    try {
      let chats = await Chat.find({
        users: { $elemMatch: { $eq: req.user.id } },
      })
        .populate("users", "name email avatar phone")
        .populate("latestMessage", "content sender read updatedAt")
        .sort({ updatedAt: -1 });
      chats = await User.populate(chats, {
        path: "latestMessage.sender",
        select: "name",
      });
      return res.json({ chats });
    } catch (error) {
      return res.status(500).json({ msg: error.message });
    }
  },
};

module.exports = chatCtrl;
