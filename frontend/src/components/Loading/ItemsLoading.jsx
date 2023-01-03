import React from 'react'
import animationData from "../Animations/defaultLoading2.json";
import Lottie from 'react-lottie';
import { lottieOptions } from '../Utility'
function ItemsLoading() {
    return (
        <>
            <Lottie
                options={lottieOptions(animationData)}
                width={150}
                height={150}
                isClickToPauseDisabled={true}
                style={{ cursor: "default" }}
            />
        </>
    )
}

export default ItemsLoading