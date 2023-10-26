import React, { useEffect, useState } from 'react'
import * as MdIcon from "react-icons/md"
import { BaseUrl } from "../Constants/BaseUrl"
import ClipLoader from "react-spinners/ClipLoader";

const CreateQuizModal = (props) => {

    const [color, setColor] = useState("red");





    const [formFields, setFormsFields] = useState({
        QuizName: "",
        QuizDescription: "",
        LastDate: "",
        PdfFile: "",
        ClassId: "",
        TotalMarks: ""


    })
    const override = {
        borderColor: "red",
        height: 40,
        width: 40,
        marginTop: 10

    };



    return (
        <div className='fixed inset-0 bg-black bg-opacity-80 flex justify-center items-center'>
            <div className=' w-[30%] bg-white p-4'>
                <div className='flex flex-row justify-between '>
                    <div className='flex justify-center items-center'>
                        <h4 className=' text-fontColor font-bold'>Create Quiz</h4>
                    </div>

                    <div onClick={props.onCancel} className='cursor-pointer text-fontColor text-[30px]'>
                        <MdIcon.MdCancel />
                    </div>

                </div>

                <div className='w-100'>
                    <form class=" " action="#">
                        <div className='flex flex-row  items-center mt-2'>
                            <div className='w-2/4'>
                                <label for="time" className="block text-fontColor bold text-sm font-medium ">First Name</label>
                                <input onChange={props.onChanegFirstName} type="String" value={props.firstNameValue} name="email" class="bg-gray-50 border border-gray-300 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="First Name" required="" />
                            </div>
                            <div className='w-2/4'>
                                <label for="text" className="block text-fontColor bold text-sm font-medium ">Last Name</label>
                                <input onChange={props.onChanegLastName} type="String" value={props.lastNameValue} name="email" class="bg-gray-50 border border-gray-300 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Last Name" required="" />
                            </div>
                        </div>

                        <div className='w-full'>
                            <label for="email" className="block text-fontColor bold text-sm font-medium ">Email</label>
                            <input onChange={props.onChanegEmail} type="email" value={props.emailValue} name="email" class="bg-gray-50 border border-gray-300 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Email Here" required="" />
                        </div>

                        <div className='w-full'>
                            <label for="email" className="block text-fontColor bold text-sm font-medium ">Password</label>
                            <input onChange={props.onChanegPassword} type="text" value={props.passwordValue} name="email" class="bg-gray-50 border border-gray-300 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Password Here" required="" />
                        </div>

                        <div className='w-full'>
                            <label for="text" className="block text-fontColor bold text-sm font-medium ">Number</label>
                            <input onChange={props.onChanegNumber} type="text" value={props.numberValue} name="email" class="bg-gray-50 border border-gray-300 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Number Here" required="" />
                        </div>
                    </form>
                    {
                        props.loading ? <div className='flex justify-center items-center'>
                            <ClipLoader
                                className='h-4'
                                color={color}
                                loading={props.loading}
                                cssOverride={override}
                                size={120}
                                aria-label="Loading Spinner"
                                data-testid="loader"
                            />
                        </div> : <div onClick={props.onSubmit} className="h-12 w-full bg-fontColor mt-2 rounded flex justify-center items-center cursor-pointer" >
                            <p className='text-white bold '>UPDATE </p>
                        </div>
                    }

                </div>
            </div>
        </div>
    )
}

export default CreateQuizModal