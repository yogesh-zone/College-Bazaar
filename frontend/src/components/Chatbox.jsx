import { ArrowBackIcon } from "@chakra-ui/icons";
import { Avatar, Box, IconButton, Text } from "@chakra-ui/react";
import { getSender, getSenderFull } from "./Miscellaneous/ChatLogic";
import ProfileModal from "./Miscellaneous/ProfileModel";
import SafetyModel from "./Miscellaneous/SafetyModel";
import SingleChat from "./SingleChat";
import { useSelector, useDispatch } from "react-redux";
import { selecetedChat } from "../actions/chatAction";
const Chatbox = () => {
    // const { selectedChat } = ChatState();
    // const selectedChat = { users: [{ _id: 123, name: "Yogesh  Balodi", email: "yogeshbalodi1001@gmail.com", phone: { isPhone: false, phone: 8368616227 }, avatar: "#" }, { _id: 456, name: "Purnima  Balodi", email: "Purnimabalodi1001@gmail.com", phone: { isPhone: false, phone: 8860865732 }, avatar: "#" }], latestMessage: { sender: { name: "Yogesh Balodi" }, content: "hello yogesh how are you i am fine" }, _id: 8 };
    const { user } = useSelector(
        (state) => state.user
    );
    const { selectedChat } = useSelector((state) => state.chat);
    const dispatch = useDispatch();
    console.log("under chatbx ", selectedChat)
    return (
        <Box
            d={{ base: selectedChat ? "flex" : "none", md: "flex" }}
            alignItems="center"
            flexDir="column"
            bg="white"
            w={{ base: "100%", md: "68%" }}
            borderRadius="lg"
            borderWidth="1px"
            overflow={"hidden"}
            background="gray.900"
        >
            {selectedChat &&
                <Box display="flex" p={3} justifyContent="between" background="gray.700" justifyItems="center" gap={3} alignItems="center">
                    <IconButton
                        display={{ base: "flex", md: "none" }}
                        background="transparent"
                        color="white"
                        _hover={{ background: "transparent", color: "white" }}
                        icon={<ArrowBackIcon fontSize={'2xl'} />}
                        onClick={() => dispatch(selecetedChat(null))}
                    />
                    <ProfileModal
                        user={getSenderFull(user, selectedChat.users)}
                    />
                    <Text color="white" fontSize={'xl'}>{getSender(user, selectedChat.users)}</Text>
                    <div className="w-auto text-2xl cursor-pointer text-white ml-auto"><SafetyModel flag={false} /></div>
                </Box>}
            <SingleChat />
            {/* fetchAgain={fetchAgain} setFetchAgain={setFetchAgain} */}
        </Box>
    );
};

export default Chatbox;
