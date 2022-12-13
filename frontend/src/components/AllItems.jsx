import { Box, Button, Image, useToast } from '@chakra-ui/react'
import React, { useState } from 'react'
import { useEffect } from 'react';
import { AiOutlineSearch } from 'react-icons/ai'
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { getAllItems } from '../actions/itemAction';
import ItemsLoading from './Loading/ItemsLoading';

function AllItems() {
    const { loading, ads, error } = useSelector((state) => state.ads);
    if (error) {
        console.log(error);
    }
    const [name, setName] = useState("");
    const [category, setCategory] = useState("");
    const [course, setCourse] = useState("");
    const [semester, setSemester] = useState("");
    const [sem, setSem] = useState(4);
    const [allAds, setAllAds] = useState([]);
    const [hideLoadButton, setHideLoadButton] = useState(false);
    const [page, SetPage] = useState(1);
    const toast = useToast();
    const dispatch = useDispatch();
    const fetchAds = (isAllItems = false) => {
        if (isAllItems) {
            if (hideLoadButton) {
                setHideLoadButton(false);
            }
            setAllAds([]);
            SetPage(1);
            const url = `/api/adCard/all?name=${name}&course=${course}&semester=${semester}&category=${category}`
            dispatch(getAllItems(url, isAllItems));
        } else {
            const url = `/api/adCard/all?name=${name}&course=${course}&semester=${semester}&category=${category}&page=${page}`
            dispatch(getAllItems(url));
            SetPage(page + 1);
        }
        console.log("adsss", ads);
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
        console.log(name, course, semester, category);
        setName("");
        setCategory("All");
        setSem(4);
        setCourse("");
        setSemester("");
        console.log("handling submit form");
    }
    const navigate = useNavigate();
    useEffect(() => {
        fetchAds(false);
        return () => {
            setAllAds([]);
        }
    }, []);

    useEffect(() => {
        // console.log(allAds.length && allAds[0]._id, ads[0]._id)
        if (loading == false) {
            if (!ads.length) {
                toast({
                    title: "No More Items Found",
                    status: "warning",
                    duration: 3000,
                    isClosable: true,
                    position: "bottom",
                });
                setHideLoadButton(true);
                return;
            }
            setAllAds([...ads, ...allAds]);
        }
    }, [ads])
    console.log("allAds ", allAds, page);
    return (
        <>
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
                        <Button type='submit' isLoading={loading} variant={"solid"} background="green.600" textColor={"white"} _hover={{ background: "green.700" }} _active={{ background: "green.900" }} rightIcon={<AiOutlineSearch />} onClick={() => fetchAds(true)}>
                            Search Items
                        </Button>
                    </div>
                </form>
                {loading &&
                    <div className=' h-[35vh] overflow-hidden'>
                        <ItemsLoading />
                    </div>}
            </div>

            {/* all items */}
            {allAds.length ? <><h1 className="text-white font-bold text-3xl pl-4 mt-10">Fresh recommendations</h1>
                <div className='h-auto  overflow-y-auto flex flex-wrap gap-1 justify-around items-center'>
                    {/* <h1 className='h-12'>hello</h1> */}
                    {allAds.map((obj) => (
                        <Box onClick={() => navigate(`/item/${obj._id}`)} cursor='pointer' to="/me" minW='xs' maxW={'sm'} mt={12} bg={"gray.700"} color={"gray.300"} borderWidth='1px' borderColor={'gray.400'} borderRadius='lg' overflow='hidden'>
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
                                <Box display={"flex"} justifyContent={"space-between"} mt='1' color="gray.100">
                                    <Box fontSize={"large"} fontWeight="bold">
                                        ₹ {obj.price}
                                    </Box>
                                    <Box>
                                        {obj.address.city} | {obj.address.state}
                                    </Box>
                                </Box>
                            </Box>
                        </Box>
                    ))}
                </div>
                <div className={`flex justify-center my-12 `}>
                    <div className={`${hideLoadButton ? "hidden" : "flex"}`}>
                        <Button variant="solid" mx='auto' onClick={() => fetchAds(false)} colorSchema="blue" >Load More</Button>
                    </div>
                </div></> : <h1 className='text-2xl text-white'>No items Found</h1>}

        </>
    )
}

export default AllItems