import { Avatar } from "@chakra-ui/avatar";
import { Box } from "@chakra-ui/react";
import { Tooltip } from "@chakra-ui/tooltip";
import { useSelector } from "react-redux";
import ScrollableFeed from "react-scrollable-feed";
import {
    isLastMessage,
    isSameSender,
    isSameSenderMargin,
    isSameUser,
} from "./Miscellaneous/ChatLogic";
import SafetyModel from "./Miscellaneous/SafetyModel";
// import { ChatState } from "../Context/ChatProvider";

const ScrollableChat = () => {
    // const { user } = ChatState();
    const { messages } = useSelector((state) => state.messages);
    const { user } = useSelector((state) => state.user);
    return (
        <ScrollableFeed className="scrollbar-hide">
            {messages.length ?
                messages.map((obj, i) => (
                    <div style={{ display: "flex" }} key={obj._id}>
                        <span
                            style={{
                                backgroundColor: `${obj.sender._id === user._id ? "#1C7516" : "#54656f"
                                    }`,
                                color: "white",
                                marginLeft: isSameSenderMargin(messages, obj, i, user._id),
                                marginTop: isSameUser(messages, obj, i, user._id) ? 8 : 12,
                                borderRadius: "10px",
                                padding: "5px 15px",
                                maxWidth: "75%",
                            }}
                        >
                            {obj.content}
                        </span>
                    </div>
                )) :
                <SafetyModel flag={true} />}
        </ScrollableFeed>
    );
};

export default ScrollableChat;
