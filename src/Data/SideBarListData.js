
import * as BiIcon from "react-icons/bi"
import * as BsIcon from "react-icons/bs"
import * as TbIcon from "react-icons/tb"
import * as MdIcon from "react-icons/md"

export const SideBarListData = [
    {
        id: 1,
        Name: "Home",
        Icon: <BiIcon.BiHomeAlt className={"h-6 w-6"} />,


    },
    {
        id: 2,
        Name: "Students",
        Icon: <BsIcon.BsFillPersonLinesFill className="h-5 w-5" />,


    },
    {
        id: 3,
        Name: "Classes",
        Icon: <BsIcon.BsCardList className="h-5 w-5" />,
    },


    {
        id: 5,
        Name: "Media",
        Icon: <MdIcon.MdOutlinePermMedia className="h-6 w-6" />,
    },

    {
        id: 4,
        Name: "Logout",
        Icon: <TbIcon.TbLogout className="h-6 w-6" />,
    },
]