import React from 'react'
import { MdCopyright, MdOutlineMail } from 'react-icons/md'

function Footer() {
    return (
        <div className='bg-black p-2 flex justify-between text-white'>
            <h1 className=" lg:text-lg">College Bazaar</h1>
            <p className="flex justify-center space-x-2 items-center"><MdOutlineMail /> <span>collegebazaaar@gmail.com</span></p>
            <p className="mr-3 flex  space-x-1 items-center"><MdCopyright /><span>all right reserved 2021-2022</span> </p>
        </div>
    )
}

export default Footer