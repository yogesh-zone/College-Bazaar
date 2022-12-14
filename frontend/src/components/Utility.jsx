import React from 'react'
import Helmet from "react-helmet";
import { Avatar, Menu, MenuButton, MenuDivider, MenuItem, MenuList, MenuOptionGroup, Toast, useToast } from '@chakra-ui/react'
import { FiLogOut, FiSettings } from 'react-icons/fi'
import { MdOutlineAccountCircle, MdOutlineSell } from 'react-icons/md'
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import { useDispatch, useSelector } from "react-redux"
import { logoutUser } from '../actions/userActions';

export const link = [
    { name: "Home", link: "/" },
    { name: "About Us", link: "/about" },
    { name: "Sell Item", link: "/addItem" },
    { name: "Chats", link: "/chats" }
]
export const AvatarIcon = () => {
    const { user } = useSelector(
        (state) => state.user
    );
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const toast = useToast();
    const logout = () => {
        dispatch(logoutUser());
        toast({
            title: "logout Successful",
            status: "success",
            duration: 3000,
            isClosable: true,
            position: "bottom",
        });
        navigate('/');
    }
    useEffect(() => {
        if (!user) {

        }
    }, [user])
    return (
        <>
            {<Menu isLazy>
                <MenuButton>
                    <Avatar size='md' src={user && user.avatar.url}></Avatar>
                </MenuButton>
                <MenuList color={'black'}>
                    <MenuOptionGroup defaultValue='asc' title={user.name} type='radio'>
                        <MenuDivider />
                        <MenuItem onClick={() => navigate('/me')} icon={<MdOutlineAccountCircle className='text-lg' />}>
                            My Account
                        </MenuItem>
                        <MenuItem onClick={() => navigate('/myads')} icon={<MdOutlineSell className='text-lg' />} display='flex' justifyContent={'center'}>
                            My Ads
                        </MenuItem>
                        <MenuItem onClick={() => navigate('/changePassword')} icon={<FiSettings className='text-lg' />}>
                            Setting
                        </MenuItem>
                        <MenuItem icon={<FiLogOut className='text-lg' />} onClick={() => logout()}>
                            Logout
                        </MenuItem>
                    </MenuOptionGroup>
                </MenuList>
            </Menu>}
        </>
    )
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

