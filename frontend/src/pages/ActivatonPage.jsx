import { useToast } from '@chakra-ui/react'
import axios from 'axios';
import React, { useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

export const ActivatonPage = () => {
    const { activation_token } = useParams();
    console.log(activation_token);
    const navigate = useNavigate();
    const toast = useToast();

    const sendToken = async () => {
        try {
            const { data } = await axios.post(
                `/api/user/activation/${activation_token}`,
            );
            toast({
                title: data.message,
                status: "success",
                duration: 5000,
                isClosable: true,
                position: "bottom",
            });
        } catch (error) {
            toast({
                title: error.response.data.message,
                status: "error",
                duration: 5000,
                isClosable: true,
                position: "bottom",
            });
        }

    }
    useEffect(() => {
        if (activation_token !== ":activation_token") {
            sendToken();
            navigate('/');
        }
    },)

    return (
        <div className='flex flex-col justify-center items-center  min-h-[250px]'>
            {activation_token === ":activation_token" ?
                <>
                    <h2 className="text-2xl font-extabold tracking-tighter">An Activation Link is Sent to Your Email</h2>
                    <h2 className="text-2xl font-extabold tracking-tighter">Please Check your Email</h2>
                </> :
                <><h2 className="text-2xl font-extabold tracking-tighter">We are Verifying your Account</h2>
                    <h2 className="text-2xl font-extabold tracking-tighter">Please Wait.</h2></>}
        </div>
    )
}
