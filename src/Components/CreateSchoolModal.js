import React, { useEffect, useState } from 'react'
import * as MdIcon from "react-icons/md"
import { BaseUrl } from "../Constants/BaseUrl"
const CreateSchoolModal = (props) => {
    const [schoolName, setSchoolName] = useState("")


    const CreateSchool = () => {
        var myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");

        var raw = JSON.stringify({
            "SchoolName": schoolName
        });

        var requestOptions = {
            method: 'POST',
            headers: myHeaders,
            body: raw,
            redirect: 'follow'
        };

        fetch(`${BaseUrl}api/createSchool`, requestOptions)
            .then(response => response.json())
            .then(result => {
                if (result.status === "Success") {
                    setSchoolName("")
                    alert(result.message)
                }else{
                    alert(result.message)
                }
            })
            .catch(error => console.log('error', error));
    }

    return (
        <div className='fixed inset-0 bg-black bg-opacity-80 flex justify-center items-center'>
            <div className=' w-[30%] bg-white p-4'>
                <div className='flex flex-row justify-between'>
                    <div className='flex justify-center items-center'>
                        <h4 className=' text-fontColor font-bold'>Create School</h4>
                    </div>

                    <div onClick={props.onCancel} className='cursor-pointer text-fontColor text-[30px]'>
                        <MdIcon.MdCancel />
                    </div>

                </div>

                <div className='w-100'>
                    <form class=" " action="#">


                        <div className='w-full'>
                            <label for="School Name" className="block text-fontColor bold text-sm font-medium ">School Name </label>
                            <input onChange={(e) => {
                                setSchoolName(e.target.value)
                            }} type="text" value={schoolName} name="schoolName" class="bg-gray-50 border border-gray-300 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Enter School Name Here" required="" />
                        </div>






                    </form>
                    <div onClick={() => {
                        if (schoolName === "") {
                            alert("Please")
                        } else {
                            CreateSchool()
                        }
                    }} className="h-12 w-full bg-fontColor mt-2 rounded flex justify-center items-center cursor-pointer" >
                        <p className='text-white bold '>CREATE </p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default CreateSchoolModal