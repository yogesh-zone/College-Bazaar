import { ViewIcon } from "@chakra-ui/icons";
import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton,
    Button,
    useDisclosure,
    IconButton,
    Text,
    Image,
    Avatar,
    Box,
} from "@chakra-ui/react";
import { Link } from "react-router-dom";

const ProfileModal = ({ user, children }) => {
    const { isOpen, onOpen, onClose } = useDisclosure();
    return (
        <>
            {children ? (
                <span onClick={onOpen}>{children}</span>
            ) : (
                <Avatar display='flex' alt={user.name} src={user.avatar.url} size="md" onClick={onOpen}></Avatar>
            )}
            <Modal size="lg" onClose={onClose} isOpen={isOpen} isCentered>
                <ModalOverlay />
                <ModalContent h="410px" bg='gray.700' color='white'>
                    <ModalHeader
                        fontSize="40px"
                        fontFamily="Work sans"
                        display="flex"
                        justifyContent="center"
                        bg='gray.300'
                        color='black'
                    >
                        {user.name}
                    </ModalHeader>
                    <ModalCloseButton color='black' />
                    <ModalBody
                        display="flex"
                        flexDir="column"
                        alignItems="center"
                        justifyContent="space-between"
                    >
                        {/* <Image
                            borderRadius="full"
                            boxSize="140px"
                            src={user.avatar.url}
                            alt={user.name}
                        /> */}
                        <Avatar size='2xl' alt={user.name} src={user.avatar.url}></Avatar>
                        <Box>
                            <Text
                                fontSize={{ base: "28px", md: "30px" }}
                                fontFamily="Work sans"
                            >
                                Email: {user.email}
                            </Text>
                            {(user.phone && user.phone.showPhone) && <Text
                                fontSize={{ base: "28px", md: "30px" }}
                                fontFamily="Work sans"
                            >
                                Phone: {user.phone.phone}
                            </Text>}
                        </Box>

                    </ModalBody>
                    <ModalFooter display="flex" alignItems="center"
                        justifyContent="space-between">
                        <Link to="/" onClick={onClose}>More Info</Link>
                        <Button colorScheme={'cyan'} onClick={onClose}>Close</Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </>
    );
};

export default ProfileModal;
