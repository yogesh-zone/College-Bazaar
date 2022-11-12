import React from 'react'
import Helmet from "react-helmet";
import { Avatar, Menu, MenuButton, MenuDivider, MenuItem, MenuList, MenuOptionGroup } from '@chakra-ui/react'
import { FiLogOut, FiSettings } from 'react-icons/fi'
import { MdOutlineAccountCircle, MdOutlineSell } from 'react-icons/md'
import { Link } from 'react-router-dom';
export const link = [
    { name: "Home", link: "/" },
    { name: "About Us", link: "/about" },
    { name: "Sell Item", link: "/addItem" },
    { name: "Chats", link: "/chats" }
]
export const AvatarIcon = () => {
    return (
        <Menu isLazy>
            <MenuButton>
                <Avatar size='md' src="https://res.cloudinary.com/dbej3vdgp/image/upload/v1664949454/College%20Bazaar/cjeindbi6pndzursg5ir.jpg"></Avatar>
            </MenuButton>
            <MenuList color={'black'}>
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
        </Menu>)
}

//metaData
export const MetaData = ({ title }) => {
    return (
        <Helmet>
            <title> {title} </title>
        </Helmet>)
}

// Green Button
export const ButtonSolid = ({ type, path, name, color }) => {
    return (
        <>
            <a
                href={path}
                className={`mx-1 w-[auto] bg-blue-400 hover:text-blue-400 border-blue-400  active:text-blue-600 space-x-3 font-semibold px-5  p-2 border-2 hover:bg-transparent rounded-md text-white capitalize`}
            >{name}</a>
        </>
    );
};

// red button
export const ButtonGhost = ({ path, name }) => {
    return (
        <>
            {path && <Link
                to={path}
                className={`mx-1 w-[auto] bg-transparent hover:bg-blue-400 text-blue-400 border-blue-400 active:text-blue-600 space-x-3 font-semibold px-5  p-2 border-2  hover:text-white rounded-md capitalize`}
            >
                {name}
            </Link>}

        </>
    );
};

