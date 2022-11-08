import { Box, Button, Container, Divider, FormControl, FormLabel, Input, Select, Text, Textarea, VStack } from '@chakra-ui/react'
import React, { useState } from 'react'
import { ButtonGhost, MetaData } from '../components/Utility'
import ItemsLoading from '../Loading/ItemsLoading';

function AddItem() {
    const [name, setName] = useState("");
    const [category, setCategory] = useState("");
    const [Course, setCourse] = useState("");
    const [Semester, setSemester] = useState("");
    const [sem, setSem] = useState(0);
    const [queryLoading, setQueryLoading] = useState(false);
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
    const TextH1 = ({ heading }) => {
        return <h1 className="te text-4xl text-slate-700 font-semibold flex justify-center"> {heading}</h1>
    }
    const TextH2 = ({ heading }) => {
        return <h1 className="my-3 text-xl font-semibold text-slate-700"> {heading}</h1>
    }
    return (
        <>
            <MetaData title={"Add Item"} />
            <div className="Login h-auto overflow-auto">
                <Container maxW="4xl" centerContent>
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
                        <TextH1 heading={"POST YOUR AD"} />
                    </Box>
                    <Box
                        d="flex"
                        justifyContent="center"
                        p={4}
                        bg="gray.100"
                        w="100%"
                        mb={10}
                        borderRadius="lg"
                        borderWidth="1px">
                        <Box
                            d="flex"
                            justifyContent="center"
                            p={3}
                            bg="white"
                            borderRadius="md"
                            w="100%"
                            mb={1}
                        >
                            <TextH2 heading={"INCLUDE SOME DETAILS"} />
                            <VStack spacing="10px">
                                <FormControl id="name" isRequired>
                                    <FormLabel>Title</FormLabel>
                                    <Input
                                        type="text"
                                    />
                                    <Text fontSize="xs" className='font-thin'>Mention the key features of your item (e.g. book name, brand, type)  </Text>
                                </FormControl>
                                <FormControl id="description" isRequired>
                                    <FormLabel>Description</FormLabel>
                                    <Textarea
                                    // value={password}
                                    // onChange={(e) => setPassword(e.target.value)}
                                    // type={show ? "text" : "password"}
                                    // placeholder="Enter password"
                                    />
                                    <Text fontSize="xs" className='font-thin'>Include condition, features and reason for selling</Text>
                                </FormControl>
                                <FormControl id="category">
                                    <FormLabel>Category</FormLabel>
                                    <Select placeholder='  ' Selected>
                                        <option value="Akash">Akash</option>
                                        <option value="Books">Book</option>
                                        <option value="ED">Engineering Drawing</option>
                                        <option value="Electornics">Electornics</option>
                                    </Select>
                                </FormControl>
                            </VStack>
                        </Box>
                        <Divider />
                        <Box
                            d="flex"
                            justifyContent="center"
                            p={3}
                            bg="white"
                            borderRadius="md"
                            w="100%"
                            mb={1}
                        >
                            <TextH2 heading={"Course Details"} />
                            <VStack spacing="10px">
                                <FormControl id="course" isRequired onChange={handleCourse}>
                                    <FormLabel>Course</FormLabel>
                                    <Select placeholder='  ' Selected>
                                        <option value="B.Tech" >B.Tech</option>
                                        <option value="BBA">BBA</option>
                                        <option value="MBA">MBA</option>
                                    </Select>
                                </FormControl>
                                <FormControl id="semester" isRequired onChange={handleCourse}>
                                    <FormLabel>Semester</FormLabel>
                                    <Select placeholder='  ' Selected>
                                        <option value="first" className={sem >= 1 ? "flex m-3" : "hidden"}>I</option>
                                        <option value="second" className={sem >= 2 ? "flex m-3" : "hidden"}>II</option>
                                        <option value="third" className={sem >= 3 ? "flex m-3" : "hidden"}>III</option>
                                        <option value="fourth" className={sem >= 4 ? "flex m-3" : "hidden"}>IV</option>
                                        <option value="fifth" className={sem >= 5 ? "flex m-3" : "hidden"}>V</option>
                                        <option value="sixth" className={sem >= 6 ? "flex" : "hidden"}>VI</option>
                                        <option value="seventh" className={sem >= 7 ? "flex" : "hidden"}>VII</option>
                                        <option value="eighth" className={sem >= 8 ? "flex" : "hidden"}>VIII</option>
                                    </Select>
                                </FormControl>
                            </VStack>
                        </Box>
                        <Divider />
                        <Box
                            d="flex"
                            justifyContent="center"
                            p={3}
                            bg="white"
                            borderRadius="md"
                            w="100%"
                            mb={1}
                        >
                            <TextH2 heading={"SET A PRICE"} />
                            <FormControl id="price" isRequired>
                                <FormLabel>Price</FormLabel>
                                <Input
                                    // value={email}
                                    type="number"
                                // onChange={(e) => setEmail(e.target.value)}
                                />
                            </FormControl>
                        </Box>
                        <Divider />
                        <Box
                            d="flex"
                            justifyContent="center"
                            p={3}
                            bg="white"
                            borderRadius="md"
                            w="100%"
                            mb={1}>
                            <TextH2 heading={"UPLOAD UP TO 6 PHOTOS"} />
                        </Box>
                        <Divider />
                        <Box
                            d="flex"
                            justifyContent="center"
                            p={3}
                            bg="white"
                            borderRadius="md"
                            w="100%"
                            mb={1}
                        >
                            <TextH2 heading={"CONFIRM YOUR LOCATION"} />
                            <FormControl id="location" isRequired>
                                <FormLabel>State</FormLabel>
                                <Select placeholder='  ' Selected>
                                    <option value="B.Tech" >Delhi</option>
                                    <option value="BBA">Haryana</option>
                                    <option value="MBA">Up</option>
                                </Select>
                            </FormControl>
                            <FormControl id="city">
                                <FormLabel>City</FormLabel>
                                <Input
                                    // value={email}
                                    type="text"
                                // onChange={(e) => setEmail(e.target.value)}
                                />
                            </FormControl>
                        </Box>
                        <Divider />
                        <div className='p-2 flex'>
                            <a
                                href="/to"
                                className={`mx-auto w-[auto] bg-blue-400 hover:text-blue-400 border-blue-400  active:text-blue-600 space-x-3 font-semibold px-5  p-2 border-2 hover:bg-transparent rounded-md text-white capitalize`}
                            >Post Now</a>
                        </div>
                    </Box>
                </Container>
            </div>
        </>
    )
}

export default AddItem