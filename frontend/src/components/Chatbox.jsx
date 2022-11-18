import { Avatar, Box, Text } from "@chakra-ui/react";
import SingleChat from "./SingleChat";

const Chatbox = ({ fetchAgain, setFetchAgain }) => {
    // const { selectedChat } = ChatState();
    const selectedChat = false;
    return (
        <Box
            d={{ base: selectedChat ? "flex" : "none", md: "flex" }}
            alignItems="center"
            flexDir="column"
            bg="white"
            w={{ base: "100%", md: "68%" }}
            borderRadius="lg"
            borderWidth="1px"
            overflow={"hidden"}
            background="gray.900"
        >
            <Box display="flex" p={3} justifyContent="start" background="gray.700" justifyItems="center" gap={3} alignItems="center">
                <Avatar size={'sm'}></Avatar>
                <Text color="white" fontSize={'xl'}>Yogesh Balodi</Text>
            </Box>
            <SingleChat />
            {/* fetchAgain={fetchAgain} setFetchAgain={setFetchAgain} */}
        </Box>
    );
};

export default Chatbox;
