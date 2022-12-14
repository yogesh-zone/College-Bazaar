import { Box, Button, Image, useToast } from '@chakra-ui/react'
import React, { useState } from 'react'
import { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import Navbar from '../components/Layouts/Navbar'
import { MetaData } from '../components/Utility'
import { FiExternalLink } from "react-icons/fi"
import axios from "axios"
function MyAds() {
    const { user } = useSelector(state => state.user);
    const [ads, setAds] = useState([])
    const [loading, setLoading] = useState(false);
    const [removeLoading, setRemoveLoading] = useState(false);
    const navigate = useNavigate();
    const toast = useToast();
    const handleRemove = async (id) => {
        setRemoveLoading(true);
        try {
            await axios.delete(`/api/adCard/delete/${id}`);
            toast({
                title: "Ad has been removed",
                status: "success",
                duration: 3000,
                isClosable: true,
                position: "bottom",
            });
            getMyItems();
        } catch (error) {
            console.log(error);
            toast({
                title: error.response.data.error,
                status: "error",
                duration: 3000,
                isClosable: true,
                position: "bottom",
            });
        }
        setRemoveLoading(false);
    }

    const getMyItems = async () => {
        try {
            const { data } = await axios.get(`/api/adCard/userAds`);
            setAds(data.ads);
        } catch (error) {
            toast({
                title: error.response.data.error,
                status: "error",
                duration: 3000,
                isClosable: true,
                position: "bottom",
            });
        }
    }
    useEffect(() => {
        setLoading(true);
        getMyItems();
        setLoading(false);
    }, [])
    return (
        <>
            <MetaData title={"My Ads | College Bazaar"} />
            <Navbar active={""} />
            {loading ?
                <></> :
                <>
                    {ads.length ?
                        <>
                            <h1 className="text-white font-bold text-3xl pl-4 mt-10">My Ads</h1>
                            <div className='h-auto mb-10  overflow-y-auto flex flex-wrap gap-1 justify-around items-center'>
                                {ads.map((obj) => (
                                    <Box cursor='pointer' to="/me" minW='sm' maxW={'sm'} mt={12} bg={"gray.700"} color={"gray.300"} borderWidth='1px' borderColor={'gray.400'} borderRadius='lg' overflow='hidden'>
                                        <Box h="250px" p={0} >
                                            <Image src={obj.images[0].url} h='full' w="full" alt={"Ad.imageAlt"} />
                                        </Box>

                                        <Box p='2'>
                                            <Box
                                                mt='1'
                                                fontWeight='bold'
                                                fontSize={'xl'}
                                                color="white"
                                            >
                                                {obj.name}
                                            </Box>
                                            <Box w="full">
                                                {obj.description.slice(0, 40)}{obj.description.length > 40 ? "..." : ""}
                                            </Box>
                                            <Box display={"flex"} justifyContent={"space-between"} alignItems='center' mt='1' color="gray.100">
                                                <Box fontSize={"large"} fontWeight="bold">
                                                    ₹ {obj.price}
                                                </Box>
                                                <Box display={"flex"} w='50%' justifyContent={"space-between"}>
                                                    <Button variant='outline' colorScheme='cyan' onClick={() => navigate(`/item/${obj._id}`)}><FiExternalLink /></Button>
                                                    <Button variant='solid' colorScheme='red' loading={removeLoading} onClick={() => handleRemove(obj._id)}>Remove</Button>
                                                </Box>
                                            </Box>
                                        </Box>
                                    </Box>
                                ))}
                            </div>
                        </>
                        :
                        <><div className="text-3xl text-white">Items not found</div></>
                    }</>}

        </>
    )
}

export default MyAds