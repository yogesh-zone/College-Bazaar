import { Avatar, Button, Checkbox, Input, useToast } from '@chakra-ui/react';
import React, { useEffect, useRef, useState } from 'react'
import axios from "axios"
import { useDispatch, useSelector } from "react-redux"
import { clearErrors, loadUser, updateUser } from '../actions/userActions';
import { useNavigate } from 'react-router-dom';
import { MetaData } from '../components/Utility';
import Navbar from '../components/Layouts/Navbar';
function Me() {
    const { user, loding, error } = useSelector(
        (state) => state.user
    );

    const dispatch = useDispatch();
    const navigation = useNavigate();
    const toast = useToast();
    const [data, setData] = useState(user);
    const [uploadLoading, setuUploadLoading] = useState(false);
    const [editDetails, setEditDetails] = useState(false);
    const [avatar, setAvatar] = useState(null);
    const [avatarPreview, setAvatarPreview] = useState(user && user.avatar.url);
    const [name, setName] = useState(user && user.name);
    const [phone, setPhone] = useState(user && user.phone.phone);
    const [showPhone, setShowPhone] = useState(user && user.phone.showPhone ? user.phone.showPhone : false);
    const updateUserDetails = (e) => {
        setData({ ...data, [e.target.name]: e.target.value });
    };
    const fileUpload = useRef(null);

    const updateProfileDataChange = async (e) => {
        if (!e.target.files[0]) {
            return;
        }
        const reader = new FileReader();
        reader.onload = () => {
            if (reader.readyState === 2) {
                setAvatarPreview(reader.result);
            }
        };
        setAvatar(e.target.files[0]);
        reader.readAsDataURL(e.target.files[0]);
    };

    const handleUpload = () => {
        fileUpload.current.click();
    }

    const uploadAvatar = async (e) => {
        e.preventDefault();
        if (!avatar) {
            return;
        }
        setuUploadLoading(true);
        try {
            const imgData = new FormData();
            imgData.append('file', avatar);
            imgData.append('upload_preset', "CollegeBazaar_Users");
            const { data } = await axios.post('https://api.cloudinary.com/v1_1/dbej3vdgp/image/upload', imgData);
            const myForm = new FormData();
            myForm.set("public_id", data.public_id)
            myForm.set("url", data.secure_url);
            // const config = { headers: { "Content-Type": "application/json" } };
            await axios.put('/api/user/upload_avatar', myForm);
            console.log("data is ", data);
            dispatch(loadUser());
        } catch (error) {
            console.log('error occured!', error)
        }
        setuUploadLoading(false);
    };

    const submitUserDetails = async () => {
        setEditDetails(false);
        dispatch(updateUser({ name, phone: { phone, showPhone } }));
    }
    useEffect(() => {
        console.log("under effect user", user);
        if (user) {
            setName(user.name);
            setPhone(user.phone.phone);
            setShowPhone(user.phone.showPhone);
            setAvatarPreview(user.avatar.url)
        }

        if (error) {
            toast({
                title: "Error Occured!",
                description: error,
                status: "error",
                duration: 3000,
                isClosable: true,
                position: "bottom",
            });
            dispatch(clearErrors());
        }
    }, [user, error]);
    console.log("userr is ", user);
    return (
        <>
            <MetaData title={"My Account | College Bazaar"} />
            <Navbar active={""} />
            {user &&
                <div className="bg-gray-800 text-white h-[100%] flex md:flex-row flex-col py-12 flex-wrap">
                    <div className="flex justify-center flex-col items-center mx-auto mb-2">
                        <Avatar src={avatarPreview} size='2xl'></Avatar>
                        <form encType="multipart/form-data"
                            onSubmit={uploadAvatar} className='flex flex-col'>
                            <Input multiple={true} className='hidden' type="file" id="fileInput" accept='image/*' name="fileInput" ref={fileUpload} onChange={updateProfileDataChange} />
                            <div className="flex gap-2 mt-2">
                                <Button colorScheme='green' variant='solid' onClick={handleUpload}>Change</Button>
                                <Button type='submit' isLoading={uploadLoading} colorScheme='facebook'>Upload</Button>
                            </div>
                        </form>
                    </div>
                    <div className="flex flex-col justify-start rounded-lg border-[1px] border-slate-400 bg-gray-700 capitalize md:w-[70%] w-[80%]  mx-auto md:ml-auto md:mr-4">
                        <h1 className="m-2 p-2 text-4xl font-medium">general information</h1>
                        <form
                            className="flex p-2 md:justify-around gap-3 items-center flex-col md:flex-row md:flex-wrap"
                            onSubmit={uploadAvatar}
                        >
                            <label className="inline w-[90%] md:w-[45%]">
                                <p className="inline-block">Name:</p>
                                <input
                                    type="text"
                                    name="name"
                                    value={name}
                                    disabled={!editDetails}
                                    onChange={(e) => setName(e.target.value)}
                                    placeholder=""
                                    className={`block focus:outline-none   p-1 w-full rounded-md border-[1px] focus:ring-2 ${editDetails ? "focus:ring-blue-200 bg-gray-800" : "opacity-90 focus:disabled:cursor-not-allowed"} `}
                                />
                            </label>
                            <label className="inline w-[90%] md:w-[45%]">
                                <p className="inline-block">EMAIL:</p>
                                <input
                                    type="text"
                                    name="email"
                                    value={user.email}
                                    disabled
                                    className="block focus:outline-none  focus:disabled:cursor-not-allowed  p-1 w-full rounded-md border-[1px] opacity-90 "
                                />
                            </label>
                            <label className="inline w-[90%] md:w-[45%]">
                                <p className="inline-block">Phone</p>
                                <input
                                    type="number"
                                    name="phone"
                                    value={phone}
                                    onChange={(e) => setPhone(e.target.value)}
                                    disabled={!editDetails}
                                    placeholder="eg:- (+91)0123456789"
                                    className={`block focus:outline-none   p-1 w-full rounded-md border-[1px] focus:ring-2 ${editDetails ? "focus:ring-blue-200 bg-gray-800" : "opacity-90 focus:disabled:cursor-not-allowed"}`}
                                />
                                <Checkbox name="showPhone" defaultChecked={showPhone ? showPhone : false} onChange={(e) => setShowPhone(!showPhone)} borderColor="white" colorScheme='green' mt={2} >
                                    Show phone number to other users
                                </Checkbox>
                            </label>
                            <div className="w-[90%] md:w-[45%]"></div>
                            {!editDetails ?
                                <Button colorScheme='green' display='block' w='90%' onClick={() => setEditDetails(true)} variant='solid' >Edit Details</Button>
                                :
                                <Button colorScheme='green' display='block' w='90%' variant='solid' loding={loding} onClick={submitUserDetails} >Save</Button>}
                        </form>
                    </div>
                </div>}
        </>
    )
}

export default Me