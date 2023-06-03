import { Avatar, Button, Checkbox, Input, useToast } from '@chakra-ui/react';
import React, { useEffect, useRef, useState } from 'react'
import axios from "axios"
import { useDispatch, useSelector } from "react-redux"
import { clearErrors, loadUser, updateUser } from '../actions/userActions';
import { useNavigate } from 'react-router-dom';
import { MetaData } from '../components/Utility';
import Navbar from '../components/Layouts/Navbar';

function ResetPassword() {
    const { user, error } = useSelector(
        (state) => state.user
    );

    const dispatch = useDispatch();
    const toast = useToast();
    const [uploadLoading, setuUploadLoading] = useState(false);
    const [avatar, setAvatar] = useState(null);
    const [avatarPreview, setAvatarPreview] = useState(user && user.avatar.url);
    const fileUpload = useRef(null);
    const [oldPassword, setOldPassword] = useState("")
    const [newPassword, setNewPassword] = useState("")
    const [confirmPassword, setConfirmPassword] = useState("")
    const [loading, setLoading] = useState(false)
    const navigator = useNavigate();
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
            toast({
                title: "Error Occured!",
                description: error.response.data.error,
                status: "error",
                duration: 3000,
                isClosable: true,
                position: "bottom",
            });
        }
        setuUploadLoading(false);
    };

    const submitUserDetails = async () => {
        setLoading(true);
        try {
            if (!oldPassword || !newPassword || !confirmPassword) {
                toast({
                    title: "Please fill in all details",
                    status: "warning",
                    duration: 3000,
                    isClosable: true,
                    position: "bottom",
                });
                setLoading(false);
                return;
            }
            if (newPassword === oldPassword) {
                toast({
                    title: "Please set a different password",
                    status: "warning",
                    duration: 3000,
                    isClosable: true,
                    position: "bottom",
                });
                setNewPassword('');
                setConfirmPassword('');
                setLoading(false);
                return;
            }
            if (newPassword !== confirmPassword) {
                toast({
                    title: "Password does not match",
                    status: "warning",
                    duration: 3000,
                    isClosable: true,
                    position: "bottom",
                });
                setNewPassword('');
                setConfirmPassword('');
                setLoading(false);
                return;
            }
            await axios.put('/api/user/updatePassword', { oldPassword, newPassword })
            toast({
                title: "Password changed successfully",
                status: "success",
                duration: 3000,
                isClosable: true,
                position: "bottom",
            });
            navigator('/');
        } catch (error) {
            toast({
                title: error.response.data.error,
                status: "error",
                duration: 3000,
                isClosable: true,
                position: "bottom",
            });
        }
        setLoading(false);
    }
    useEffect(() => {
        if (user) {
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
            <MetaData title={"Reset Password | College Bazaar"} />
            <Navbar active={""} />
            {user &&
                <div className="bg-gray-800 text-white  flex md:flex-row flex-col py-12 flex-wrap">
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
                        <h1 className="m-2 p-2 text-4xl font-medium">reset password</h1>
                        <form
                            className="flex p-2 md:justify-around gap-3 items-center flex-col md:flex-row md:flex-wrap"
                        >
                            <label className="inline w-[90%] md:w-[45%]">
                                <p className="inline-block">old password:</p>
                                <input
                                    type="password"
                                    name="old password"
                                    value={oldPassword}
                                    onChange={(e) => setOldPassword(e.target.value)}
                                    placeholder="enter your current password"
                                    className={`block focus:outline-none   p-1 w-full rounded-md border-[1px] focus:ring-2 focus:ring-blue-200 bg-gray-800 `}
                                />
                            </label>
                            <label className="inline w-[90%] md:w-[45%]">
                                <p className="inline-block">New Password:</p>
                                <input
                                    type="password"
                                    name="New Password"
                                    value={newPassword}
                                    placeholder="set your new password"
                                    onChange={(e) => setNewPassword(e.target.value)}
                                    className={`block focus:outline-none   p-1 w-full rounded-md border-[1px] focus:ring-2 focus:ring-blue-200 bg-gray-800 `}
                                />
                            </label>
                            <label className="inline w-[90%] md:w-[45%]">
                                <p className="inline-block">Confirm Password:</p>
                                <input
                                    type="text"
                                    name="Confirm Password" value={confirmPassword}
                                    onChange={(e) => setConfirmPassword(e.target.value)}
                                    placeholder="Confirm Password.."
                                    className={`block focus:outline-none   p-1 w-full rounded-md border-[1px] focus:ring-2 focus:ring-blue-200 bg-gray-800 `}
                                />
                            </label>
                            <div className="w-[90%] md:w-[45%]"></div>
                            {/* <Button colorScheme='green' display='block' w='90%' variant='solid' isLoading={loading} onClick={submitUserDetails} >Reset Password</Button> */}
                            <Button isLoading={loading} w='90%' colorScheme='green' onClick={submitUserDetails}>Reset Password</Button>
                        </form>
                    </div>
                </div>}
        </>
    )
}

export default ResetPassword