const Chat = require("../DBmodels/chatModel");
const User = require("../DBmodels/userModel");

const chatCtrl = {
  // on click to chat with a person and it returns the chats of both user if exist
  accessChat: async (req, res) => {
    try {
      const { senderId } = req.body;

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
      })
        .populate("users", "name avatar email")
        .populate("latestMessage");

      console.log(isChat, isChat[0].users);
      isChat = await User.populate(isChat, {
        path: "latestMessage.sender",
        select: "name avatar email",
      });
      console.log("\n\n\n", isChat, isChat[0].users);
      if (isChat.length > 0) {
        return res.json({ msg: "fetch cht success", chat: isChat[0] });
      }

      // if they didn't had a chat before then create a chat for both the user
      var chatData = {
        users: [req.user.id, senderId],
      };

      const createChat = await Chat.create(chatData);
      const fullChat = await Chat.findOne({ _id: createChat._id }).populate(
        "users",
        "name email avatar"
      );
      return res.json({
        msg: "Chat has been created!",
        chat: fullChat,
      });
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
        .populate("users", "name email avatar")
        .populate("latestMessage")
        .sort({ updatedAt: -1 });
      chats = await User.populate(chats, {
        path: "latestMessage.sender",
        select: "name email avatar",
      });

      return res.json({ chats });
    } catch (error) {
      return res.status(500).json({ msg: error.message });
    }
  },
};

module.exports = chatCtrl;
