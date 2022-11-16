import { Box } from "@chakra-ui/react";

const Chatbox = ({ fetchAgain, setFetchAgain }) => {
    // const { selectedChat } = ChatState();
    const selectedChat = false;
    return (
        <Box
            d={{ base: selectedChat ? "flex" : "none", md: "flex" }}
            alignItems="center"
            flexDir="column"
            p={3}
            bg="white"
            w={{ base: "100%", md: "68%" }}
            borderRadius="lg"
            borderWidth="1px"
            background="red"
        >
            single chat
            {/* <SingleChat fetchAgain={fetchAgain} setFetchAgain={setFetchAgain} /> */}
        </Box>
    );
};

export default Chatbox;