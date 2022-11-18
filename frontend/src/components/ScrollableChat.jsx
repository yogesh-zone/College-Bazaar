import { Avatar } from "@chakra-ui/avatar";
import { Tooltip } from "@chakra-ui/tooltip";
import ScrollableFeed from "react-scrollable-feed";
import {
    isLastMessage,
    isSameSender,
    isSameSenderMargin,
    isSameUser,
} from "./Miscellaneous/ChatLogic";
// import { ChatState } from "../Context/ChatProvider";

const ScrollableChat = ({ messages }) => {
    // const { user } = ChatState();
    const user = { _id: 123, name: "Yogesh  Balodi", email: "yogeshbalodi1001@gmail.com", phone: { isPhone: false, phone: 8368616227 }, pic: "" }
    return (
        <ScrollableFeed className="scrollbar-hide">
            {messages &&
                messages.map((m, i) => (
                    <div style={{ display: "flex" }} key={m._id}>
                        {/* {(isSameSender(messages, m, i, user._id) ||
                            isLastMessage(messages, i, user._id)) && (
                                <Tooltip label={m.sender.name} placement="bottom-start" hasArrow>
                                    <Avatar
                                        mt="7px"
                                        mr={1}
                                        size="sm"
                                        cursor="pointer"
                                        name={m.sender.name}
                                        src={m.sender.pic}
                                    />
                                </Tooltip>
                            )} */}
                        <span
                            style={{
                                backgroundColor: `${m.sender._id === user._id ? "#00a884" : "#54656f"
                                    }`,
                                color: "white",
                                marginLeft: isSameSenderMargin(messages, m, i, user._id),
                                marginTop: isSameUser(messages, m, i, user._id) ? 3 : 10,
                                borderRadius: "10px",
                                padding: "5px 15px",
                                maxWidth: "75%",
                            }}
                        >
                            {m.content}
                        </span>
                    </div>
                ))}
        </ScrollableFeed>
    );
};

export default ScrollableChat;
