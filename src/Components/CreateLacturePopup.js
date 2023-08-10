import React, { useEffect, useState } from 'react'
import * as MdIcon from "react-icons/md"
import { BaseUrl } from "../Constants/BaseUrl"
const CreateLacturePopup = (props) => {




    const [formFields, setFormsFields] = useState({
        Subject: "",
        Description: "",
        Link: "",
        Paper: ""



    })
    const QuizCreation = () => {
        var myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");

        var raw = JSON.stringify({
            "Subject": formFields.Subject,
            "Description": formFields.Description,
            "VideoLink": formFields.Link,
            "Paper": formFields.Paper,
            "ClassId": props.classId,

        });

        var requestOptions = {
            method: 'POST',
            headers: myHeaders,
            body: raw,
            redirect: 'follow'
        };

        fetch(`${BaseUrl}api/lacture/create`, requestOptions)
            .then(response => response.json())
            .then(result => {
                if (result.status === "Success") {
                    alert(result.message)
                    setFormsFields({
                        ...formFields,
                        Subject: "",
                        Description: "",
                        Paper: "",
                        VideoLink: "",

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
                        <h4 className=' text-fontColor font-bold'>Create Record Lacture</h4>
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
                                })} value={formFields.Subject} type="email" name="email" class=" bg-gray-50 border border-gray-300 text-[#104871] sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Subject Here" required="" />
                            </div>


                        </div>

                        <div className='w-full'>
                            <label for="email" className="block text-fontColor bold text-sm font-medium ">Video Link </label>
                            <input onChange={(e) => setFormsFields({
                                ...formFields,
                                Link: e.target.value
                            })} type="email" value={formFields.Link} name="email" class="bg-gray-50 border border-gray-300 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Link Here" required="" />
                        </div>



                    
                            <div className='w-full'>
                                <label for="time" className="block text-fontColor bold text-sm font-medium ">Paper</label>
                                <input onChange={(e) => setFormsFields({
                                    ...formFields,
                                    Paper: e.target.value
                                })} type="number" value={formFields.Paper} name="email" class="bg-gray-50 border border-gray-300 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Enter Paper Here" required="" />
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


                        if (formFields.QuizName === "") {
                            alert("Quiz Name Is Needed")
                        } else if (formFields.QuizDescription === "") {
                            alert("Description Is Needed")
                        } else if (formFields.PdfFile === "") {
                            alert("PDF Link Is Needed")
                        } else if (formFields.TotalMarks === "") {
                            alert("Total Marks Is Needed")
                        } else if (formFields.LastDate === "") {
                            alert("Last Date Is Needed")
                        } else {

                            QuizCreation()
                        }


                    }} className="h-12 w-full bg-fontColor mt-2 rounded flex justify-center items-center cursor-pointer" >
                        <p className='text-white bold '>CREATE </p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default CreateLacturePopup