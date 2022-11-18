import { AddIcon } from "@chakra-ui/icons";
import { Box, Stack, Text } from "@chakra-ui/layout";
import { Avatar } from "@chakra-ui/react";
import { useToast } from "@chakra-ui/toast";
import axios from "axios";
import { useEffect, useState } from "react";
// import { getSender } from "../config/ChatLogics";
// import ChatLoading from "./ChatLoading";
// import GroupChatModal from "./miscellaneous/GroupChatModal";
// import { background, Button } from "@chakra-ui/react";
// import { ChatState } from "../Context/ChatProvider";

const MyChats = ({ fetchAgain }) => {
    const [loggedUser, setLoggedUser] = useState({});

    const { setSelectedChat, user, setChats } = {};
    const selectedChat = { latestMessage: { sender: { name: "Yogesh Balodi" }, content: "hello yogesh how are you i am fine" }, _id: 8 };
    const toast = useToast();

    // fetch the latest msg from either of the user in room
    const fetchChats = async () => {
        // console.log(user._id);
        try {
            const config = {
                headers: {
                    Authorization: `Bearer ${user.token}`,
                },
            };

            const { data } = await axios.get("/api/chat", config);
            setChats(data);
            console.log(data);
        } catch (error) {
            toast({
                title: "Error Occured!",
                description: "Failed to Load the chats",
                status: "error",
                duration: 5000,
                isClosable: true,
                position: "bottom-left",
            });
        }
    };

    useEffect(() => {
        setLoggedUser(JSON.parse(localStorage.getItem("userInfo")));
        fetchChats();
        // eslint-disable-next-line
    }, [fetchAgain]);

    const chats = [
        { sender: "Yogesh Balodi", latestMessage: { sender: { name: "Yogesh Balodi" }, content: "hello yogesh how are you i am fine" }, _id: 123 },
        { sender: "ABC Balodi", latestMessage: { sender: { name: "Yogesh Balodi" }, content: "hello yogesh how are you i am fine" }, _id: 4 },
        { sender: "DEF Balodi", latestMessage: { sender: { name: "Yogesh Balodi" }, content: "hello yogesh how are you i am fine" }, _id: 5 },
        { sender: "GFG Balodi", latestMessage: { sender: { name: "Yogesh Balodi" }, content: "hello yogesh how are you i am fine" }, _id: 6 },
        { sender: "Leet Code", _id: 6 },
    ]
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
            <Box
                display="flex"
                flexDir="column"
                p={2}
                bg="#F8F8F8"
                w="100%"
                h="100%"
                overflowY="hidden"
                background={"gray.800"}
            >
                {chats ? (
                    <Stack overflowY="auto" gap={0} h={"100%"}>
                        {chats.map((chat) => (
                            <Box
                                onClick={() => setSelectedChat(chat)}
                                cursor="pointer"
                                display="flex"
                                borderRadius="lg"
                                justifyContent="between"
                                // alignItems={'center'}
                                bg={selectedChat._id === chat._id ? "gray.300" : "gray.700"}
                                color={selectedChat._id === chat._id ? "black" : "white"}
                                _hover={{ bg: "gray.600" }}
                                p={2}
                                key={chat._id}
                            >
                                <Avatar size="md"></Avatar>
                                <Box px={2}>
                                    <Text>
                                        {chat.sender}
                                    </Text>
                                    {chat.latestMessage && (
                                        <Text fontSize="xs">
                                            <b>{chat.latestMessage.sender.name} : </b>
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
                    <div className="p-2 text-2xl font-semibold h-[100%] flex items-center justify-center text-center text-white">No chats available</div>
                </>
                )}
            </Box>
        </Box >
    );
};

export default MyChats;
