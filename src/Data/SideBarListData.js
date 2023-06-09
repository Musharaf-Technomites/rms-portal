
import * as BiIcon from "react-icons/bi"
import * as BsIcon from "react-icons/bs"
import * as TbIcon from "react-icons/tb"
export const SideBarListData = [
    {
        id: 1,
        Name: "Home",
        Icon: <BiIcon.BiHomeAlt className={"h-6 w-6"} />,


    },
    {
        id: 2,
        Name: "Students",
        Icon: <BsIcon.BsMenuButton className="h-5 w-5" />,


    },
    {
        id: 3,
        Name: "Students 2",
        Icon: <BsIcon.BsCardList className="h-5 w-5" />,
    },


    {
        id: 4,
        Name: "Logout",
        Icon: <TbIcon.TbLogout className="h-6 w-6" />,
    },
]