import { AddIcon } from "@chakra-ui/icons";
import { Box, Stack, Text } from "@chakra-ui/layout";
import { Avatar } from "@chakra-ui/react";
import { useToast } from "@chakra-ui/toast";
import axios from "axios";
import { useEffect, useState } from "react";
import { getSender, getSenderImg } from "./Miscellaneous/ChatLogic";
import { useSelector, useDispatch } from "react-redux"
import { allChats, selecetedChat } from "../actions/chatAction";
// import { getSender } from "../config/ChatLogics";
// import ChatLoading from "./ChatLoading";
// import GroupChatModal from "./miscellaneous/GroupChatModal";
// import { background, Button } from "@chakra-ui/react";
// import { ChatState } from "../Context/ChatProvider";

const MyChats = () => {

    // const [selectedChat, setSelectedChat] = useState([]);
    // const [chats, setChats] = useState([]);
    // const selectedChat = { latestMessage: { sender: { name: "Yogesh Balodi" }, content: "hello yogesh how are you i am fine" }, _id: 8 };
    const toast = useToast();
    const { user } = useSelector(
        (state) => state.user
    );
    const dispatch = useDispatch();
    const { selectedChat } = useSelector((state) => state.chat);
    const { chats, error } = useSelector((state) => state.chats);
    // fetch the latest msg from either of the user in room
    const fetchChats = async () => {
        // console.log(user._id);
        dispatch(allChats());
    };
    useEffect(() => {
        console.log("under effect")
        fetchChats();
    }, [])

    // useEffect(() => {
    //     console.log("under effect chatss")
    // }, [chats])


    console.log("my chats ", selectedChat);


    // const chats = [
    //     { sender: "Yogesh Balodi", latestMessage: { sender: { name: "Yogesh Balodi" }, content: "hello yogesh how are you i am fine" }, _id: 123 },
    //     { sender: "ABC Balodi", latestMessage: { sender: { name: "Yogesh Balodi" }, content: "hello yogesh how are you i am fine" }, _id: 4 },
    //     { sender: "DEF Balodi", latestMessage: { sender: { name: "Yogesh Balodi" }, content: "hello yogesh how are you i am fine" }, _id: 5 },
    //     { sender: "GFG Balodi", latestMessage: { sender: { name: "Yogesh Balodi" }, content: "hello yogesh how are you i am fine" }, _id: 6 },
    //     { sender: "Leet Code", _id: 6 },
    // ]
    return (
        <Box
            display={{ base: selectedChat ? "none" : "flex", md: "flex" }}
            flexDir="column"
            alignItems="center"
            // p={3}
            overflow={'hidden'}
            bg="white"
            w={{ base: "100%", md: "32%" }}
            borderRadius="lg"
            borderWidth="1px"
            background="gray.900"
        >
            <Box
                pb={3}
                px={3}
                fontSize={{ base: "28px", md: "30px" }}
                fontFamily="Work sans"
                display="flex"
                w="100%"
                justifyItems={'center'}
                // borderRadius={"lg"}
                background="gray.900"
                color="white"
            >
                <Text>My Chats</Text>
            </Box>
            {chats && <Box
                display="flex"
                flexDir="column"
                p={2}
                bg="#F8F8F8"
                w="100%"
                h="100%"
                overflowY="hidden"
                background={"gray.800"}
            >
                {chats.length != 0 ? (
                    <Stack overflowY="auto" gap={0} h={"100%"}>
                        {chats.map((chat) => (
                            <Box
                                onClick={() => dispatch(selecetedChat(chat))}
                                cursor="pointer"
                                display="flex"
                                borderRadius="lg"
                                justifyContent="between"
                                // alignItems={'center'}
                                bg={(selectedChat && selectedChat._id === chat._id) ? "gray.800" : "gray.700"}
                                color={(selectedChat && selectedChat._id === chat._id) ? "white" : "white"}
                                _hover={{ bg: "gray.800" }}
                                p={2}
                                key={chat._id}
                            >
                                <Avatar size="md" src={getSenderImg(user, chat.users)}></Avatar>
                                <Box px={2}>
                                    <Text className="capitalize font-semibold">
                                        {getSender(user, chat.users)}
                                    </Text>
                                    {chat.latestMessage && (
                                        <Text fontSize="xs">
                                            <span className="font-medium">{chat.latestMessage.sender.name}</span> :
                                            {chat.latestMessage.content.length > 25
                                                ? chat.latestMessage.content.substring(0, 25) + "..."
                                                : chat.latestMessage.content}
                                        </Text>
                                    )}
                                </Box>
                            </Box>
                        ))}
                    </Stack>
                ) : (<>
                    <div className="p-2 text-2xl font-semibold h-[100%] flex items-center justify-center text-center text-white">No chats found</div>
                </>
                )}
            </Box>}

        </Box >
    );
};

export default MyChats;
