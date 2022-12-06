import { useToast } from '@chakra-ui/react'
import axios from 'axios';
import React, { useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { REGISTER_USER_FAILS, REGISTER_USER_SUCCESS } from '../constants';
import { useDispatch, useSelector } from 'react-redux';

export const ActivatonPage = () => {
    const { activation_token } = useParams();
    console.log(activation_token);
    const navigate = useNavigate();
    const toast = useToast();
    const dispatch = useDispatch();
    const { isAuthenticated } = useSelector(
        (state) => state.user
    );
    const sendToken = async () => {
        try {
            const { data } = await axios.post(
                `/api/user/activation/${activation_token}`,
            );
            console.log("user on auth page ", data);
            dispatch({ type: REGISTER_USER_SUCCESS, payload: data.user });
            toast({
                title: data.message,
                status: "success",
                duration: 3000,
                isClosable: true,
                position: "bottom",
            });
            navigate('/');
            return;
        } catch (error) {
            console.log("error on auth page is ", error.response.data.error)
            dispatch({
                type: REGISTER_USER_FAILS,
                payload: error.response.data.error,
            });
            toast({
                title: error.response.data.error,
                status: "error",
                duration: 3000,
                isClosable: true,
                position: "bottom",
            });
            navigate('/');
            return;
        }
    }
    useEffect(() => {
        if (isAuthenticated) {
            console.log("auth vala")
            navigate('/');
        }

        if (!isAuthenticated && activation_token !== ":activation_token") {
            console.log("sendToken() vala")
            sendToken();
        }
    }, [isAuthenticated]);


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
