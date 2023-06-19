import React, { useEffect, useState } from 'react'
import * as MdIcon from "react-icons/md"
const CreateStudentModal = (props) => {

    const [masterData, setMasterData] = useState()
    const courseList = [
        {
            id: 1,
            Name: "A1"
        },
        {
            id: 2,
            Name: "A2"
        },
        {
            id: 3,
            Name: "A3"
        },
        {
            id: 4,
            Name: "A4"
        },
    ]
    const GetAllMasterData = () => {
        var requestOptions = {
            method: 'GET',
            redirect: 'follow'
        };

        fetch("http://localhost:8000/api/allMasterData", requestOptions)
            .then(response => response.json())
            .then(result => {
                if (result.status === "Success") {
                    setMasterData(result.data)
                }
            })
            .catch(error => console.log('error', error));
    }
    useEffect(() => {
        GetAllMasterData()
    }, [])
    return (
        <div className='fixed inset-0 bg-black bg-opacity-80 flex justify-center items-center'>
            <div className=' w-[30%] bg-white p-4'>
                <div className='flex flex-row justify-between p-2'>
                    <div className='flex justify-center items-center'>
                        <h4 className=' text-fontColor font-bold'>Create Students</h4>
                    </div>

                    <div onClick={props.onCancel} className='cursor-pointer text-fontColor text-[30px]'>
                        <MdIcon.MdCancel />
                    </div>

                </div>

                <div className='w-100'>
                    <form class=" " action="#">
                        <div className='flex flex-row   items-center mt-2'>
                            <div className='w-2/4'>
                                <label for="email" className="block text-fontColor bold text-sm font-medium ">First Name</label>
                                <input type="email" name="email" class=" bg-gray-50 border border-gray-300 text-[#104871] sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="First Name" required="" />
                            </div>

                            <div className='w-2/4'>
                                <label for="email" className="block text-fontColor bold text-sm font-medium ">Last Name</label>
                                <input type="email" name="email" class="bg-gray-50 border border-gray-300 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Last Name" required="" />
                            </div>
                        </div>

                        <div className='mt-2'>
                            <label for="email" className="block text-fontColor bold text-sm font-medium ">Password</label>
                            <input type="password" name="password" id="password" placeholder="••••••••" class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required="" />
                        </div>
                        <div className='mt-2'>
                            <label for="email" className="block text-fontColor bold text-sm font-medium ">Confirm Password</label>
                            <input type="confirm-password" name="confirm-password" id="confirm-password" placeholder="••••••••" class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required="" />
                        </div>

                        <div className='flex flex-row  items-center mt-2'>
                            <div className='w-2/4'>
                                <label for="email" className="block text-fontColor bold text-sm font-medium ">Email</label>
                                <input type="email" name="email" class=" bg-gray-50 border border-gray-300 text-[#104871] sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="First Name" required="" />
                            </div>

                            <div className='w-2/4'>
                                <label for="email" className="block text-fontColor bold text-sm font-medium ">Number</label>
                                <input type="email" name="email" class="bg-gray-50 border border-gray-300 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Last Name" required="" />
                            </div>
                        </div>

                        <div className='mt-2'>
                            <label for="email" className="block text-fontColor bold text-sm font-medium ">School</label>
                            {
                                masterData && <select name="cars" id="cars" className='dark:bg-gray-700 text-white h-10 rounded-lg w-full  px-3'>
                                    {masterData?.map((i) => {
                                        return <option className='' value="i.SchoolName">{i?.SchoolName}</option>

                                    })}

                                </select>
                            }


                        </div>

                        <div className='mt-2'>
                            <label for="email" className="block text-fontColor bold text-sm font-medium ">Course</label>

                            <select name="cars" id="cars" className='dark:bg-gray-700 text-white h-10 rounded-lg w-full  px-3'>
                                {
                                    courseList.map((i) => {
                                        return <option className='' value="i.Name">{i?.Name}</option>
                                    })
                                }
                            </select>

                        </div>
                    </form>
                    <div className="h-12 w-full bg-fontColor mt-2 rounded flex justify-center items-center cursor-pointer" >
                        <p className='text-white bold '>CREATE </p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default CreateStudentModal