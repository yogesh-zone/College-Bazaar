import { Box, Container, Tab, TabList, TabPanel, TabPanels, Tabs, Text, useToast } from '@chakra-ui/react'
import React from 'react'
import { useEffect } from 'react';
import Login from '../components/Authentication/Login';
import Signup from '../components/Authentication/Signup';
import { MetaData } from '../components/Utility';
import { useNavigate } from 'react-router-dom';
import { useSelector } from "react-redux"
import Navbar from '../components/Layouts/Navbar';
// import animationData from "../Animations/chatLoading.json"

function LoginPage({ showToast }) {
    // const defaultOptions = {
    //     loop: true,
    //     autoplay: true,
    //     animationData: animationData,
    //     rendererSettings: {
    //         preserveAspectRatio: "xMidYMid slice",
    //     },
    // };
    const toast = useToast();
    useEffect(() => {
        if (showToast) {
            toast({
                title: "Please sign in to access chat",
                status: "error",
                duration: 3000,
                isClosable: true,
                position: "bottom",
            });
        }
    }, [])
    const navigator = useNavigate();
    const { isAuthenticated } = useSelector(
        (state) => state.user
    );
    useEffect(() => {
        if (isAuthenticated) {
            navigator('/');
        }
    }, []);
    return (
        <>
            <MetaData title={"Sign in | College Bazaar"} />
            <Navbar active={""} />
            <div className='bg-gray-600 text-gray-100'>
                <Container maxW="xl" centerContent>
                    <Box
                        d="flex"
                        justifyContent="center"
                        p={3}
                        bg="gray.700"
                        w="100%"
                        m="40px 0 15px 0"
                        borderRadius="lg"
                    // borderWidth="1px"
                    >
                        <Text fontSize="4xl" fontFamily="Work sans">
                            College Bazaar
                        </Text>
                    </Box>
                    <Box bg="gray.700" w="100%" p={4} borderRadius="lg" mb={4}>
                        <Tabs isFitted colorScheme='blue' variant='solid-rounded'>
                            <TabList mb="1em">
                                <Tab>
                                    <div className="text-white ">Login</div>
                                </Tab>
                                <Tab><div className="text-white ">Sign Up</div></Tab>
                            </TabList>
                            <TabPanels>
                                <TabPanel>
                                    <Login />
                                </TabPanel>
                                <TabPanel>
                                    <Signup />
                                </TabPanel>
                            </TabPanels>
                        </Tabs>
                        <div className=''>
                        </div>
                    </Box>
                </Container>
            </div>
        </>
    )
}

export default LoginPage;