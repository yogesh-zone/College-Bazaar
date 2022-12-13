import { FormControl } from "@chakra-ui/form-control";
import { Box, Text } from "@chakra-ui/layout";
import { useToast } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import axios from "axios";
import Lottie from "react-lottie"
import ScrollableChat from "./ScrollableChat";
import animationData from "../components/Animations/chatLoading.json";
import SafetyModel from "./Miscellaneous/SafetyModel";
import { useSelector } from "react-redux";
import io from 'socket.io-client'
const ENDPOINT = "http://localhost:4000";
var socket, selectedChatCompare;
const lottieOptions = (data) => {
    return {
        loop: true,
        autoplay: true,
        animationData: data,
        rendererSettings: {
            preserveAspectRatio: "xMidYMid slice",
        },
    };
}

const SingleChat = () => {
    const { selectedChat } = useSelector((state) => state.chat);
    const { user } = useSelector((state) => state.user);
    const [messages, setMessages] = useState([]);
    const [loading, setLoading] = useState(false);
    const [newMessage, setNewMessage] = useState("");
    const [socketConnected, setSocketConnected] = useState(false);
    const [typing, setTyping] = useState(false);
    const [istyping, setIsTyping] = useState(false);
    const toast = useToast();
    const defaultOptions = {
        loop: true,
        autoplay: true,
        animationData: animationData,
        rendererSettings: {
            preserveAspectRatio: "xMidYMid slice",
        },
    };

    const fetchMessages = async () => {
        if (!selectedChat) return;
        try {
            setLoading(true);
            const { data } = await axios.get(`/api/message/all/${selectedChat._id}`);
            console.log("messages sre ", data);
            setMessages(data.msg);
            socket.emit("join chat", selectedChat._id);
        } catch (error) {
            toast({
                title: "Error Occured!",
                description: "Failed to Load the Messages",
                status: "error",
                duration: 3000,
                isClosable: true,
                position: "bottom",
            });
        }
        setLoading(false);
    };

    const sendMessage = async (event) => {
        if (event.key === "Enter" && newMessage) {
            socket.emit("stop typing", selectedChat._id);
            try {
                const { data } = await axios.post(
                    "/api/message/new",
                    {
                        content: newMessage,
                        chatId: selectedChat._id,
                    },
                );
                socket.emit("new message", data.message);
                setMessages([...messages, data.message]);
            } catch (error) {
                toast({
                    title: "Error Occured!",
                    description: "Failed to send the Message",
                    status: "error",
                    duration: 3000,
                    isClosable: true,
                    position: "bottom",
                });
            }
            setNewMessage("");
        }
    };

    useEffect(() => {
        socket = io(ENDPOINT);
        socket.emit("setup", user);
        socket.on("connected", () => setSocketConnected(true));
        socket.on("typing", () => setIsTyping(true));
        socket.on("stop typing", () => setIsTyping(false));
    }, []);

    useEffect(() => {
        fetchMessages();
        selectedChatCompare = selectedChat;
    }, [selectedChat]);

    useEffect(() => {
        socket.on("message recieved", (newMessageRecieved) => {
            if (
                !selectedChatCompare || // if chat is not selected or doesn't match current chat
                selectedChatCompare._id !== newMessageRecieved.chat._id
            ) {
                // if (!notification.includes(newMessageRecieved)) {
                //     setNotification([newMessageRecieved, ...notification]);
                //     setFetchAgain(!fetchAgain);
                // }
            } else {
                setMessages([...messages, newMessageRecieved]);
            }
        });
    });

    const typingHandler = (e) => {
        setNewMessage(e.target.value);

        if (!socketConnected) return;

        if (!typing) {
            setTyping(true);
            socket.emit("typing", selectedChat._id);
        }
        let lastTypingTime = new Date().getTime();
        var timerLength = 3000;
        setTimeout(() => {
            var timeNow = new Date().getTime();
            var timeDiff = timeNow - lastTypingTime;
            if (timeDiff >= timerLength && typing) {
                socket.emit("stop typing", selectedChat._id);
                setTyping(false);
            }
        }, timerLength);
    };

    return (
        <>
            <Box
                display="flex"
                flexDir="column"
                justifyContent="flex-end"
                p={3}
                w="100%"
                h="85%"
                borderRadius="lg"
                overflowY="hidden"
            >
                {loading ?
                    <div className=" h-auto my-auto flex justify-center">
                        <Lottie speed={5} height={150} width={150} options={lottieOptions(animationData)} />
                    </div>
                    :
                    <>
                        {messages.length ? <div className="messages mb-3 flex flex-col overflow-y-scroll scrollbar-hide">
                            <ScrollableChat messages={messages} isTyping={istyping} />
                            {/* {istyping && <div>
                                <Lottie
                                    options={defaultOptions}
                                    // height={50}
                                    speed={10}
                                    width={70}
                                    style={{ marginBottom: 15, marginLeft: 0 }}
                                />
                            </div>} */}
                        </div> : <SafetyModel flag={true} />}
                    </>

                }
                <FormControl
                    onKeyDown={sendMessage}
                    isRequired
                    mt={3}

                >

                    <input type="text" value={newMessage} onChange={typingHandler} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:outline-none focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Enter a message.."></input>
                </FormControl>
            </Box>
        </>
    );
};

export default SingleChat;
