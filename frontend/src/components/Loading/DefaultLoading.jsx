import React from 'react'
import Lottie from 'react-lottie';
import animationData from "../Animations/404.json";
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
            <div className='mx-auto mt-[15vh] lg:mt-[6vh] text-center lg:h-[72vh] w-[80%] lg:w-[55%]'>
                <Lottie
                    options={defaultOptions}
                    height={"70%"}
                    isClickToPauseDisabled={true}
                    width={"70%"}
                    style={{ position: "relative", cursor: "default" }}
                // style={{ mx: "auto", paddingTop: "10vh", overflow: "auto", cursor: "default" }}
                />
                <h1 className="text-4xl font-bold text-slate-800">Page Not Found!</h1>
            </div>
        </>
    )
}

export default DefaultLoading;