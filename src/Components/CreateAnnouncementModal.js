import React, { useEffect, useState } from 'react'
import * as MdIcon from "react-icons/md"
import { BaseUrl } from "../Constants/BaseUrl"
const CreateAnnouncementModal = (props) => {




    const [formFields, setFormsFields] = useState({
        Subject: "",
        LastShowDate: "",
        Description: "",





    })
    const RequestCreation = () => {
        var myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");



        var raw = JSON.stringify({
            "subject": formFields.Subject,
            "description": formFields.Description,
            "lastDatetoShow": formFields.LastShowDate,
            "classId": props.classId
        });



        var requestOptions = {
            method: 'POST',
            headers: myHeaders,
            body: raw,
            redirect: 'follow'
        };

        fetch(`${BaseUrl}api/announcementCreation`, requestOptions)
            .then(response => response.json())
            .then(result => {
                if (result.status === "Success") {
                    alert(result.message)
                    setFormsFields({
                        ...formFields,
                        Subject: "",
                        LastShowDate: "",
                        Description: "",

                    })
                } else {
                    alert(result.message)
                }
            })
            .catch(error => console.log('error', error));
    }



    return (
        <div className='fixed inset-0 bg-black bg-opacity-80 flex justify-center items-center'>
            <div className=' w-[30%] bg-white p-4'>
                <div className='flex flex-row justify-between '>
                    <div className='flex justify-center items-center'>
                        <h4 className=' text-fontColor font-bold'>Create Annoucement</h4>
                    </div>

                    <div onClick={props.onCancel} className='cursor-pointer text-fontColor text-[30px]'>
                        <MdIcon.MdCancel />
                    </div>

                </div>

                <div className='w-100'>
                    <form class=" " action="#">
                        <div className='flex flex-row   items-center mt-2'>
                            <div className='w-full'>
                                <label for="email" className="block text-fontColor bold text-sm font-medium ">Subject</label>
                                <input onChange={(e) => setFormsFields({
                                    ...formFields,
                                    Subject: e.target.value
                                })} value={formFields.Subject} type="email" name="email" class=" bg-gray-50 border border-gray-300 text-[#104871] sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Enter Subject Here" required="" />
                            </div>


                        </div>

                        <div className='w-full'>
                            <label for="email" className="block text-fontColor bold text-sm font-medium ">Last Show Date </label>
                            <input onChange={(e) => setFormsFields({
                                ...formFields,
                                LastShowDate: e.target.value
                            })} type="date" value={formFields.LastShowDate} name="email" class="bg-gray-50 border border-gray-300 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="PDF Link Here" required="" />
                        </div>




                        <div className='w-full'>
                            <label for="email" className="block text-fontColor bold text-sm font-medium ">Description</label>
                            <input onChange={(e) => setFormsFields({
                                ...formFields,
                                Description: e.target.value
                            })} type="email" value={formFields.Description} name="email" class="bg-gray-50 border border-gray-300 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Description Here" required="" />
                        </div>



                    </form>
                    <div onClick={() => {


                        if (formFields.Subject === "") {
                            alert("Subject Is Needed")
                        } else if (formFields.LastShowDate === "") {
                            alert("Last Show Date Is Needed")
                        } else if (formFields.Description === "") {
                            alert("Description Is Needed")
                        } else {

                            RequestCreation()
                        }


                    }} className="h-12 w-full bg-fontColor mt-2 rounded flex justify-center items-center cursor-pointer" >
                        <p className='text-white bold '>CREATE </p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default CreateAnnouncementModal