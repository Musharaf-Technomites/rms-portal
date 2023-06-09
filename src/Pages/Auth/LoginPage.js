import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from "react-redux"
import * as AuthAction from "../../Store/AuthAction"
import { useNavigate } from "react-router-dom"
const LoginPage = () => {
  const userSuccessData = useSelector(state => state.auth.userSuccessData)
  const navigate = useNavigate()
  useEffect(() => {
    if (userSuccessData) {
      navigate("/")
    }
  }, [userSuccessData])
  const dispatch = useDispatch()
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")

  const loginHandler = () => {
    const info = {
      email: email,
      password: password
    }

    dispatch(AuthAction.UserLoginAction(info))
  }

  return (
    <div className='h-screen w-screen bg-[#164370] flex justify-center items-center	'>
      <div className='w-3/4 p-5 mt-5	bg-white  items-stretch lg:flex lg:flex-row space-x-reverse rounded-sm	overflow-hidden'>
        <div class="  lg:w-6/12 w-full h-full">
          <img src={require("../../Assets/logo.jpg")} />
        </div>
        <div class="flex justify-center items-center lg:w-2/4 w-full ">
          <div class="w-full">

            <form class="w-100 rounded px-8 pt-6 pb-8">
              <div class="mb-4">
                <label class="block text-gray-700 text-sm font-bold mb-2" for="username">
                  Username
                </label>
                <input onChange={(e) => setEmail(e.target.value)} class="shadow appearance-none border rounded w-full py-2.5 px-3 leading-tight text-gray-700 mb-3  focus:outline-none focus:shadow-outline" id="username" type="text" placeholder="Username" />
              </div>
              <div class="mb-6">
                <label class="block text-gray-700 text-sm font-bold mb-2" for="password">
                  Password
                </label>
                <input onChange={(e) => setPassword(e.target.value)} class="shadow appearance-none border border-red-500 rounded w-full py-2.5 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline" id="password" type="password" placeholder="******************" />
                {/* <p class="text-red-500 text-xs italic">Please choose a password.</p> */}
              </div>
              <div class="flex items-center justify-between">
                <button onClick={loginHandler} class="bg-[#164370]  hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="button">
                  Sign In
                </button>

              </div>
            </form>

          </div>

        </div>
      </div>
    </div>
  )
}

export default LoginPage