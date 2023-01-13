import SideBar from "./Components/SideBar"

export default function App() {
  return (
    <div className="w-full h-screen bg-cover  bg-back flex items-center">
      <div className="w-full h-screen bg-opacityBgColor flex">
        <div className="mt-2">
          <SideBar />
        </div>
        <div className={"w-100 h-screen overflow-auto"}>
         
        </div>

      </div>


    </div>
  )
}