// import React from 'react'

// function AllItems() {
//     return (
//         <div className='h-[80vh] lg:h-[75vh] '></div>
//     )
// }

// export default AllItems


import { Badge, Box, Button, Image } from '@chakra-ui/react'
import React from 'react'
import { useState } from 'react'
import { useNavigate } from "react-router-dom";
function AllItems() {
    const [value, setValue] = useState(12);
    var s = "BMW 3 Series 320d Luxury Line, 2019, Diesel FEATURED"
    const navigate = useNavigate();
    const [AllItems, setAllItems] = useState([
        { name: "Thar", price: 800000, img: "https://apollo-singapore.akamaized.net/v1/files/1bq83zddj8i-IN/image;s=300x600;q=60", city: "chandighar", state: "punjab" },
        { name: "Honda City", price: 1200000, img: "https://apollo-singapore.akamaized.net/v1/files/q0f1q2phcivi-IN/image;s=300x600;q=60", city: "SECTOR 36 noida", state: "Up" },
        { name: "Honda City", price: 900000, img: "https://apollo-singapore.akamaized.net/v1/files/cmr1qtzx1ezx1-IN/image;s=300x600;q=60", city: "Palam", state: "Delhi" },
        { name: "I 20", price: 950000, img: "https://apollo-singapore.akamaized.net/v1/files/tntq7r9gacx03-IN/image;s=300x600;q=60", city: "Rohini", state: "Delhi" },
        { name: "Hona City", price: 70000, img: "https://apollo-singapore.akamaized.net/v1/files/lo0ajnbqhfh5-IN/image;s=300x600;q=60", city: "Rohini", state: "Delhi" },
        { name: "Hona Biro", price: 30000, img: "https://apollo-singapore.akamaized.net/v1/files/nkfyv12cs30d2-IN/image;s=300x600;q=60", city: "Patna", state: "Bihar" },
    ])
    return (
        <>
            {/* <div className="h-[250px]"></div> */}
            <h1 className="text-white font-bold text-3xl pl-4 mt-10">Fresh recommendations</h1>
            <div className='h-auto  overflow-y-auto flex flex-wrap gap-1 justify-around items-center'>
                {/* <h1 className='h-12'>hello</h1> */}
                {AllItems.map((obj, i) => (
                    <Box onClick={() => navigate(`/${obj.price}`)} cursor='pointer' to="/me" minW='xs' maxW={'sm'} mt={12} bg={"gray.700"} color={"gray.300"} borderWidth='1px' borderRadius='lg' overflow='hidden'>
                        <Box h="250px">
                            <Image src={obj.img} h="100%" w="100%" alt={"property.imageAlt"} />
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
                                {s.slice(0, 45)}{s.length > 45 ? "..." : ""}
                            </Box>
                            <Box display={"flex"} justifyContent={"space-between"} mt='1' color="gray.100">
                                <Box fontSize={"large"} fontWeight="bold">
                                    ₹ {obj.price}
                                </Box>
                                <Box>
                                    {obj.city} | {obj.state}
                                </Box>
                            </Box>
                        </Box>
                    </Box>
                ))}
            </div>
            <div className='flex justify-center my-12'>
                <Button variant="solid" mx='auto' onClick={() => setAllItems([...AllItems, ...AllItems])} colorSchema="blue" >Load More</Button>
            </div>
        </>
    )
}

export default AllItems