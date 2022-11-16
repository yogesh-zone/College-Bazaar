import { Avatar, Button, Drawer, DrawerBody, DrawerCloseButton, DrawerContent, DrawerHeader, DrawerOverlay, Menu, MenuButton, MenuDivider, MenuItem, MenuList, MenuOptionGroup, useDisclosure } from '@chakra-ui/react'
import { IoNotificationsOutline, IoChatbubbleEllipsesOutline } from "react-icons/io5";

// import { FiLogOut, FiSettings } from "react-icons/fi";
import { MdMenu } from "react-icons/md";
import React, { useState } from 'react'
import { AvatarIcon, link } from "../Utility";
import { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
function Navbar() {
    const { isOpen, onOpen, onClose } = useDisclosure();
    const [active, setActive] = useState("");
    const [user, setUser] = useState(false);
    const navigate = useNavigate();
    useEffect(() => {
        // setUser(!user);
    }, [active, user])
    const handleSmNav = (name) => {
        setActive(name);
        onClose();
    }
    return (
        <div className="bg-[#242e34] text-white py-2 px-1 flex justify-between items-center h-[15vh] lg:sticky top-0 z-50">
            {/* nav part 1 -> logo part 2 -> name part 3 -> links  */}
            <Link to="/" className="w-[35%] sm:w-[15%] md:w-[12%] lg:w-[10%] sm:justify-center md:justify-start lg:justify-center  align-middle items-center cursor-pointer  h-[100%] flex p-1 bg-"> <div className="h-full w-full NavLogo bg-cover overflow-auto rounded-md p-2 "></div></Link>
            <Link to='/' className="hidden sm:flex p-2 justify-start sm:justify-center lg:justify-start  text-3xl md:text-4xl lg:text-2xl font-semibold items-center cursor-pointer"> College Bazaar</Link>
            <div className="w-[50%] sm:w-[20%] md:w-[20%] lg:w-[70%] flex p-2 justify-end sm:justify-around items-center lg:justify-between">
                {/* part 1 = all link part2 = notify and menu  */}
                <div className="justify-around items-center hidden lg:flex lg:w-[70%]">
                    {/* <Button colorScheme='cyan' variant='ghost' link="#">Button 1</Button>
                    <Button colorScheme='cyan' variant='ghost' link="#">Button 2</Button>
                    <Button colorScheme='cyan' variant='ghost' link="#">Button 3</Button>
                    <Button colorScheme='cyan' variant='ghost' link="#">Button 4</Button> */}
                    {link.map((obj) => (
                        <Link
                            to={`${obj.name === active ? "#" : obj.link}`}
                            key={obj.name}
                            className={`hover:text-slate-500 text-lg md:transition-all md:duration-100 ${obj.name === active ? "text-slate-500 font-semibold" : "block"
                                }`}
                            onClick={() => setActive(obj.name)}
                        >
                            {obj.name}
                        </Link>
                    ))}
                </div>
                {/*  *** show when user exist****   */}
                {user && <div className=" justify-around items-center px-2 lg:w-[20%] hidden lg:flex ">
                    {/* <div  className="hover:scale-125 duration-150 group relative ">
                        <IoNotificationsOutline className='text-2xl ' />
                        <span className='px-1 bg-red-500 rounded-full text-[10px] -top-1 text-red-500 -right-0 absolute'>o</span>
                    </div> */}
                    <Menu isLazy>
                        <MenuButton>
                            <div className="hover:scale-125 duration-150 group relative ">
                                <IoNotificationsOutline className='text-2xl ' />
                                <span className='px-1 bg-red-500 rounded-full text-[10px] -top-1 text-red-500 -right-0 absolute'>o</span>
                            </div>
                        </MenuButton>
                        <MenuList color={'black'}>
                            <MenuOptionGroup defaultValue='asc' title='Notifications' type='radio'>
                                <MenuDivider />
                                <Link to="/chats" onClick={() => { setActive("Chats") }}>
                                    <MenuItem icon={<Avatar size='sm' src="https://res.cloudinary.com/dbej3vdgp/image/upload/v1664949454/College%20Bazaar/cjeindbi6pndzursg5ir.jpg"></Avatar>}>
                                        Yogesh Balodi
                                    </MenuItem>
                                </Link>
                                <MenuDivider />
                                <Link to="/chats" onClick={() => { setActive("Chats") }}>
                                    <MenuItem icon={<Avatar size='sm' src="https://res.cloudinary.com/dbej3vdgp/image/upload/v1664949454/College%20Bazaar/cjeindbi6pndzursg5ir.jpg"></Avatar>}>
                                        Rahul Kumar
                                    </MenuItem>
                                </Link>
                                <MenuDivider />
                                <Link to="/chats" onClick={() => { setActive("Chats") }}>
                                    <MenuItem icon={<Avatar size='sm' src="https://res.cloudinary.com/dbej3vdgp/image/upload/v1664949454/College%20Bazaar/cjeindbi6pndzursg5ir.jpg"></Avatar>}>
                                        Sumit Das
                                    </MenuItem>
                                </Link>
                                <MenuDivider />
                                <Link to="/chats" onClick={() => { setActive("Chats") }}>
                                    <MenuItem icon={<Avatar size='sm' src="https://res.cloudinary.com/dbej3vdgp/image/upload/v1664949454/College%20Bazaar/cjeindbi6pndzursg5ir.jpg"></Avatar>}>
                                        Vikas Kundra
                                    </MenuItem>
                                </Link>
                            </MenuOptionGroup>
                        </MenuList>
                    </Menu>
                    <Link to="/chats" onClick={() => { setActive("Chats") }} className="hover:scale-125 duration-150 ">
                        <IoChatbubbleEllipsesOutline className='text-2xl' />
                    </Link>
                    <div className=''>
                        <AvatarIcon />
                    </div>
                </div>}

                {/* **** show when no user login on all sm md and lg*/}
                {/* <div className="flex justify-around items-center w-[20%] "> */}
                {/* <ButtonGhost name="sign in" path="/login" /> */}
                {!user && <Button variant="solid" onClick={() => navigate('/login')} color="blue.400" background="transparent" border="solid" _hover={{ background: "blue.500", textColor: "white", borderColor: "blue.400" }} _active={{ background: "transparent" }} >Sign In</Button>}
                {/* <Button colorScheme='cyan' variant='ghost' link="/login"><Link to="/login">Sing in</Link> </Button>
                    <Button colorScheme='cyan' color={'white'} variant='solid' link="#">Sign up</Button> */}
                {/*  */}
                {/* </div> */}

                {/* ***** show when user login on md and sm */}

                <div className='flex justify-around w-[80%] sm:justify-around items-center space-x-3 lg:w-auto lg:hidden'>
                    {user && <div className=''>
                        <AvatarIcon />
                    </div>}
                    {/* <div className="flex justify-center items-center cursor-pointer px-2 w-[40%] md:w-[30%] rounded-lg bg-gray-300 text-slate-700 lg:hidden"> */}
                    <MdMenu className='scale-[250%] bg-white text-black rounded-sm' onClick={onOpen} />
                    {/* </div> */}
                    <Drawer
                        isOpen={isOpen}
                        onClose={onClose}
                        placement='top'

                    >
                        <DrawerOverlay />
                        <DrawerContent
                            background="gray.400"
                            textColor="gray.800" fontSize="lg">

                            <DrawerCloseButton background={"white"} _hover={{ textColor: "black" }} mt={4} />
                            <DrawerHeader display={'flex'} flexDir='col' justifyContent={'center`'} style={{ background: "#242e34" }} textColor={"white"} >
                                <Link to="/" className="w-[15%] sm:w-[10%] md:w-[10%] flex p-1 justify-center  align-middle items-center cursor-pointer"> <div className="h-[100%] w-[100%] NavLogo"></div></Link>
                                <Link to="/" className="w-[60%] sm:w-[80%] md:w-[70%] flex p-1 justify-center lg:justify-start align-top text-2xl md:text-3xl items-center"> College Bazaar</Link>
                                {/* <div className="w-[20%] sm:w-[10%] md:w-[15%] lg:w-[20%] flex p-2 justify-center lg:justify-start align-top text-2xl items-center"> </div> */}
                            </DrawerHeader>

                            <DrawerBody
                                style={{ background: "sky" }}>
                                <div className="flex justify-around items-center flex-col">
                                    {link.map((obj) => (
                                        <Link
                                            to={`${obj.name === active ? "#" : obj.link}`}
                                            key={obj.name}
                                            className={`hover:text-gray-200 md:transition-all my-2 md:duration-100 ${obj.name === active ? "text-slate-200 font-semibold" : ""
                                                }`}
                                            onClick={() => handleSmNav(obj.name)}
                                        >
                                            {obj.name}
                                        </Link>
                                    ))}
                                </div>
                            </DrawerBody>
                        </DrawerContent>
                    </Drawer>
                </div>
            </div>

        </div>
    )
}

export default Navbar

