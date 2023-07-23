import React, { useEffect, useState } from 'react'
import * as MdIcon from "react-icons/md"
import { BaseUrl } from "../Constants/BaseUrl"
const AssignmentMarksModal = (props) => {




    const [formFields, setFormsFields] = useState({
        marks: ''

    })



    return (
        <div className='fixed inset-0 bg-black bg-opacity-80 flex justify-center items-center'>
            <div className=' w-[30%] bg-white p-4'>
                <div className='flex flex-row justify-between '>
                    <div className='flex justify-center items-center'>
                        <h4 className=' text-fontColor font-bold'>Marks Submittion</h4>
                    </div>

                    <div onClick={props.onCancel} className='cursor-pointer text-fontColor text-[30px]'>
                        <MdIcon.MdCancel />
                    </div>

                </div>

                <div className='w-100'>
                    <form class=" " action="#">
                        <div className='flex flex-row   items-center mt-2'>



                        </div>


                        <div className='w-full'>
                            <label for="email" className="block text-fontColor bold text-sm font-medium ">Marks</label>
                            <input onChange={props.onChange} type="email" value={props.marks} name="email" class="bg-gray-50 border border-gray-300 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Enter marks here" required="" />
                        </div>



                    </form>
                    <div onClick={props.onClick} className="h-12 w-full bg-fontColor mt-2 rounded flex justify-center items-center cursor-pointer" >
                        <p className='text-white bold '>Submit</p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default AssignmentMarksModal