import { Box, Button, Image, SkeletonText, useToast } from '@chakra-ui/react'
import React, { useState } from 'react'
import { useEffect } from 'react';
import { AiOutlineSearch } from 'react-icons/ai'
import { useNavigate } from 'react-router-dom';
import ItemsLoading from './Loading/ItemsLoading';
import axios from "axios"
function AllItems() {
    const [ads, setAds] = useState([]);
    const [loading, setLoading] = useState(false);
    const [name, setName] = useState("");
    const [category, setCategory] = useState("");
    const [course, setCourse] = useState("");
    const [semester, setSemester] = useState("");
    const [sem, setSem] = useState(4);
    const [hideLoadButton, setHideLoadButton] = useState(false);
    const [page, SetPage] = useState(2);
    const toast = useToast();
    let resultPerPage = 8;
    const fetchAds = async (isLoadMore = false) => {
        setLoading(true);
        try {
            let url = `/api/adCard/all?name=${name}&course=${course}&semester=${semester}&category=${category}`
            if (isLoadMore === true) {
                setLoading(false);
                url += `&page=${page}`
            }
            setHideLoadButton(false);
            console.log(url, isLoadMore);

            const { data } = await axios.get(url);
            if (isLoadMore === true) {
                setAds([...ads, ...data.ads])
                SetPage(page + 1);
            } else {
                setAds(data.ads);
            }
            if (data.ads.length < resultPerPage) {
                setHideLoadButton(true);
            }

        } catch (error) {
            toast({
                title: error.response.data.error,
                status: "error",
                duration: 3000,
                isClosable: true,
                position: "bottom",
            });
            setAds([])
            setHideLoadButton(true);
        }
        setLoading(false);
    }
    const handleCourse = (e) => {
        setCourse(e.target.value);
        courseSem(e.target.value);
    }
    const courseSem = (sem) => {
        switch (sem) {
            case "B.Tech":
                setSem(8);
                break;
            case "BBA":
                setSem(6);
                break;
            case "MBA":
                setSem(4);
                break;
            default:
                break;
        }
    }
    const handleSubmit = (e) => {
        e.preventDefault();
        // console.log(name, course, semester, category);
        // setName("");
        // setCategory("All");
        // setSem(4);
        // setCourse("");
        // setSemester("");
        // console.log("handling submit form");
    }
    const navigate = useNavigate();
    useEffect(() => {
        fetchAds();
    }, []);
    return (
        <>
            <div className="flex flex-col">
                <div className='sticky top-0 lg:top-[12vh] overflow-hidden'>

                    <form className='bg-gray-700 flex -mt-0.5 flex-row flex-wrap justify-between lg:justify-around items-center p-3'
                        onSubmit={handleSubmit}>
                        <input
                            value={name}
                            type="text"
                            placeholder="Search by Name.."
                            onChange={(e) => setName(e.target.value)}
                            className="bg-transparent my-1 w-[32%] lg:w-[20%] lg:ml-3 border outline-none text-white focus:bg-gray-600 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 p-2" />


                        <select className="bg-transparent w-[32%] lg:w-[20%] lg:ml-3 md:w-[22%] border outline-none text-white focus:bg-gray-600 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 p-2 "
                            value={course && course}
                            onChange={handleCourse}>
                            <option value=""> Course</option>
                            <option value="B.Tech" >B.Tech</option>
                            <option value="BBA">BBA</option>
                            <option value="MBA">MBA</option>
                        </select>
                        <select
                            className="bg-transparent w-[32%] lg:w-[20%] lg:ml-3 md:w-[22%] border outline-none text-white focus:bg-gray-600 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 p-2 "
                            value={semester && semester}
                            onChange={(e) => { setSemester(e.target.value) }}>
                            <option value="">Semester</option>
                            <option value="first" className={sem >= 1 ? "flex m-3" : "hidden"}>I</option>
                            <option value="second" className={sem >= 2 ? "flex m-3" : "hidden"}>II</option>
                            <option value="third" className={sem >= 3 ? "flex m-3" : "hidden"}>III</option>
                            <option value="fourth" className={sem >= 4 ? "flex m-3" : "hidden"}>IV</option>
                            <option value="fifth" className={sem >= 5 ? "flex m-3" : "hidden"}>V</option>
                            <option value="sixth" className={sem >= 6 ? "flex" : "hidden"}>VI</option>
                            <option value="seventh" className={sem >= 7 ? "flex" : "hidden"}>VII</option>
                            <option value="eighth" className={sem >= 8 ? "flex" : "hidden"}>VIII</option>
                        </select>
                        <select
                            placeholder='category'
                            className="bg-transparent w-[32%] lg:w-[20%] lg:ml-3 md:w-[20%] border outline-none text-white focus:bg-gray-600 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 p-2 "
                            value={category && category}
                            onChange={(e) => { setCategory(e.target.value) }}>
                            <option value="All">category</option>
                            <option value="Akash">Akash</option>
                            <option value="Books">Book</option>
                            <option value="ED">Engineering Drawing</option>
                            <option value="Electornics">Electornics</option>
                        </select>
                        <div className='mr-auto ml-2 lg:mr-0 md:ml-0 py-2 lg:py-0'>
                            <Button type='submit' variant={"solid"} background="green.600" textColor={"white"} _hover={{ background: "green.700" }} _active={{ background: "green.900" }} rightIcon={<AiOutlineSearch />} onClick={fetchAds}>
                                Search Items
                            </Button>
                        </div>
                    </form>
                </div>
                <div className=''>
                    {loading ?
                        // <div className='bg-transparent flex justify-center items-center h-full overflow-hidden'>
                        //     <ItemsLoading />  
                        // </div>
                        <>
                            <h1 className="text-white font-bold text-3xl pl-4 mt-6">Fresh recommendations</h1>
                            <div className='h-auto overflow-y-auto flex gap-6 my-6 flex-wrap justify-around items-center'>
                                {Array(3).fill(" ").map((obj, i) => (
                                    <Box key={i} boxShadow='lg' minW='sm' maxW={'sm'} bg={"gray.700"} color={"gray.300"} borderWidth='1px' borderColor={'gray.400'} borderRadius='lg' overflow='hidden'>
                                        <Box h="200px" w='full'>
                                            <SkeletonText noOfLines={1} skeletonHeight='200' />
                                        </Box>

                                        <Box p='2'>
                                            <Box
                                                mt='1'
                                            >
                                                <SkeletonText w="50%" noOfLines={1} spacing='4' skeletonHeight='3' />
                                            </Box>
                                            <Box w="full">
                                                <SkeletonText mt='2' noOfLines={1} spacing='4' skeletonHeight='2' />
                                            </Box>
                                            <Box display={"flex"} mt='2' justifyContent={"space-between"} justifyItems='center' color="gray.100">
                                                <Box fontSize={"large"} w="30%" fontWeight="bold">
                                                    <SkeletonText noOfLines={1} spacing='4' skeletonHeight='3' />
                                                </Box>
                                                <Box w="40%">
                                                    <SkeletonText noOfLines={1} spacing='4' skeletonHeight='2' />
                                                </Box>
                                            </Box>
                                        </Box>
                                    </Box>
                                ))}
                            </div>
                        </>
                        : <>
                            {ads.length ? <><h1 className="text-white font-bold text-3xl pl-4 mt-6">Fresh recommendations</h1>
                                <div className='h-auto  overflow-y-auto flex flex-wrap gap-6 my-6 justify-around items-center'>
                                    {/* <h1 className='h-12'>hello</h1> */}
                                    {ads.map((ad) => (
                                        <Box onClick={() => navigate(`/item/${ad._id}`)} cursor='pointer' to="/me" minW='sm' maxW={'sm'} bg={"gray.700"} color={"gray.300"} borderWidth='1px' borderColor={'gray.400'} borderRadius='lg' overflow='hidden'>
                                            <Box h="250px" p={0} >
                                                <Image src={ad.images[0].url} h='full' w="full" alt={"Ad.imageAlt"} />
                                            </Box>

                                            <Box p='2'>
                                                <Box
                                                    mt='1'
                                                    fontWeight='bold'
                                                    fontSize={'xl'}
                                                    color="white"
                                                >
                                                    {ad.name.slice(0, 30)}{ad.name.length > 30 ? "..." : ""}
                                                </Box>
                                                <Box w="full">
                                                    {ad.description.slice(0, 40)}{ad.description.length > 40 ? "..." : ""}
                                                </Box>
                                                <Box display={"flex"} justifyContent={"space-between"} mt='1' color="gray.100">
                                                    <Box fontSize={"large"} fontWeight="bold">
                                                        ₹ {ad.price}
                                                    </Box>
                                                    <Box>
                                                        {ad.createdAt.slice(8, 10) + "/" + ad.createdAt.slice(5, 7) + "/" + ad.createdAt.slice(0, 4)}
                                                    </Box>
                                                </Box>
                                            </Box>
                                        </Box>
                                    ))}
                                </div>
                                <div className={`${hideLoadButton ? "hidden" : "flex"} justify-center my-12 `}>
                                    <div className="">
                                        <Button variant="solid" mx='auto' onClick={() => fetchAds(true)} colorSchema="blue" >Load More</Button>
                                    </div>
                                </div></> : <div className="text-2xl sm:text-3xl font-bold h-full w-full flex items-center justify-center text-white capitalize">Items not found</div>
                            }
                        </>
                    }


                </div>
            </div>
        </>
    )
}

export default AllItems