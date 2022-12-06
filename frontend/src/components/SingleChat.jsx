import { FormControl } from "@chakra-ui/form-control";
import { Input } from "@chakra-ui/input";
import { Box, Text } from "@chakra-ui/layout";
// import "./styles.css";
import { IconButton, Spinner, useToast } from "@chakra-ui/react";
import { getSender, getSenderFull } from "./Miscellaneous/ChatLogic";
import { useEffect, useState } from "react";
import axios from "axios";
import Lottie from "react-lottie"
import { ArrowBackIcon } from "@chakra-ui/icons";
import ProfileModal from "./Miscellaneous/ProfileModel";
import ScrollableChat from "./ScrollableChat";
import animationData from "../components/Animations/chatLoading.json";
import animatinData2 from "../components/Animations/defaultLoading.json"
import SafetyModel from "./Miscellaneous/SafetyModel";
import { useDispatch, useSelector } from "react-redux";
import { allMessages } from "../actions/chatAction";
// import Lottie from "react-lottie";

// import io from "socket.io-client";   
// import UpdateGroupChatModal from "./miscellaneous/UpdateGroupChatModal";
// import { ChatState } from "../Context/ChatProvider";
// const ENDPOINT = "http://localhost:4000"; // "https://talk-a-tive.herokuapp.com"; -> After deployment
// var socket, selectedChatCompare;
var selectedChatCompare;

const SingleChat = () => {
    // const [messages, setMessages] = useState([]);
    const { messages, loading, error } = useSelector((state) => state.messages);
    // const [loading, setLoading] = useState(false);
    const [newMessage, setNewMessage] = useState("");
    const { selectedChat } = useSelector((state) => state.chat);
    // const [socketConnected, setSocketConnected] = useState(false);
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
    // const selectedChat = { users: [{ _id: 123, name: "Yogesh  Balodi", email: "yogeshbalodi1001@gmail.com", phone: { isPhone: false, phone: 8368616227 }, avatar: "#" }, { _id: 456, name: "Purnima  Balodi", email: "Purnimabalodi1001@gmail.com", phone: { isPhone: false, phone: 8860865732 }, avatar: "#" }], latestMessage: { sender: { name: "Yogesh Balodi" }, content: "hello yogesh how are you i am fine" }, _id: 8 };
    const { user } = useSelector((state) => state.user);
    const dispatch = useDispatch();
    const fetchMessages = async () => {
        console.log("fetchMessages effect..", selectedChat)
        if (!selectedChat) return;
        dispatch(allMessages(selectedChat._id));
    };

    const sendMessage = async (event) => {
        if (event.key === "Enter" && newMessage) {
            // socket.emit("stop typing", selectedChat._id);
            try {
                const { data } = await axios.post(
                    "/api/message/new",
                    {
                        content: newMessage,
                        chatId: selectedChat._id,
                    },
                );

                // socket.emit("new message", data);
                messages.push(data.msg);
            } catch (error) {
                toast({
                    title: "Error Occured!",
                    description: "Failed to send the Message",
                    status: "error",
                    duration: 5000,
                    isClosable: true,
                    position: "bottom",
                });
            }
            setNewMessage("");
        }
    };

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

    // useEffect(() => {
    // socket = io(ENDPOINT);
    // socket.emit("setup", user);
    // socket.on("connected", () => setSocketConnected(true));
    // socket.on("typing", () => setIsTyping(true));
    // socket.on("stop typing", () => setIsTyping(false));

    // eslint-disable-next-line
    // }, [messages]);

    useEffect(() => {
        fetchMessages();

        selectedChatCompare = selectedChat;
        // eslint-disable-next-line
    }, [selectedChat]);

    // useEffect(() => {
    //     socket.on("message recieved", (newMessageRecieved) => {
    //         if (
    //             !selectedChatCompare || // if chat is not selected or doesn't match current chat
    //             selectedChatCompare._id !== newMessageRecieved.chat._id
    //         ) {
    //             if (!notification.includes(newMessageRecieved)) {
    //                 setNotification([newMessageRecieved, ...notification]);
    //                 setFetchAgain(!fetchAgain);
    //             }
    //         } else {
    //             setMessages([...messages, newMessageRecieved]);
    //         }
    //     });
    // });

    const typingHandler = (e) => {
        setNewMessage(e.target.value);

        // if (!socketConnected) return;

        if (!typing) {
            setTyping(true);
            // socket.emit("typing", selectedChat._id);
        }
        let lastTypingTime = new Date().getTime();
        var timerLength = 3000;
        setTimeout(() => {
            var timeNow = new Date().getTime();
            var timeDiff = timeNow - lastTypingTime;
            if (timeDiff >= timerLength && typing) {
                // socket.emit("stop typing", selectedChat._id);
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
                        {messages != [] ? <div className="messages mb-3 flex flex-col overflow-y-scroll scrollbar-hide">
                            <ScrollableChat messages={messages} />
                        </div> : <SafetyModel flag={true} />}
                    </>

                }
                <FormControl
                    onKeyDown={sendMessage}
                    id="first-name"
                    isRequired
                    mt={3}

                >
                    {istyping && <div>
                        <Lottie
                            options={defaultOptions}
                            // height={50}
                            speed={10}
                            width={70}
                            style={{ marginBottom: 15, marginLeft: 0 }}
                        />
                    </div>}
                    <Input
                        variant="filled"
                        // bg="#E0E0E0"
                        placeholder="Enter a message.."
                        value={newMessage}
                        onChange={typingHandler}
                    />
                </FormControl>

            </Box>
        </>
    );
};

export default SingleChat;
