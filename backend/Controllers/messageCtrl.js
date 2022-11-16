const Message = require("../DBmodels/messageModel");
const User = require("../DBmodels/messageModel");
const Chat = require("../DBmodels/chatModel");

const messageCtrl = {
  // all messages for two users who are chating
  allMessages: async (req, res) => {
    try {
      const { chatId } = req.params;
      if (!chatId) {
        return res.status(400).json({ msg: "chatId not sent with params" });
      }
      const message = await Message.find({ chat: chatId }).populate(
        "sender",
        "name email avatar.url"
      );

      res.json({ msg: message });
    } catch (error) {
      return res.status(500).json({ msg: error.message });
    }
  },

  //send msg b/w two users
  sendMessage: async (req, res) => {
    try {
      const { content, chatId } = req.body;

      if (!content || !chatId) {
        return res
          .status(400)
          .json({ msg: "Invalid data passed into request" });
      }

      let newMessage = {
        sender: req.user.id,
        content: content,
        chat: chatId,
      };

      let message = await Message.create(newMessage);
      message = await message.populate("sender", "name avatar.url");
      message = await message.populate("chat");

      // jo chat m users h [ {} {} ] sirf unki id hogi
      message = await User.populate(message, {
        path: "chat.users",
        select: "name avatar.url email",
      }); // so this find populate their name avatar and email with respect to their Ids

      await Chat.findByIdAndUpdate(chatId, { latestMessage: message });
      return res.json({ msg: message });
    } catch (error) {
      return res.status(500).json({ msg: error.message });
    }
  },
};

module.exports = messageCtrl;
