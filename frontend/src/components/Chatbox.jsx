import { ArrowBackIcon } from "@chakra-ui/icons";
import { Avatar, Box, IconButton, Text } from "@chakra-ui/react";
import { getSender, getSenderFull } from "./Miscellaneous/ChatLogic";
import ProfileModal from "./Miscellaneous/ProfileModel";
import SafetyModel from "./Miscellaneous/SafetyModel";
import SingleChat from "./SingleChat";
import { useSelector, useDispatch } from "react-redux";
import { selecetedChat } from "../actions/chatAction";
const Chatbox = () => {
    const { user } = useSelector(
        (state) => state.user
    );
    const { selectedChat } = useSelector((state) => state.chat);
    const dispatch = useDispatch();
    console.log("under chatbx ", selectedChat)
    return (
        <Box
            d={{ base: selectedChat ? "flex" : "none", md: "flex" }}
            height={{ base: selectedChat ? "100vh" : "82vh", md: "82vh" }}
            alignItems="center"
            flexDir="column"
            w={{ base: "100%", md: "68%" }}
            // borderRadius="lg"
            // borderWidth="1px"
            overflow={"hidden"}
        >
            {selectedChat &&
                <div className="fixed w-full">
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
                    </Box></div>}
            <SingleChat />
            {/* fetchAgain={fetchAgain} setFetchAgain={setFetchAgain} */}
        </Box>
    );
};

export default Chatbox;
