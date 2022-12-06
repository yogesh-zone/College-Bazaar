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
      const message = await Message.find({ chat: chatId })
        .populate("sender", "_id")
        .select("sender content");

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
      message = await message.populate("sender", "_id");
      // message = await message.populate("chat");

      // jo chat m users h [ {} {} ] sirf unki id hogi
      // message = await User.populate(message, {
      //   path: "chat.users",
      //   select: "name avatar.url email",
      // });
      // so this find populate their name avatar and email with respect to their Ids

      await Chat.findByIdAndUpdate(chatId, { latestMessage: message });
      return res.json({ msg: message });
    } catch (error) {
      return res.status(500).json({ msg: error.message });
      // it returns but we need to change it.
      //   "msg": {
      //     "content": "hello this is first message from yogeshbalodi to yogilol",
      //     "sender": {
      //         "avatar": {
      //             "url": "https://res.cloudinary.com/dbej3vdgp/image/upload/v1664800251/College%20Bazaar/userIcon_l7k486.png"
      //         },
      //         "_id": "6374afdcd6efda65a9f96b50",
      //         "name": "Yogesh Balodi"
      //     },
      //     "chat": {
      //         "_id": "637852b56e18e69e51e5124e",
      //         "users": [
      //             {
      //                 "avatar": {
      //                     "url": "https://res.cloudinary.com/dbej3vdgp/image/upload/v1664800251/College%20Bazaar/userIcon_l7k486.png"
      //                 },
      //                 "_id": "6374afdcd6efda65a9f96b50",
      //                 "name": "Yogesh Balodi",
      //                 "email": "yogeshbalodi1001@gmail.com"
      //             },
      //             {
      //                 "avatar": {
      //                     "url": "https://res.cloudinary.com/dbej3vdgp/image/upload/v1664865268/College%20Bazaar/zgixwuwuqrsahrj2ejgt.jpg"
      //                 },
      //                 "_id": "633bc974860d4751ee89e94c",
      //                 "name": "yogesh Admin",
      //                 "email": "yogilol17@gmail.com"
      //             }
      //         ],
      //         "createdAt": "2022-11-19T03:51:17.304Z",
      //         "updatedAt": "2022-11-19T03:51:17.304Z",
      //         "__v": 0
      //     },
      //     "read": false,
      //     "_id": "63785633dc1beae4858211a5",
      //     "createdAt": "2022-11-19T04:06:11.665Z",
      //     "updatedAt": "2022-11-19T04:06:11.665Z",
      //     "__v": 0
      // }
    }
  },
};

module.exports = messageCtrl;
