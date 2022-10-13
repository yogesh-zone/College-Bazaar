import { Box, Center, Flex, Text } from '@chakra-ui/react'
import React from 'react'

function Navbar() {
    return (
        <Flex py={{ base: "2", lg: "4" }} px={{ base: "1", lg: "2" }} bg='red' display='flex' justifyContent='space-between'>
            <Box width={{ sm: '30%', md: '20%', lg: "10%" }} p={{ base: '1', md: '2' }} bg='blue'>
                <Center>Logo</Center>
            </Box>
            <Flex width={{ sm: '60%', lg: "10%" }} p={{ base: '1', md: '2' }} bg='pink'>
                <Center>College Bazaarr</Center>
            </Flex>
            <Flex width={{ sm: '20%', lg: "80%" }} p={{ base: '1', md: '2' }} display={{ sm: 'none', lg: 'flex' }} bg='green'>
                <Center>menu all</Center>
            </Flex>
            <Box width={{ sm: '20%', lg: "80%" }} p={{ base: '1', md: '2' }} display={{ sm: 'flex', lg: 'none' }} bg='green'>
                <Center>menu one</Center>
            </Box>

        </Flex>
    )
}

export default Navbar

