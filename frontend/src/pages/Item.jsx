import { Avatar, Button, Spinner, useToast } from '@chakra-ui/react';
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Navigate, useNavigate, useParams } from 'react-router-dom'
import { selecetedChat } from '../actions/chatAction';
import { getAnItem } from '../actions/itemAction';
import Navbar from '../components/Layouts/Navbar';
import ProfileModal from '../components/Miscellaneous/ProfileModel';
import { MetaData } from '../components/Utility';
const Item = () => {
    const { ad, loading, error } = useSelector(state => state.ad);
    const { user } = useSelector(state => state.user);
    const [showImage, setShowImage] = useState(null)
    const params = useParams();
    const { id } = params;
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const toast = useToast();

    const handleChat = (id) => {
        if (!user) {
            toast({
                title: "Please sign in to access resource",
                status: "error",
                duration: 3000,
                isClosable: true,
                position: "bottom",
            });
            navigate('/login')
            return;
        }
        if (user._id === id) {
            toast({
                title: "This ad is posted by you",
                status: "error",
                duration: 3000,
                isClosable: true,
                position: "bottom",
            });
            return;
        } else {
            dispatch(selecetedChat(null, id))
            navigate('/chats')
        }
    }

    useEffect(() => {
        dispatch(getAnItem(id));
    }, [])
    useEffect(() => {
        if (error) {

        }
    }, [ad, error]);

    return (
        <>
            <MetaData title={"Ad | College Bazaar"} />
            <Navbar active={""} />
            {loading && "loading...."}
            {ad &&
                <div className="flex justify-between px-2 mt-2 flex-col gap-2 text-gray-100">
                    <div className='flex md:h-[470px] justify-between flex-col gap-2 md:flex-row'>
                        <div className='md:w-[62%] rounded-md overflow-hidden flex flex-col justify-center items-center'>
                            <div className="h-[500px] md:h-[80%] w-full bg-gray-900 flex justify-center overflow-hidden">
                                <img src={showImage != null ? showImage : ad.images[0].url} alt='ad.image' className="h-full w-auto" />
                            </div>
                            <div className="bg-gray-600 w-full h-[20%] items-center flex justify-start gap-3 p-2 flex-wrap">
                                {ad.images.map((_, i) => (
                                    <button type="button" key={i} className={`border-2 focus:opacity-100 border-gray-400 h-20 w-20 flex justify-center items-center `} onClick={() => setShowImage(_.url)}>
                                        <img src={_.url} className="h-[100%] w-[100%]" />
                                    </button>
                                ))}
                            </div>
                        </div>
                        <div className='md:w-[37%] rounded-md overflow-hidden  flex flex-col gap-3'>
                            <div className="flex flex-col md:h-[30%] rounded-md overflow-hidden p-1 bg-gray-500 ">
                                <h1 className="text-2xl my-1 font-semibold ">Price</h1>
                                <div className="p-1 h-full flex flex-col text-white justify-between bg-gray-600">
                                    <div className="font-bold text-2xl">₹ {ad.price}</div>
                                    <div className="font-light">{ad.createdAt.slice(8, 10) + "-" + ad.createdAt.slice(5, 7) + "-" + ad.createdAt.slice(0, 4)}</div>
                                </div>
                            </div>
                            <div className="flex flex-col md:h-[40%] rounded-md overflow-hidden p-1 bg-gray-500 ">
                                <h1 className="text-2xl my-1 font-semibold">Seller Description</h1>
                                <div className="p-1 h-full flex flex-col justify-between bg-gray-600 text-white">
                                    <div className="flex justify-start gap-5 p-2 items-center">
                                        {/* <Avatar size={"lg"} src={ad.user.avatar.url} m={2}></Avatar>
                                         */}
                                        <ProfileModal user={ad.user} />
                                        <h1 className="text-xl font-semibold">{ad.user.name}</h1>
                                    </div>
                                    <Button variant={'solid'} colorScheme='gray' color={'black'} onClick={() => handleChat(ad.user._id)}>Chat with Seller</Button>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="flex flex-col p-2 bg-gray-500 rounded-md overflow-hidden ">
                        <h1 className="text-2xl my-1 font-semibold">Details</h1>
                        <div className="flex flex-col md:flex-row bg-gray-600 p-2 text-white justify-around">
                            <div className="p-1 flex items-center md:gap-2 flex-row md:flex-col  justify-between w-[80%] sm:w-[60%] md:w-auto mx-auto md:mx-0 ">
                                <div className="">course</div>
                                <div className="">{ad.course}</div>
                            </div>
                            <div className="p-1 flex items-center md:gap-2 flex-row md:flex-col justify-between w-[80%] sm:w-[60%] md:w-auto mx-auto md:mx-0">
                                <div className="">semester</div>
                                <div className="">{ad.semester}</div>
                            </div>
                            <div className="p-1 flex items-center md:gap-2 flex-row md:flex-col justify-between w-[80%] sm:w-[60%] md:w-auto mx-auto md:mx-0">
                                <div className="">category</div>
                                <div className="">{ad.Category}</div>
                            </div>
                            <div className="p-1 flex items-center md:gap-2 flex-row md:flex-col justify-between w-[80%] sm:w-[60%] md:w-auto mx-auto md:mx-0">
                                <div className="">Loaction</div>
                                <div className="">{ad.address.city} | {ad.address.state}</div>
                            </div>
                        </div>
                    </div>
                    <div className="flex flex-col p-2 bg-gray-500 rounded-md overflow-hidden ">
                        <h1 className="text-2xl my-1 font-semibold">Description</h1>
                        <h1 className="p-2 text-lg text-white bg-gray-600">
                            {ad.description}
                        </h1>
                    </div>
                </div>}
        </>
    )
}

export default Item