import { Avatar, Box, Button, Container, Divider, Fade, FormControl, FormLabel, Input, Select, Text, Textarea, useToast, VStack } from '@chakra-ui/react'
import React, { useEffect, useState } from 'react'
import { useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ButtonGhost, MetaData } from '../components/Utility'
import ItemsLoading from '../components/Loading/ItemsLoading';
import axios from "axios"

function AddItem() {
    const [formData, setFormData] = useState({});
    const [sem, setSem] = useState(0);
    const [Course, setCourse] = useState("");
    const [file, setFile] = useState(null);
    const [allImg, setAllImg] = useState([]);
    const [images, setImages] = useState([]);
    const [files, setFiles] = useState([]);
    const [uploadLoading, setUploadLoading] = useState(false);
    const [uploaded, setUploaded] = useState(false);
    const imageMimeType = /image\/(png|jpg|jpeg)/i;
    const toast = useToast();
    const [buttonLoading, setButtonLoading] = useState(false);
    const fileUpload = useRef(null);
    const navigator = useNavigate();
    const handleChange = (e) => {
        const file = e.target.files[0];

        if (!file.type.match(imageMimeType)) {
            toast({
                title: "Image mime type is not valid",
                status: "warning",
                duration: 3000,
                isClosable: true,
                position: "bottom",
            });
            return;
        }
        setFile(file);
    }
    const handleFormData = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    }
    const removeImg = () => {
        // if (allImg.length) {
        setFile(null);
        setAllImg(allImg.filter((i) => (i !== allImg[allImg.length - 1])));
        setFiles(files.filter((i) => (i !== files[files.length - 1])));
        // }
    }
    useEffect(() => {
        let fileReader, isCancel = false;
        if (file) {
            if (file.size > 2000000) {
                toast({
                    title: "Image size sould not exceed 2MB.",
                    status: "warning",
                    duration: 3000,
                    isClosable: true,
                    position: "bottom",
                });
                return;
            }
            fileReader = new FileReader();
            fileReader.onload = (e) => {
                const { result } = e.target;
                if (result && !isCancel) {
                    setAllImg([...allImg, result]);
                    setFiles([...files, file]);
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
    const postImages = async () => {
        setUploadLoading(true);
        for (let i = 0; i < files.length; i++) {
            const imgData = new FormData();
            imgData.append('file', files[i]);
            imgData.append('upload_preset', "CollegeBazaar_Items");
            const { data } = await axios.post('https://api.cloudinary.com/v1_1/dbej3vdgp/image/upload', imgData);
            const result = { url: data.secure_url, public_id: data.public_id };
            images.push(result);
        }
        setUploadLoading(false);
        setUploaded(true);
        return;
    }
    const handleSubmit = async (e) => {
        setButtonLoading(true);
        if (!formData || !formData.name || !formData.description || !formData.course || !formData.semester || !formData.price || !formData.city || !formData.state) {
            toast({
                title: "Please Fill all the Feilds",
                status: "warning",
                duration: 3000,
                isClosable: true,
                position: "bottom",
            });
            setButtonLoading(false);
            return;
        }
        if (!uploaded && !uploadLoading) {
            toast({
                title: "Please Upload Images",
                status: "warning",
                duration: 3000,
                isClosable: true,
                position: "bottom",
            });
            setButtonLoading(false);
            return;
        } else if (!uploaded) {
            toast({
                title: "Please wait images are uploading",
                status: "warning",
                duration: 3000,
                isClosable: true,
                position: "bottom",
            });
            setButtonLoading(false);
            return;
        }
        formData.images = images;
        console.log(formData);
        setButtonLoading(false);
        try {
            const config = {
                headers: {
                    "Content-Type": "multipart/form-data"
                }
            };
            const { data } = await axios.post('/api/adCard/new', formData);
            toast({
                title: `${data.message}`,
                status: "success",
                duration: 3000,
                isClosable: true,
                position: "bottom",
            });
            navigator('/');
            setButtonLoading(false);
            return;
        } catch (error) {
            console.log(error);
            toast({
                title: `${error.response.data.error}`,
                status: "error",
                duration: 3000,
                isClosable: true,
                position: "bottom",
            });
        }
        setButtonLoading(false);
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
                            <VStack spacing="10px">
                                <FormControl id="name" isRequired>
                                    <FormLabel>Title</FormLabel>
                                    <Input
                                        name="name"
                                        type="text"
                                        value={formData && formData.name}
                                        onChange={handleFormData}
                                    />
                                    <Text fontSize="xs" className='font-thin'>Mention the key features of your item (e.g. book name, brand, type)  </Text>
                                </FormControl>
                                <FormControl id="description" isRequired>
                                    <FormLabel>Description</FormLabel>
                                    <Textarea
                                        name="description"
                                        value={formData && formData.description}
                                        onChange={handleFormData}
                                    />
                                    <Text fontSize="xs" className='font-thin'>Include condition, features and reason for selling</Text>
                                </FormControl>
                                <FormControl id="category">
                                    <FormLabel>Category</FormLabel>
                                    <Select name="category" placeholder='  ' Selected value={formData && formData.category}
                                        onChange={handleFormData}>
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
                                    <Select name="course" placeholder='  ' Selected value={formData && formData.course}
                                        onChange={handleFormData}>
                                        <option value="B.Tech" >B.Tech</option>
                                        <option value="BBA">BBA</option>
                                        <option value="MBA">MBA</option>
                                    </Select>
                                </FormControl>
                                <FormControl id="semester" isRequired onChange={handleCourse}>
                                    <FormLabel>Semester</FormLabel>
                                    <Select name="semester" placeholder='  ' Selected value={formData && formData.semester}
                                        onChange={handleFormData}>
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
                            mb={1}>
                            <TextH2 heading={"UPLOAD UP TO 6 PHOTOS"} />
                            <div className='flex flex-wrap space-x-2 p-2 space-y-1'>
                                <Input className='hidden' type="file" id="fileInput" accept='image/*' name="fileInput" ref={fileUpload} onChange={handleChange} />
                                {Array(6).fill(' ').map((_, i) => (
                                    <button type="button" key={i} onClick={!allImg[i] && handleUpload} className={`border-2 ${allImg[i] ? "opacity-100" : "opacity-40"} focus:opacity-100 border-gray-600 h-24 w-24 flex justify-center items-center `}>
                                        {allImg[i] ? <img src={allImg[i]} className="h-[100%] w-[100%]" /> : <svg width="36px" height="36px" viewBox="0 0 1024 1024" data-aut-id="icon" class fill-rule="evenodd">
                                            <path d="M841.099 667.008v78.080h77.568v77.653h-77.568v77.141h-77.568v-77.184h-77.611v-77.611h77.611v-78.080h77.568zM617.515 124.16l38.784 116.437h165.973l38.827 38.827v271.659l-38.827 38.357-38.741-38.4v-232.832h-183.125l-38.784-116.48h-176.853l-38.784 116.48h-183.083v426.923h426.667l38.784 38.357-38.784 39.253h-465.493l-38.741-38.869v-504.491l38.784-38.827h165.973l38.827-116.437h288.597zM473.216 318.208c106.837 0 193.92 86.955 193.92 194.048 0 106.923-87.040 194.091-193.92 194.091s-193.963-87.168-193.963-194.091c0-107.093 87.083-194.048 193.963-194.048zM473.216 395.861c-64.213 0-116.352 52.181-116.352 116.395 0 64.256 52.139 116.437 116.352 116.437 64.171 0 116.352-52.181 116.352-116.437 0-64.213-52.181-116.437-116.352-116.437z"></path>
                                        </svg>}
                                    </button>
                                ))}
                            </div>
                            {!uploaded && allImg[0] && <Button isLoading={uploadLoading} colorScheme='green' m={2} onClick={postImages}>Upload</Button>}
                            {(!uploadLoading && allImg[0] && !images[0]) && <Button colorScheme='red' onClick={removeImg}>Remove Image</Button>}
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
                                    name="price"
                                    type="number"
                                    value={formData && formData.price}
                                    onChange={handleFormData}
                                />
                            </FormControl>
                        </Box>
                        <Divider />
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
                            <FormControl id="state" isRequired>
                                <FormLabel>State</FormLabel>
                                <Select name="state" placeholder='  ' Selected value={formData && formData.state}
                                    onChange={handleFormData}>
                                    <option value="delhi" >Delhi</option>
                                    <option value="haryana">Haryana</option>
                                    <option value="up">Up</option>
                                </Select>
                            </FormControl>
                            <FormControl id="city">
                                <FormLabel>City</FormLabel>
                                <Input
                                    name="city"
                                    type="text"
                                    value={formData && formData.city}
                                    onChange={handleFormData}
                                />
                            </FormControl>
                        </Box>
                        <Divider />
                        {/* <div className='p-2 flex flex-col'> */}
                        <Button variant="solid" w={"100%"} colorScheme="green" isLoading={buttonLoading} type="submit" onClick={handleSubmit} loadingText="It may take few seconds">Post Now</Button>
                        {/* </div> */}
                    </Box>
                </Container>
            </div>
        </>
    )
}

export default AddItem
