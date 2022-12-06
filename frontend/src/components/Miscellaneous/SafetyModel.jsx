import React from 'react'
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
    Avatar,
    Text,
    Box,
    Divider,
} from "@chakra-ui/react";
import { MdReportProblem } from "react-icons/md"
import { RiFlagLine } from "react-icons/ri"
import { BsFillCreditCard2BackFill } from "react-icons/bs"
import { FaMoneyBillWave } from "react-icons/fa"
import { MdOutlineReport } from "react-icons/md"
import { useEffect } from 'react';
import { useState } from 'react';


const SafetyModel = ({ flag }) => {
    const { isOpen, onOpen, onClose } = useDisclosure();
    const [open, setOpen] = useState(flag);
    useEffect(() => {
        if (open) {
            onOpen();
            setOpen(false);
        }
    })
    return (
        <>
            {/* <Avatar d={{ base: "flex" }} size="md" onClick={onOpen}></Avatar> */}
            {!flag && <MdReportProblem onClick={onOpen} />}
            <Modal size='lg' onClose={onClose} isOpen={isOpen} isCentered>
                <ModalOverlay />
                <ModalContent h="410px" bg='gray.700'
                    color='white'>
                    <ModalHeader
                        fontSize="80px"
                        fontFamily="Work sans"
                        display="flex"
                        color='black'
                        justifyItems='center'
                        justifyContent="center"
                        bg='gray.300'
                    >
                        <MdReportProblem />
                        {/* <Box display="flex" flexDir='column'>
                            
                            <Text>Saftey</Text>
                        </Box> */}
                    </ModalHeader>
                    <ModalCloseButton color='black' />
                    <ModalBody
                        display="flex"
                        flexDir="column"
                        // alignItems="center"
                        // justifyContent="start"
                        fontSize={'md'}
                    >
                        <div className="flex justify-center font-bold text-2xl mt-2 mb-6">Tips for a safe deal</div>
                        <div className="flex justify-start gap-2 flex-wrap items-center my-1">
                            <RiFlagLine className='font-ultrabold text-xl' />
                            <span className="">Take necessary precautions while meeting with  sellers
                            </span>
                        </div>
                        <Divider />
                        <div className="flex justify-start gap-2 flex-wrap items-center my-1">
                            <BsFillCreditCard2BackFill className='font-ultrabold  text-xl' />
                            <span className="">Do not enter UPI PIN while receiving money
                            </span>
                        </div>
                        <Divider />
                        <div className="flex justify-start gap-2 flex-wrap items-center my-1">
                            <FaMoneyBillWave className='font-ultrabold  text-xl' />
                            <span className="">	Never give money or product in advance
                            </span>
                        </div>
                        <Divider />
                        <div className="flex justify-start gap-2 flex-wrap items-center my-1">
                            <MdOutlineReport className='font-ultrabold  text-xl' />
                            <span className="">	Report suspicious users to College Bazaar
                            </span>
                        </div>
                    </ModalBody>
                    <ModalFooter>
                        <Button colorScheme='cyan' onClick={onClose}>Continue</Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </>
    );
};


export default SafetyModel