import { Card, List, ListItem, ListItemPrefix } from "@material-tailwind/react";
import { BsFillGridFill, BsPhoneVibrateFill } from "react-icons/bs";

import Image from "next/image";
import Link from "next/link";
import { AiOutlineUsergroupAdd, AiFillDashboard } from "react-icons/ai";
import { TbCoinYenFilled } from "react-icons/tb";

const SideBar = ({ sidebarShow }) => {
  const SIDE_BAR_INFO = [
    {
      title: "仪表板",
      icon: AiFillDashboard,
      url: "/",
    },
    {
      title: "用户管理",
      icon: AiOutlineUsergroupAdd,
      url: "/user",
    },
    {
      title: "天检测",
      icon: BsFillGridFill,
      url: "/daydetectlist",
    },
    {
      title: "手机检测",
      icon: BsPhoneVibrateFill,
      url: "/phonedetectlist",
    },
    {
      title: "收费日志",
      icon: TbCoinYenFilled,
      url: "/chargeloglist",
    },
  ];

  return (
    <div className="flex">
      <Card
        className={`h-screen max-w-[16rem] transform transition-all duration-500 ease-in-out overflow-hidden rounded-none shadow-md shadow-gray-500  ${sidebarShow ? "w-64" : "w-0"}`}
      >
        <div className="flex justify-center items-center h-20 py-3 bg-gray-200">
          <Image src={"/log.png"} width={150} height={20} alt="logo" />
        </div>
        <List className="p-0 mt-4 text-sm">
          {SIDE_BAR_INFO.map((item, index) => (
            <Link key={index} href={item.url}>
              <ListItem className="rounded-none text-sm font-bold px-8">
                <ListItemPrefix>
                  <item.icon className="h-4 w-4 text-black" />
                </ListItemPrefix>
                {item.title}
              </ListItem>
            </Link>
          ))}
        </List>
      </Card>
    </div>
  );
};

export default SideBar;
