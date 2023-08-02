import React, { useEffect, useState } from 'react'
import * as MdIcon from "react-icons/md"
import { BaseUrl } from "../Constants/BaseUrl"

const CreatePastPaperModal = (props) => {




    const [formFields, setFormsFields] = useState({
        NotesName: "",
        NotesDescription: "",
        LastDate: "",
        PdfFile: "",




    })
    const NotesCreation = () => {
        var myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");

        var raw = JSON.stringify({
            "PaperName": formFields.NotesName,
            "PaperDescription": formFields.NotesDescription,
            "PdfFile": formFields.PdfFile,
            "ClassId": props.classId,
        });

        var requestOptions = {
            method: 'POST',
            headers: myHeaders,
            body: raw,
            redirect: 'follow'
        };

        fetch(`${BaseUrl}api/pastPaper/create`, requestOptions)
            .then(response => response.json())
            .then(result => {
                if (result.status === "Success") {
                    alert(result.message)
                    setFormsFields({
                        ...formFields,
                        AssignmentDescription: "",
                        AssignmentName: "",
                        PdfFile: "",
                        TotalMarks: "",
                        LastDate: ""
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
                        <h4 className=' text-fontColor font-bold'>Create Past Papers</h4>
                    </div>

                    <div onClick={props.onCancel} className='cursor-pointer text-fontColor text-[30px]'>
                        <MdIcon.MdCancel />
                    </div>

                </div>

                <div className='w-100'>
                    <form class=" " action="#">
                        <div className='flex flex-row   items-center mt-2'>
                            <div className='w-full'>
                                <label for="email" className="block text-fontColor bold text-sm font-medium ">Paper Name</label>
                                <input onChange={(e) => setFormsFields({
                                    ...formFields,
                                    NotesName: e.target.value
                                })} value={formFields.AssignmentName} type="email" name="email" class=" bg-gray-50 border border-gray-300 text-[#104871] sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Assignment Name Here" required="" />
                            </div>


                        </div>

                        <div className='w-full'>
                            <label for="email" className="block text-fontColor bold text-sm font-medium ">PDF Link </label>
                            <input onChange={(e) => setFormsFields({
                                ...formFields,
                                PdfFile: e.target.value
                            })} type="email" value={formFields.PdfFile} name="email" class="bg-gray-50 border border-gray-300 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="PDF Link Here" required="" />
                        </div>




                        <div className='w-full'>
                            <label for="email" className="block text-fontColor bold text-sm font-medium ">Description</label>
                            <input onChange={(e) => setFormsFields({
                                ...formFields,
                                NotesDescription: e.target.value
                            })} type="email" value={formFields.AssignmentDescription} name="email" class="bg-gray-50 border border-gray-300 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Description Here" required="" />
                        </div>



                    </form>
                    <div onClick={() => {


                        if (formFields.NotesName === "") {
                            alert("Notes Name Is Needed")
                        } else if (formFields.NotesDescription === "") {
                            alert("Description Is Needed")
                        } else if (formFields.PdfFile === "") {
                            alert("PDF Link Is Needed")
                        } else {

                            NotesCreation()
                        }


                    }} className="h-12 w-full bg-fontColor mt-2 rounded flex justify-center items-center cursor-pointer" >
                        <p className='text-white bold '>CREATE </p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default CreatePastPaperModal