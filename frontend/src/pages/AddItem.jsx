import { Avatar, Box, Button, Container, Divider, FormControl, FormLabel, Input, Select, Text, Textarea, VStack } from '@chakra-ui/react'
import React, { useEffect, useState } from 'react'
import { useRef } from 'react';
import { Link } from 'react-router-dom';
import { ButtonGhost, MetaData } from '../components/Utility'
import ItemsLoading from '../Loading/ItemsLoading';

function AddItem() {
    const [name, setName] = useState("");
    const [category, setCategory] = useState("");
    const [Course, setCourse] = useState("");
    const [Semester, setSemester] = useState("");
    const [sem, setSem] = useState(0);
    const [buttonLoading, setButtonLoading] = useState(false);

    const [file, setFile] = useState(null);
    const [files, setFiles] = useState([]);
    const [allImg, setAllImg] = useState([]);
    const imageMimeType = /image\/(png|jpg|jpeg)/i;

    const fileUpload = useRef(null);

    const totalImg = [0, 1, 2, 3, 4, 5];
    const handleChange = (e) => {
        const file = e.target.files[0];
        if (!file.type.match(imageMimeType)) {
            alert("Image mime type is not valid");
            return;
        }
        setFile(file);
    }
    const removeImg = () => {
        if (files.length) {
            setAllImg(allImg.filter((i) => (i !== allImg[allImg.length - 1])));
            setFiles(files.filter((i) => (i !== files[files.length])));
        }
    }
    useEffect(() => {
        let fileReader, isCancel = false;
        if (file) {
            fileReader = new FileReader();
            fileReader.onload = (e) => {
                const { result } = e.target;
                if (result && !isCancel) {
                    setAllImg(allImg.concat(result));
                    setFiles(files.concat(file));
                }
            }
            fileReader.readAsDataURL(file);
        }
        return () => {
            isCancel = true;
            if (fileReader && fileReader.readyState === 1) {
                fileReader.abort();
            }
        }

    }, [file]);
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
    const handleUpload = () => {
        fileUpload.current.click();
    }
    const handleSubmit = (e) => {
        setButtonLoading(true);
        setTimeout(() => {
            setButtonLoading(false);
        }, 2000)
        console.log("handle submit", e);
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
            <div className="bg-gray-600 h-auto overflow-auto">
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
                            <VStack spacing="10px" onSubmit={handleSubmit}>
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
                            {/* <FormControl id="upload" isRequired> */}
                            {/* <FormLabel>Title</FormLabel> */}
                            <div className='flex flex-wrap space-x-2 p-2 space-y-1'>
                                <Input className='hidden' type="file" id="fileInput" accept='image/*' name="fileInput" ref={fileUpload} onChange={handleChange} />
                                {totalImg.map((i) => (
                                    <button type="button" key={i} onClick={allImg[i] ? "" : handleUpload} className={`border-2 ${allImg[i] ? "opacity-100" : "opacity-40"} focus:opacity-100 border-gray-600 h-24 w-24 flex justify-center items-center `}>
                                        {allImg[i] ? <img src={allImg[i]} className="h-[100%] w-[100%]" /> : <svg width="36px" height="36px" viewBox="0 0 1024 1024" data-aut-id="icon" class fill-rule="evenodd">
                                            <path d="M841.099 667.008v78.080h77.568v77.653h-77.568v77.141h-77.568v-77.184h-77.611v-77.611h77.611v-78.080h77.568zM617.515 124.16l38.784 116.437h165.973l38.827 38.827v271.659l-38.827 38.357-38.741-38.4v-232.832h-183.125l-38.784-116.48h-176.853l-38.784 116.48h-183.083v426.923h426.667l38.784 38.357-38.784 39.253h-465.493l-38.741-38.869v-504.491l38.784-38.827h165.973l38.827-116.437h288.597zM473.216 318.208c106.837 0 193.92 86.955 193.92 194.048 0 106.923-87.040 194.091-193.92 194.091s-193.963-87.168-193.963-194.091c0-107.093 87.083-194.048 193.963-194.048zM473.216 395.861c-64.213 0-116.352 52.181-116.352 116.395 0 64.256 52.139 116.437 116.352 116.437 64.171 0 116.352-52.181 116.352-116.437 0-64.213-52.181-116.437-116.352-116.437z"></path>
                                        </svg>}
                                        {console.log(i, allImg[i])}
                                    </button>
                                ))}
                            </div>
                            <button className={`mx-1 w-[auto] bg-blue-400 hover:text-blue-400 border-blue-400  active:text-blue-600 space-x-3 font-semibold px-5  p-2 border-2 hover:bg-transparent rounded-md text-white capitalize`} onClick={removeImg}>Remove Image</button>
                            <img src={"https://blog.logrocket.com/wp-content/uploads/2022/09/logrocket-logo-frontend-analytics.png"} alt="preview" />
                            {/* </FormControl> */}
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
                        <div className='p-2 flex flex-col'>
                            <Button variant="solid" colorScheme="green" isLoading={buttonLoading} onClick={handleSubmit} loadingText="It may take few seconds">Post Now</Button>
                        </div>
                    </Box>
                </Container>
            </div>
        </>
    )
}

export default AddItem