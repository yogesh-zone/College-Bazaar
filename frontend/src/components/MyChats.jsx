import { AddIcon } from "@chakra-ui/icons";
import { Box, Stack, Text } from "@chakra-ui/layout";
import { Avatar, SkeletonCircle, SkeletonText } from "@chakra-ui/react";
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

    const { user } = useSelector(
        (state) => state.user
    );
    const { selectedChat } = useSelector((state) => state.chat);
    const [chats, setChats] = useState([])
    const [loading, setLoading] = useState(false);
    // fetch the latest msg from either of the user in room
    const fetchChats = async () => {
        try {
            const { data } = await axios.get("/api/chat");
            setChats(data.chats);
        } catch (error) {
            toast({
                title: "error",
                status: "error",
                description: error.response.data.error,
                duration: 3000,
                isClosable: true,
                position: "bottom",
            });
        }
    };
    const toast = useToast();
    const dispatch = useDispatch();
    useEffect(() => {
        setLoading(true);
        fetchChats();
        setLoading(false);
    }, [])

    return (
        <Box
            display={{ base: selectedChat ? "none" : "flex", md: "flex" }}
            flexDir="column"
            alignItems="center"
            // p={3}
            overflow={'hidden'}
            bg="white"
            w={{ base: "100%", md: "32%" }}
            // borderRadius="lg"
            // borderWidth="1px"
            borderRight='1px'
            borderColor='white'
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
            {loading ?
                <div className="text-3xl h-full w-full overflow-auto flex flex-col gap-1">
                    {Array(20).fill(' ').map((_, i) => (
                        <div className=" w-full gap-3 flex items-center p-3 bg-gray-600">
                            <div className="">
                                <SkeletonCircle size='10' />
                            </div>
                            <div className="flex-1">
                                <SkeletonText noOfLines={2} spacing='4' skeletonHeight='2' />
                            </div>
                        </div>
                    ))}
                </div>
                : <>
                    {chats && <Box
                        display="flex"
                        flexDir="column"
                        // p={2}
                        bg="#F8F8F8"
                        w="100%"
                        h="100%"
                        overflowY="hidden"
                        background={"gray.800"}
                    >
                        {chats.length != 0 ? (
                            <Stack overflowY="auto" h={"100%"}>
                                {chats.map((chat) => (
                                    <Box
                                        onClick={() => dispatch(selecetedChat(chat))}
                                        cursor="pointer"
                                        display="flex"
                                        // borderRadius="lg"
                                        justifyContent="between"
                                        // alignItems={'center'}
                                        bg={(selectedChat && selectedChat._id === chat._id) ? "gray.800" : "gray.700"}
                                        color={(selectedChat && selectedChat._id === chat._id) ? "white" : "white"}
                                        _hover={{ bg: "gray.800" }}
                                        p={3}
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
                </>}


        </Box >
    );
};

export default MyChats;
