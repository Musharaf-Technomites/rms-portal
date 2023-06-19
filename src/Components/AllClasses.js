import React, { useState, useEffect } from 'react'
import SideBar from '../Components/SideBar'
import { BrowserRouter, Routes, Route } from "react-router-dom"
import { BaseUrl } from '../Constants/BaseUrl'
import * as AiIcon from "react-icons/io"
import * as AiiIcon from "react-icons/ai"
import * as TiIcon from "react-icons/ti"
import moment from 'moment'


const AllClasses = () => {
    const [allClasses, setAllClasses] = useState([])
    const [search, setSearch] = useState("")
    const [create, setCreate] = useState(false)

    const GetAllClasses = () => {
        var requestOptions = {
            method: 'GET',
            redirect: 'follow'
        };

        fetch(`${BaseUrl}class/api/getAllClasses`, requestOptions)
            .then(response => response.json())
            .then(result => {
                if (result.status === "Success") {
                    setAllClasses(result?.data)
                }
            })
            .catch(error => console.log('error', error));
    }
    useEffect(() => {
        GetAllClasses()
    }, [])

    return (
        <div className="w-full h-screen bg-back bg-cover flex items-center">
            <div className="w-full h-screen bg-opacityBgColor flex">
                <div className="mt-2">
                    <SideBar />
                </div>
                <div className={"w-100 overflow-auto bg-glass  ml-4 mr-4 mt-2.5 mb-8 rounded-3xl"}>
                    <div className={"w-100 overflow-auto bg-glass  ml-4 mr-4 mt-2.5 mb-8 rounded-3xl p-4 bg-[#164370]"}>

                        <div className='h-16 w-100 flex justify-between items-center '>
                            <div className='flex flex-row justify-center items-center'>
                                <h4 className='text-white font-bold'>ALL CLASSES</h4>

                            </div>
                            <div className='flex flex-row justify-center items-center'>
                                <div className='flex flex-row justify-between items-center bg-white  pr-3 ml-4 '>
                                    <input onChange={(e) => setSearch(e.target.value)} className='h-10  focus:border-gray-500 w-80 text-lg p-2' />
                                    <div className='flex justify-center items-center '>
                                        <AiIcon.IoMdSearch />
                                    </div>

                                </div>
                                <div onClick={() => { setCreate(true) }} className='cursor-pointer text-[2.8rem] text-white ml-4'>
                                    <AiIcon.IoMdAddCircle />
                                </div>
                            </div>

                        </div>
                        <div className='bg-white h-[90%] p-5 rounded-2xl overflow-auto '>
                            {
                                allClasses.map((i) => {
                                    return <div className='w-full my-3 border-2 border-col border-lightgray p-2 rounded-md flex flex-row justify-between cursor-pointer'>
                                        <div className='flex  w-[95%]' >
                                            <div>
                                                <img className='h-28 rounded-md resize' src={i.thumbnail} />
                                            </div>
                                            <div className='p-2 '>
                                                <h4 className='font-bold text-fontColor tracking-wide text-2xl'>{`${i?.className}`}</h4>
                                                <h4 className='font-bold text-gray-400 tracking-wide  text-md'>{`${i?.schoolName}`}</h4>
                                                <div className='flex  justify-between items-center text-[0.7rem] mt-1'>

                                                    <div className=''>
                                                        <p className=''>Start Time</p>
                                                        <div className='text-[0.8rem] flex flex-row items-center '>
                                                            <AiiIcon.AiFillClockCircle />
                                                            <p>{moment(i?.startDate).format("hh:mm A")}</p>
                                                        </div>

                                                    </div>

                                                    <div className='ml-4'>
                                                        <p className=''>End Time</p>
                                                        <div className='text-[0.8rem] flex flex-row items-center '>
                                                            <AiiIcon.AiFillClockCircle />
                                                            <p>{moment(i?.endDate).format("hh:mm A")}</p>
                                                        </div>

                                                    </div>

                                                    <div className='ml-4'>
                                                        <p className=''>Students</p>
                                                        <div className='text-[0.8rem] flex flex-row items-center '>
                                                            <TiIcon.TiGroup />
                                                            <p className='ml-2'>{i?.count}</p>
                                                        </div>

                                                    </div>


                                                </div>
                                            </div>


                                        </div>

                                        <div className='w-[5%] items-center justify-center flex text-[1.8rem] text-fontColor'>
                                            <AiiIcon.AiFillEdit />
                                        </div>


                                    </div>
                                })
                            }
                        </div>


                    </div>
                </div>

            </div>


        </div>
    )
}

export default AllClasses