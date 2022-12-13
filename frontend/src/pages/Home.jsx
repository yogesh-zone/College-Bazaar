import React from 'react'
import { useEffect } from 'react';
import axios from "axios"
import AllItems from '../components/AllItems';
import { MetaData } from "../components/Utility"
import Navbar from '../components/Layouts/Navbar';
function Home() {
    return (
        <>
            <MetaData title={"College Bazaar"} />
            <Navbar active={"Home"} />
            <div className="bg-gray-700 -mt-0.5 text-white flex flex-col items-center space-y-2 py-2">
                <p className="h-[2vh] md:h-[5.5vh]"></p>
                <h1 className='text-2xl sm:text-3xl font-bold'>Get Items on College Bazaar</h1>
                <h6 className="text-md text-slate-400">Everything you are looking for!</h6>
            </div>
            <AllItems />
        </>
    )
}

export default Home;