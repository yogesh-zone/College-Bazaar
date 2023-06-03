import React from 'react'
import Lottie from 'react-lottie';
import { Link } from 'react-router-dom';
import animationData from "../Animations/4044.json";
function DefaultLoading() {
    const defaultOptions = {
        loop: true,
        autoplay: true,
        animationData: animationData,
        rendererSettings: {
            preserveAspectRatio: "xMidYMid slice",
        },
    };
    return (
        <>

            <div className=" bg-white h-full flex flex-col justify-center items-center w-full absolute top-0">
                <div className='p-2 text-center '>
                    <Lottie
                        options={defaultOptions}
                        height={"50%"}
                        isClickToPauseDisabled={true}
                        width={"100%"}
                        style={{ position: "relative", cursor: "default" }}
                    />
                    <h1 className="text-4xl font-bold text-gray-700">Page Not Found!</h1>
                    <Link to='/' className="text-xl font-bold text-blue-600">Click here to redirect</Link>
                </div>
            </div>
        </>
    )
}

export default DefaultLoading;