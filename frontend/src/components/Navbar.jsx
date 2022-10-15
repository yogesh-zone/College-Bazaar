import { Avatar, Button, Drawer, DrawerBody, DrawerCloseButton, DrawerContent, DrawerHeader, DrawerOverlay, Menu, MenuButton, MenuDivider, MenuItem, MenuList, MenuOptionGroup, useDisclosure } from '@chakra-ui/react'
import { IoNotificationsOutline, IoChatbubbleEllipsesOutline } from "react-icons/io5";
import { FiLogOut, FiSettings } from "react-icons/fi";
import { MdOutlineSell, MdOutlineAccountCircle, MdMenu } from "react-icons/md";
import React from 'react'
function Navbar() {
    const { isOpen, onOpen, onClose } = useDisclosure();
    return (
        <div className="bg-blue-400 py-2 px-1 flex justify-between">
            {/* nav part 1 -> logo part 2 -> name part 3 -> links  */}
            <div className="w-[20%] sm:w-[10%] md:w-[20%] lg:w-[10%] flex p-2 justify-center  align-middle bg-red-400 items-center"> logoo</div>
            <div className="w-[60%] sm:w-[80%] md:w-[80%] lg:w-[20%] flex p-2 justify-center lg:justify-start align-top bg-green-400 text-2xl items-center"> college bazaar</div>
            <div className="w-[20%] sm:w-[10%] md:w-[20%] lg:w-[80%] flex p-2  align-middle bg-gray-400 justify-end lg:justify-between">
                {/* part 1 all link part2 notify and menu  */}
                <div className="justify-around items-center hidden lg:flex lg:w-[70%]">
                    <Button colorScheme='teal' variant='ghost' link="#">Button 1</Button>
                    <Button colorScheme='teal' variant='ghost' link="#">Button 2</Button>
                    <Button colorScheme='teal' variant='ghost' link="#">Button 3</Button>
                    <Button colorScheme='teal' variant='ghost' link="#">Button 4</Button>
                </div>
                {/*  *** show when user exist****   */}
                <div className=" justify-around items-center px-2 lg:w-[20%] hidden lg:flex">
                    <div className="hover:scale-125 duration-150 group relative ">
                        <IoNotificationsOutline className='text-2xl ' />
                        <span className='px-1 bg-red-500 rounded-full text-[10px] -top-1 -right-0 absolute text-gray-300'>1</span>
                    </div>
                    <div className="hover:scale-125 duration-150 ">
                        <IoChatbubbleEllipsesOutline className='text-2xl' />
                    </div>
                    <div className="">
                        <Menu isLazy>
                            <MenuButton>
                                <Avatar size='md' src="https://res.cloudinary.com/dbej3vdgp/image/upload/v1664949454/College%20Bazaar/cjeindbi6pndzursg5ir.jpg"></Avatar>
                            </MenuButton>
                            <MenuList>
                                <MenuOptionGroup defaultValue='asc' title='Name of the user' type='radio'>
                                    <MenuDivider />
                                    <MenuItem icon={<MdOutlineAccountCircle className='text-lg' />}>
                                        My Account
                                    </MenuItem>
                                    <MenuItem icon={<MdOutlineSell className='text-lg' />} display='flex' justifyContent={'center'}>
                                        My Ads
                                    </MenuItem>
                                    <MenuItem icon={<FiSettings className='text-lg' />}>
                                        Setting
                                    </MenuItem>
                                    <MenuItem icon={<FiLogOut className='text-lg' />}>
                                        Logout
                                    </MenuItem>
                                </MenuOptionGroup>
                            </MenuList>
                        </Menu>
                    </div>
                </div>
                {/* **** show when no user login on all sm md and lg*/}
                <div className="flex justify-around items-center w-[20%] hidden">
                    <Button colorScheme='teal' variant='ghost' link="#">Sing in</Button>
                    <Button colorScheme='teal' variant='solid' link="#">Sign up</Button>
                    {/*  */}
                </div>
                {/* ***** show when user login on md and sm */}
                <div className="flex justify-center items-center px-2 lg:w-[7%] rounded-lg bg-gray-300 text-slate-700 lg:hidden">
                    <MdMenu className='s scale-[205%]' onClick={onOpen} />
                </div>
                <Drawer
                    isOpen={isOpen}
                    onClose={onClose}
                    placement='top'
                >
                    <DrawerOverlay />
                    <DrawerContent>
                        <DrawerCloseButton />
                        <DrawerHeader display={'flex'} flexDir='col' justifyContent={'center`'} >
                            <div className="w-[30%] sm:w-[10%] md:w-[20%] lg:w-[10%] flex p-2 justify-center  align-middle bg-red-400 items-center"> logoo</div>
                            <div className="w-[40%] sm:w-[80%] md:w-[80%] lg:w-[20%] flex p-2 justify-center lg:justify-start align-top bg-green-400 text-2xl items-center"> college bazaar</div>
                        </DrawerHeader>

                        <DrawerBody>
                            <div className="flex justify-around items-center flex-col">
                                <Button colorScheme='teal' variant='ghost' link="#">Button 1</Button>
                                <Button colorScheme='teal' variant='ghost' link="#">Button 2</Button>
                                <Button colorScheme='teal' variant='ghost' link="#">Button 3</Button>
                                <Button colorScheme='teal' variant='ghost' link="#">Button 4</Button>
                            </div>
                        </DrawerBody>
                    </DrawerContent>
                </Drawer>
            </div>
        </div>
    )
}

export default Navbar

