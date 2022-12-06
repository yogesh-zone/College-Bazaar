import React from 'react'
import { Box } from "@chakra-ui/layout";
import { useState } from "react";
import Chatbox from "../components/Chatbox";
import MyChats from "../components/MyChats";
import SideDrawer from "../components/Miscellaneous/SideDrawer";
import animatinData2 from "../components/Animations/chatLoading.json";
import Lottie from 'react-lottie';
import { useEffect } from 'react';
import { useSelector } from "react-redux"
// import { ChatState } from "../Context/ChatProvider";

const Chats = () => {
    // const [fetchAgain, setFetchAgain] = useState(false);
    // const { user } = ChatState();
    // const [selectedChat, setSelectedChat] = useState(null);
    //my own 
    const { user } = useSelector(
        (state) => state.user
    );
    const { selectedChat } = useSelector((state) => state.chat);

    useEffect(() => {

    }, [selectedChat])
    const lottieOptions = (animationData) => {
        return {
            loop: true,
            autoplay: true,
            animationData: animationData,
            rendererSettings: {
                preserveAspectRatio: "xMidYMid slice",
            },
        };
    }
    return (
        <div style={{ width: "100%" }}>
            {/*  SideDrawer -->  this is for header/navbar part and a sider drawer open when we click on search users */}
            {/* {user && <SideDrawer />} */}
            <Box display="flex" justifyContent="space-between" w="100%" h="82vh">
                {/* MyChats -->  show left side of the chat means all users on chat (100% width uptill md and for lg it is on left side)*/}
                {user && <MyChats />}
                {/* params --->  fetchAgain={fetchAgain} */}
                {user && selectedChat && <Chatbox />}
                {!selectedChat && <Box
                    display={{ base: "none", md: "flex" }}
                    alignItems="center"
                    flexDir="column"
                    justifyContent='center'
                    bg="white"
                    w={{ base: "100%", md: "68%" }}
                    borderRadius="lg"
                    borderWidth="1px"
                    overflow={"hidden"}
                    background="gray.900"
                >
                    <h2 className="text-white text-2xl font-semibold">No messages, yet ?</h2>
                    <Lottie height={150} width={150} options={lottieOptions(animatinData2)} />
                    <h2 className="text-white text-2xl font-semibold">click on a user to start chat</h2>
                </Box>}
                {/* {(user && selectedChat) ? <Chatbox selectedChat={selectedChat} setSelectedChat={setSelectedChat} /> : <Box
                    display={{ base: "none", md: "flex" }}
                    alignItems="center"
                    flexDir="column"
                    justifyContent='center'
                    bg="white"
                    w={{ base: "100%", md: "68%" }}
                    borderRadius="lg"
                    borderWidth="1px"
                    overflow={"hidden"}
                    background="gray.900"
                >
                    <Lottie height={150} width={150} options={lottieOptions(animatinData2)} />
                    <h2 className="text-white text-2xl font-semibold">click a user to start chat</h2>
                </Box>} */}
            </Box>
        </div>
    );
}

export default Chats;