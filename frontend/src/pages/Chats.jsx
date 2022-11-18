import React from 'react'
import { Box } from "@chakra-ui/layout";
import { useState } from "react";
import Chatbox from "../components/Chatbox";
import MyChats from "../components/MyChats";
import SideDrawer from "../components/Miscellaneous/SideDrawer";
// import { ChatState } from "../Context/ChatProvider";

const Chats = () => {
    // const [fetchAgain, setFetchAgain] = useState(false);
    // const { user } = ChatState();

    //my own 
    const [user, setUser] = useState(true);
    return (
        <div style={{ width: "100%" }}>
            {/*  SideDrawer -->  this is for header/navbar part and a sider drawer open when we click on search users */}
            {/* {user && <SideDrawer />} */}
            <Box display="flex" justifyContent="space-between" w="100%" h="82vh">
                {/* MyChats -->  show left side of the chat means all users on chat (100% width uptill md and for lg it is on left side)*/}
                {user && <MyChats />}  {/* params --->  fetchAgain={fetchAgain} */}
                {user && (
                    // Chatbox --> show chats of a particular room (user) (100% width uptill md and for lg it is on right side)
                    <Chatbox />)} {/*  params --> fetchAgain={fetchAgain} setFetchAgain={setFetchAgain} */}
            </Box>
        </div>
    );
}

export default Chats;