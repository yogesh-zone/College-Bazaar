import { Box, Container, Tab, TabList, TabPanel, TabPanels, Tabs, Text } from '@chakra-ui/react'
import React from 'react'
import Login from '../Authentication/Login';
import Signup from '../Authentication/Signup';
import { MetaData } from '../components/Utility';
// import animationData from "../Animations/chatLoading.json"

function LoginPage() {
    // const defaultOptions = {
    //     loop: true,
    //     autoplay: true,
    //     animationData: animationData,
    //     rendererSettings: {
    //         preserveAspectRatio: "xMidYMid slice",
    //     },
    // };
    return (
        <>
            <MetaData title={"Login"} />
            <div className=' Login'>
                <Container maxW="xl" centerContent>
                    <Box
                        d="flex"
                        justifyContent="center"
                        p={3}
                        bg="white"
                        w="100%"
                        m="40px 0 15px 0"
                        borderRadius="lg"
                        borderWidth="1px"
                    >
                        <Text fontSize="4xl" fontFamily="Work sans">
                            Collage Bazaar
                        </Text>
                    </Box>
                    <Box bg="white" w="100%" p={4} borderRadius="lg" borderWidth="1px" mb={8}>
                        <Tabs isFitted variant="soft-rounded">
                            <TabList mb="1em">
                                <Tab>Login</Tab>
                                <Tab>Sign Up</Tab>
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