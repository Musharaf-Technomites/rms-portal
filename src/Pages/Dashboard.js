import React, { useEffect, useState } from 'react'
import SideBar from '../Components/SideBar'
import { BrowserRouter, Routes, Route } from "react-router-dom"
import * as FaIcon from "react-icons/fa"
import * as TfIcon from "react-icons/tfi"
import * as BsIcon from "react-icons/bs"
import { BaseUrl } from '../Constants/BaseUrl'
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
const Dashboard = (props) => {
    const List = [
        { Id: 1, Name: "Schools" },
        { Id: 2, Name: "Classes" },
        { Id: 3, Name: "Students" },
        // { Id: 4, Name: "Assignments" },
        // { Id: 5, Name: "Quizes" },




    ]
    const [date, setDate] = useState(new Date())


    const CountTile = ({ name, count, index }) => {
        const Count = index.Id === 1 ? AllCount?.Schools : index.Id === 2 ? AllCount?.Classes : index.Id === 3 ? AllCount?.Students : index.Id === 4 ? AllCount?.Assignments : index.Id === 5 ? AllCount?.Quizes : index.Id === 6 ? AllCount?.Notes : index.Id === 7 ? AllCount?.PastPapers : 0

        return (
            <div class="h-[70%] w-[30%] rounded-3xl flex justify-center items-center bg-[#eaeaea] shadow-md font-bold text-7xl flex-col">
                <div className='h-10 w-10 bg-[#F05152] flex justify-center items-center rounded ml-10 top-4'>
                    <h4 className='text-2xl font-bold text-white'>{Count}</h4>
                </div>
                {
                    index.Id === 1 ?
                        <FaIcon.FaSchool />
                        :
                        index.Id === 2
                            ?
                            <TfIcon.TfiBlackboard />
                            :
                            index.Id === 3 ?
                                <BsIcon.BsFillPersonFill />
                                :
                                index.Id === 4 ?
                                    <FaIcon.FaNewspaper />
                                    :
                                    index.Id === 5 ?
                                        <BsIcon.BsCardChecklist />
                                        :

                                        index.Id === 6 ?
                                            <BsIcon.BsFillFileEarmarkFill />

                                            :

                                            <BsIcon.BsPaperclip />

                }

                <div className='flex justify-center items-center flex-col'>
                    <h4 className='text-fontColor text-lg text-bold' >{`${name?.toUpperCase()}`}</h4>

                </div>

            </div>


            // <div className='h-[100px] w-[40%] bg-gray-100 flex-row '>
            //     {/* <div className='h-[100%] w-[30%] text-fontColor text-6xl justify-center items-center grid grid-cols-3 gap-4'>
            // {
            //     index.Id === 1 ?
            //         <FaIcon.FaSchool />
            //         :
            //         index.Id === 2
            //             ?
            //             <TfIcon.TfiBlackboard />
            //             :
            //             index.Id === 3 ?
            //                 <BsIcon.BsFillPersonFill />
            //                 :
            //                 index.Id === 4 ?
            //                     <FaIcon.FaNewspaper />
            //                     :
            //                     index.Id === 5 ?
            //                         <BsIcon.BsCardChecklist />
            //                         :

            //                         index.Id === 6 ?
            //                             <BsIcon.BsFillFileEarmarkFill />

            //                             :

            //                             <BsIcon.BsPaperclip />

            // }

            //     </div>

            // <div className='h-full w-[70%] flex justify-center items-center flex-col'>
            //     <h4 className='text-2xl font-bold text-[#F05152]'>{Count}</h4>
            //     <h4 className='text-fontColor text-lg text-bold' >{`${name?.toUpperCase()}`}</h4>
            // </div> */}



            // </div>
        )
    }


    const [AllCount, setCount] = useState()
    const GetAllCount = () => {
        var requestOptions = {
            method: 'GET',
            redirect: 'follow'
        };

        fetch(`${BaseUrl}api/getAllRecordCount`, requestOptions)
            .then(response => response.json())
            .then(result => {
                if (result.status === "success") {
                    setCount(result?.data)
                }
            })
            .catch(error => console.log('error', error));
    }

    useEffect(() => {
        GetAllCount()
    }, [])

    const ZoomClassUrl = "https://us05web.zoom.us/j/85054786562?pwd=5nqE0ttRw7P43Ad3A9z7q0o8pXzL5q.1"
    return (
        <div className="w-full bg-back bg-cover  items-center">
            <div className="w-full h-screen bg-opacityBgColor flex">
                <div className="mt-2">
                    <SideBar />
                </div>
                <div className={"w-100  bg-glass  ml-4 mr-4 mt-2.5 mb-8 rounded-3xl"}>
                    <div className='h-full w-full bg-fontColor p-4  '>
                        <div className='h-full w-full bg-white rounded-xl p-7'>
                            <div className='w-full h-[50%] rounded-2xl '>
                                <a href={ZoomClassUrl} target='_blank'>
                                    <img
                                        className='h-full w-full rounded-2xl cursor-pointer'
                                        src={require("../Assets/homeBanner.jpg")}
                                    />
                                </a>

                            </div>

                            <div className=' w-full my-4 flex  justify-between'>

                                <div className=' w-[60%] flex flex-wrap justify-between'>
                                    {
                                        List?.map((i) => {


                                            return (
                                                <CountTile
                                                    index={i}
                                                    count={10}
                                                    name={i.Name}
                                                />
                                            )
                                        })
                                    }
                                </div>



                                <div className='h-[357px] w-[35%] ˝'>
                                    <Calendar onChange={() => {

                                    }} value={date} />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

            </div>


        </div>
    )
}

export default Dashboard