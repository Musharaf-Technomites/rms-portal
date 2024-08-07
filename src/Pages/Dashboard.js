import React, { useEffect, useState } from 'react'
import SideBar from '../Components/SideBar'
import { useNavigate } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux"
import { BaseUrl } from '../Constants/BaseUrl'
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import * as AuthAction from "../Store/AuthAction"
const Dashboard = (props) => {
    const navigate = useNavigate()
    const dispatch = useDispatch()
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
            <div class="h-[30%] w-full rounded-3xl flex justify-center items-center bg-[#eaeaea] shadow-md font-bold text-7xl flex-col mb-2">
                <div className=' bg-[#F05152] flex justify-center items-center rounded p-2'>
                    <h4 className='text-2xl font-bold text-white'>{Count}</h4>
                </div>


                <div className='flex justify-center items-center flex-col'>
                    <h4 className='text-fontColor text-lg text-bold' >{`${name?.toUpperCase()}`}</h4>
                </div>

            </div>


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


    console.log(JSON.stringify(AllCount), "ALl Conunt========")
    const ZoomClassUrl = "https://us05web.zoom.us/j/85054786562?pwd=5nqE0ttRw7P43Ad3A9z7q0o8pXzL5q.1"
    return (
        <div className="w-full bg-back bg-cover  items-center">
            <div className="w-full h-screen bg-opacityBgColor flex">
                <div className="mt-2">
                    <SideBar />
                </div>
                <div className={"w-100  bg-glass  ml-4 mr-4 mt-2.5 mb-8 rounded-3xl"}>
                    <div className='h-full w-full bg-fontColor p-4  '>
                        <div className='h-full w-full bg-white rounded-xl p-7 flex justify-between'>

                            <div className='flex justify-between w-[37%] h-full '>
                                <img
                                    className='h-full w-full rounded-2xl cursor-pointer'
                                    src={require("../Assets/Portrate.png")}
                                />
                            </div>

                            <div className=' justify-between w-[61%] h-full '>
                                <div onClick={() => {
                                    dispatch(AuthAction.CurrentSideBaseStateAction("Home"))
                                    navigate("/")
                                    window.open('https://us05web.zoom.us/j/85054786562?pwd=5nqE0ttRw7P43Ad3A9z7q0o8pXzL5q.1', '_blank');
                                }} className='h-[30%] w-full'>
                                    <img
                                        className='h-full w-full rounded-2xl cursor-pointer'
                                        src={require("../Assets/zoom.jpeg")}
                                    />
                                </div>

                                <div className='h-[70%] w-full flex p-2'>

                                    <div className='h-full w-[30%]'>
                                        {
                                            List?.filter((i) => i.Name === "Students")?.map((i) => {
                                                return (
                                                    <CountTile
                                                        index={i}
                                                        count={10}
                                                        name={i.Name}
                                                    />
                                                )
                                            })
                                        }
                                        <div class="h-[60%] w-full rounded-3xl flex justify-center items-center bg-[#eaeaea] shadow-md font-bold text-7xl flex-col mb-2">
                                            <div className=' bg-[#F05152] flex justify-center items-center rounded p-2'>
                                                <h4 className='text-2xl font-bold text-white'>{35}</h4>
                                            </div>


                                            <div className='flex justify-center items-center flex-col text-center'>
                                                <h4 className='text-fontColor text-lg text-bold mt-2' >{`PENDING ${"\n"} ASSIGNMENTS`}</h4>
                                            </div>

                                        </div>
                                    </div>
                                    <div className='h-full w-[70%] flex justify-center items-center'>
                                        <Calendar onChange={() => {

                                        }} value={date} />
                                    </div>




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