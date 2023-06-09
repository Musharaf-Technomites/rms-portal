import React from 'react'

const LoginPage = () => {
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
                <input class="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight text-gray-700 mb-3  focus:outline-none focus:shadow-outline" id="username" type="text" placeholder="Username" />
              </div>
              <div class="mb-6">
                <label class="block text-gray-700 text-sm font-bold mb-2" for="password">
                  Password
                </label>
                <input class="shadow appearance-none border border-red-500 rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline" id="password" type="password" placeholder="******************" />
                {/* <p class="text-red-500 text-xs italic">Please choose a password.</p> */}
              </div>
              <div class="flex items-center justify-between">
                <button class="bg-[#164370]  hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="button">
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