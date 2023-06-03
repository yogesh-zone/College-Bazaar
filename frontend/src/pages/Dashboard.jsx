import { Avatar, Button, useToast } from "@chakra-ui/react";
import React, { useEffect } from "react";
import { useState } from "react";
import Navbar from "../components/Layouts/Navbar";
import { ButtonSolid, MetaData } from "../components/Utility";
import { FiExternalLink } from "react-icons/fi"
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useSelector } from "react-redux";
function DashBoard() {

    const [active, setActive] = useState("approval");
    const [removeLoading, setRemoveLoading] = useState(false);
    const [approveLoading, setApproveLoading] = useState(false);
    const [addLoading, setAddLoading] = useState(false);
    const [selecetedUser, setSelecetedUser] = useState("");
    const [selecetedAd, setSelecetedAd] = useState("");
    const [ads, setAds] = useState(null);
    const [approvalAds, setApprovalAds] = useState(null);
    const [users, setUsers] = useState(null);
    const navigate = useNavigate();
    const toast = useToast();
    const { user } = useSelector(state => state.user)
    const handleAdSearch = async (name) => {
        try {
            const { data } = await axios.post('/api/adCard/admin/all', { name });
            setAds(data.ads);
        } catch (error) {
            toast({
                title: "Error",
                description: error.response.data.error,
                status: "error",
                duration: 3000,
                isClosable: true,
                position: "bottom",
            });
        }
    }

    const handleVerificationAdSearch = async () => {
        try {
            const { data } = await axios.get('/api/adCard/admin/underVerification');
            setApprovalAds(data.ads);
        } catch (error) {
            toast({
                title: "Error",
                description: error.response.data.error,
                status: "error",
                duration: 3000,
                isClosable: true,
                position: "bottom",
            });
        }
    }
    const handleUserSearch = async (name) => {
        try {
            const { data } = await axios.post("/api/user/all_information", { name });
            setUsers(data.user);
        } catch (error) {
            toast({
                title: "Error",
                description: error.response.data.error,
                status: "error",
                duration: 3000,
                isClosable: true,
                position: "bottom",
            });
            setUsers(null);
        }
    }
    useEffect(() => {
        console.log("Fetch all users");
        handleUserSearch("");
        handleAdSearch("");
        handleVerificationAdSearch();
    }, []);

    const removeUser = async (id) => {
        setSelecetedUser(id);
        setRemoveLoading(true);
        try {
            await axios.delete(`api/user/delete_user/${id}`);
            toast({
                title: `delete success!`,
                status: "success",
                duration: 3000,
                isClosable: true,
                position: "bottom",
            });
            handleUserSearch("");
        } catch (error) {
            toast({
                title: "Error",
                description: error.response.data.error,
                status: "error",
                duration: 3000,
                isClosable: true,
                position: "bottom",
            });
        }
        setRemoveLoading(false);
    }
    const makeUserAdmin = async (id) => {
        setSelecetedUser(id);
        setAddLoading(true);
        try {
            await axios.put(`/api/user/update_role/${id}`)
            toast({
                title: `Update success!`,
                status: "success",
                duration: 3000,
                isClosable: true,
                position: "bottom",
            });
            handleUserSearch("");
        } catch (error) {
            toast({
                title: "Error",
                description: error.response.data.error,
                status: "error",
                duration: 3000,
                isClosable: true,
                position: "bottom",
            });
        }
        setAddLoading(false);
    }
    const approveAd = async (id) => {
        setSelecetedAd(id);
        setApproveLoading(true);
        try {
            await axios.put(`/api/adCard/admin/approve/${id}`);
            toast({
                title: `Ad has been Approved`,
                status: "success",
                duration: 3000,
                isClosable: true,
                position: "bottom",
            });
            handleVerificationAdSearch();
        } catch (error) {
            toast({
                title: "Error",
                description: error.response.data.error,
                status: "error",
                duration: 3000,
                isClosable: true,
                position: "bottom",
            });
        }
        setApproveLoading(false);
    }
    const removeAd = async (id) => {
        setSelecetedAd(id);
        setRemoveLoading(true);
        try {
            await axios.delete(`/api/adCard/admin/delete/${id}`)
            toast({
                title: `Ad has been removed`,
                status: "success",
                duration: 3000,
                isClosable: true,
                position: "bottom",
            });
            handleAdSearch("");
        } catch (error) {
            toast({
                title: "Error",
                description: error.response.data.error,
                status: "error",
                duration: 3000,
                isClosable: true,
                position: "bottom",
            });
        }
        setRemoveLoading(false);
    }
    return (
        <>
            <MetaData title={"Admin Dashboard | College Bazaar"} />
            <Navbar active={""} />
            <div className="flex gap-2 h-[82vh]">
                <div className="flex flex-col w-[25%]  items-center justify-start space-y-1 pt-10 bg-gray-700 text-white capitalize">
                    <h1 className="mb-4 pb-2 border-b-[1px] border-white w-full text-center font-semibold text-2xl">
                        dashboard
                    </h1>
                    <p className={`hover:bg-gray-600 text-xl font-bold cursor-pointer min-w-full text-center p-4 transition-all ease-in-out ${active === "allUsers" ? 'bg-gradient-to-t from-gray-400 to-gray-600' : ''}`} onClick={() => { setActive("allUsers") }}>
                        All Users
                    </p>
                    <p className={`hover:bg-gray-600 text-xl font-bold rounded-sm cursor-pointer min-w-full text-center p-4 transition-all ease-in-out ${active === "allAds" ? 'bg-gradient-to-t from-gray-400 to-gray-600' : ''}`} onClick={() => { setActive("allAds") }}>
                        All Ads
                    </p>
                    <p className={`hover:bg-gray-600 text-xl font-bold rounded-sm cursor-pointer min-w-full text-center p-4 transition-all ease-in-out ${active === "approval" ? 'bg-gradient-to-t from-gray-400 to-gray-600' : ''}`} onClick={() => { setActive("approval") }}>
                        Approve Ads
                    </p>
                </div>


                <div className="bg-blue-100 w-[75%] text-center">




                    {/* <!-- All items on college bazaar --> */}
                    {active === "allAds" &&
                        <div className="flex flex-col bg-gray-700 text-white p-4 h-full">
                            <div className="flex justify-between items-center">
                                <h1 className="text-3xl font-semibold mb-8 h-[5%]">
                                    Ads on College Bazaar
                                </h1>
                                <input
                                    // value={adName}
                                    type="text"
                                    placeholder="Search by Name.."
                                    // onChange={(e) => setAdName(e.target.value)}
                                    onKeyDown={(e) => e.key === "Enter" && handleAdSearch(e.target.value)}
                                    className="bg-transparent my-1 w-[32%] lg:w-[20%] lg:ml-3 border outline-none text-white focus:bg-gray-500 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 p-2" />

                            </div>
                            <div className=" overflow-y-auto h-[430px] gap-1 p-1 flex flex-col">
                                {ads ? <>
                                    {ads.map((ad) => (
                                        <div key={ad._id} className="flex bg-gray-800 p-3 h-[150px] w-full rounded-md">
                                            <figure className="h-[100%] w-[20%] rounded-md my-auto flex justify-center bg-gray-600">
                                                <img
                                                    src={ad.images[0].url}
                                                    alt=""
                                                    className="h-full w-auto"
                                                />
                                            </figure>
                                            <div className="flex w-[80%] justify-between pl-4">
                                                <div className="flex flex-col items-start">
                                                    <h1 className="text-xl font-bold">
                                                        {ad.name.slice(0, 30)}{ad.name.length > 30 ? "..." : ""}
                                                    </h1>
                                                    <h3 className="text-lg font-semibold">
                                                        {ad.user.name}
                                                    </h3>
                                                </div>
                                                <div className="mt-auto mb-2 h-full items-center pr-1 flex justify-around gap-4">
                                                    <Button variant='link' colorScheme='cyan' onClick={() => navigate('/')}><FiExternalLink /></Button>
                                                    <Button variant='solid' colorScheme='red' isLoading={ad._id === selecetedAd ? removeLoading : false} onClick={() => removeAd(ad._id)}>Remove From College Bazaar</Button>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </> : <><div className="text-white text-2xl my-auto">No Ad Found</div></>}
                            </div>
                        </div>}


                    {/* <!-- All items unden verification  --> */}
                    {active === "approval" &&
                        <div className="flex flex-col bg-gray-700 text-white p-4 h-full">
                            <div className="flex justify-between items-center">
                                <h1 className="text-3xl font-semibold mb-8 h-[5%]">
                                    Ads under verification
                                </h1>
                            </div>
                            <div className=" overflow-y-auto h-[430px] gap-1 p-1 flex flex-col">
                                {approvalAds ? <>
                                    {approvalAds.map((ad) => (
                                        <div key={ad._id} className="flex bg-gray-800 p-3 h-[150px] w-full rounded-md">
                                            <figure className="h-[100%] w-[20%] rounded-md my-auto flex justify-center bg-gray-600">
                                                <img
                                                    src={ad.images[0].url}
                                                    alt=""
                                                    className="h-full w-auto"
                                                />
                                            </figure>
                                            <div className="flex w-[80%] justify-between pl-4">
                                                <div className="flex flex-col items-start">
                                                    <h1 className="text-xl font-bold">
                                                        {ad.name.slice(0, 30)}{ad.name.length > 30 ? "..." : ""}
                                                    </h1>
                                                    <h3 className="text-lg font-semibold">
                                                        {ad.user.name}
                                                    </h3>
                                                </div>
                                                <div className="mt-auto mb-2 h-full items-center pr-1 flex justify-around gap-4">
                                                    <Button variant='link' colorScheme='cyan' onClick={() => navigate(`/item/${ad._id}`)}><FiExternalLink /></Button>
                                                    <Button variant='solid' colorScheme='green' isLoading={ad._id === selecetedAd ? approveLoading : false} onClick={() => approveAd(ad._id)}>Approve</Button>
                                                    <Button variant='solid' colorScheme='red' isLoading={ad._id === selecetedAd ? removeLoading : false} onClick={() => removeAd(ad._id)}>Remove </Button>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </> : <><div className="text-white text-2xl my-auto">No Ad Found</div></>}
                            </div>
                        </div>}



                    {/* All User on Bhojan  */}
                    {active === "allUsers" &&
                        <div className="flex flex-col bg-gray-700 text-white p-4 h-full">
                            <div className="flex justify-between items-center">
                                <h1 className="text-3xl font-semibold mb-8 h-[5%]">
                                    Users on College Bazaar
                                </h1>
                                <input
                                    // value={adName}
                                    type="text"
                                    placeholder="Search by Name.."
                                    // onChange={(e) => setAdName(e.target.value)}
                                    onKeyDown={(e) => e.key === "Enter" && handleUserSearch(e.target.value)}
                                    className="bg-transparent my-1 w-[32%] lg:w-[20%] lg:ml-3 border outline-none text-white focus:bg-gray-500 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 p-2" />

                            </div>
                            <div className="overflow-y-auto gap-1 h-[430px] p-1 flex flex-col">
                                {users ? <>
                                    {users.map((obj) => (
                                        <div key={obj._id} className={`${user && user._id === obj._id ? "hidden" : "flex"} bg-gray-800 justify-between items-center p-3 h-[100px] w-full rounded-md`}>
                                            <div className="flex items-center">
                                                <Avatar size={'lg'} src={obj.avatar.url}></Avatar>
                                                <div className=" flex flex-col items-start pl-4">
                                                    <h1 className="text-xl font-bold">
                                                        {obj.name}
                                                    </h1>
                                                    <h3 className="text-lg font-semibold">
                                                        {obj.email}
                                                    </h3>
                                                </div>
                                            </div>
                                            <div className=" flex justify-around space-x-6">
                                                <Button variant='solid' colorScheme='cyan' isLoading={obj._id === selecetedUser ? addLoading : false} onClick={() => makeUserAdmin(obj._id)}>{obj.role ? "Revoke Admin" : "Make Admin"}</Button>
                                                <Button variant='solid' colorScheme='red' isLoading={obj._id === selecetedUser ? removeLoading : false} onClick={() => removeUser(obj._id)}>Remove User</Button>
                                            </div>
                                        </div>
                                    ))}

                                </> :
                                    <><div className="text-white my-auto text-2xl">No User Found</div></>
                                }

                            </div>
                        </div>
                    }
                </div>
            </div>
        </>
    );
}

export default DashBoard;
