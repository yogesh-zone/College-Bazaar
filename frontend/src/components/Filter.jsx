import { Button } from '@chakra-ui/react'
import React, { useState } from 'react'
import { AiOutlineSearch } from 'react-icons/ai'
import ItemsLoading from '../Loading/ItemsLoading';

function Filter() {
    const [name, setName] = useState("");
    const [category, setCategory] = useState("");
    const [Course, setCourse] = useState("");
    const [Semester, setSemester] = useState("");
    const [sem, setSem] = useState(4);
    const [queryLoading, setQueryLoading] = useState(false);
    const handleCourse = (e) => {
        setCourse(e.target.value);
        courseSem(e.target.value);
    }
    const courseSem = (sem) => {
        switch (sem) {
            case "B.Tech":
                setSem(8);
                break;
            case "BBA":
                setSem(6);
                break;
            case "MBA":
                setSem(4);
                break;
            default:
                break;
        }
    }
    const handleSubmit = (e) => {
        e.preventDefault();
        setQueryLoading(true);
        console.log(name, Course, Semester, category);
        setName("");
        setCategory("All");
        setSem(4);
        setCourse("");
        setSemester("");
        setTimeout(() => {
            setQueryLoading(false);
        }, 3000)
        console.log("handling submit form");

    }
    return (
        <>
            <div className=' sticky top-0 lg:top-[15vh] overflow-hidden'>

                <form className='bg-gray-700 flex -mt-0.5 flex-row flex-wrap justify-between lg:justify-around items-center p-3'
                    onSubmit={handleSubmit}>
                    <input
                        value={name}
                        type="text"
                        placeholder="Search by Name.."
                        onChange={(e) => setName(e.target.value)}
                        className="bg-transparent my-1 w-[32%] lg:w-[20%] lg:ml-3 border outline-none text-white focus:bg-gray-600 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 p-2" />


                    <select className="bg-transparent w-[32%] lg:w-[20%] lg:ml-3 md:w-[22%] border outline-none text-white focus:bg-gray-600 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 p-2 "
                        value={Course && Course}
                        onChange={handleCourse}>
                        <option> Course</option>
                        <option value="B.Tech" >B.Tech</option>
                        <option value="BBA">BBA</option>
                        <option value="MBA">MBA</option>
                    </select>
                    <select
                        className="bg-transparent w-[32%] lg:w-[20%] lg:ml-3 md:w-[22%] border outline-none text-white focus:bg-gray-600 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 p-2 "
                        value={Semester && Semester}
                        onChange={(e) => { setSemester(e.target.value) }}>
                        <option >Semester</option>
                        <option value="first" className={sem >= 1 ? "flex m-3" : "hidden"}>I</option>
                        <option value="second" className={sem >= 2 ? "flex m-3" : "hidden"}>II</option>
                        <option value="third" className={sem >= 3 ? "flex m-3" : "hidden"}>III</option>
                        <option value="fourth" className={sem >= 4 ? "flex m-3" : "hidden"}>IV</option>
                        <option value="fifth" className={sem >= 5 ? "flex m-3" : "hidden"}>V</option>
                        <option value="sixth" className={sem >= 6 ? "flex" : "hidden"}>VI</option>
                        <option value="seventh" className={sem >= 7 ? "flex" : "hidden"}>VII</option>
                        <option value="eighth" className={sem >= 8 ? "flex" : "hidden"}>VIII</option>
                    </select>
                    <select
                        placeholder='category'
                        className="bg-transparent w-[32%] lg:w-[20%] lg:ml-3 md:w-[20%] border outline-none text-white focus:bg-gray-600 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 p-2 "
                        value={category && category}
                        onChange={(e) => { setCategory(e.target.value) }}>
                        <option value="All">category</option>
                        <option value="Akash">Akash</option>
                        <option value="Books">Book</option>
                        <option value="ED">Engineering Drawing</option>
                        <option value="Electornics">Electornics</option>
                    </select>
                    <div className='mr-auto ml-2 lg:mr-0 md:ml-0 py-2 lg:py-0'>
                        <Button type='submit' isLoading={queryLoading} variant={"solid"} background="green.600" textColor={"white"} _hover={{ background: "green.700" }} _active={{ background: "green.900" }} rightIcon={<AiOutlineSearch />}>
                            Search Items
                        </Button>
                    </div>
                </form>
                {queryLoading &&
                    <div className='bg-white h-[35vh] overflow-hidden'>
                        <ItemsLoading />
                    </div>}
            </div>

        </>
    )
}

export default Filter