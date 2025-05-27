import UpdatePasswordModal from "@/app/components/modal/updatePassword";
import {
  Avatar,
  Menu,
  MenuHandler,
  MenuItem,
  MenuList,
  Typography,
} from "@material-tailwind/react";
import { useState } from "react";
import { AiOutlinePoweroff } from "react-icons/ai";
import { useDispatch } from "react-redux";
import { logout } from "../../../redux/authSlice";
import { useRouter } from "next/navigation";

const ProfileDropDown = () => {
  const [updatePasswordModalShow, setUpdatePasswordModalShow] = useState(false);
  const dispatch = useDispatch();
  const router = useRouter();

  const handleLogout = () => {
    dispatch(logout());
    router.push("/login");
  };

  return (
    <Menu>
      <UpdatePasswordModal
        open={updatePasswordModalShow}
        setOpen={setUpdatePasswordModalShow}
      />
      <MenuHandler>
        <Avatar
          variant="circular"
          alt="User"
          className="cursor-pointer w-10 h-10"
          src="/avatar.jpg"
        />
      </MenuHandler>
      <MenuList>
        <div className="py-2 outline-none">
          <Typography variant="small" className="font-medium font-bold">
            欢迎
          </Typography>
        </div>
        {/* <MenuItem
          onClick={() => setUpdatePasswordModalShow(true)}
          className="flex items-center gap-2"
        >
          <AiTwotoneSetting />
          <Typography variant="small" className="font-medium">
            {t("changePassword")}
          </Typography>
        </MenuItem> */}
        <hr className="my-2 border-blue-gray-50" />
        <MenuItem className="flex items-center gap-2" onClick={handleLogout}>
          <AiOutlinePoweroff />
          <Typography variant="small" className="font-medium">
            登出
          </Typography>
        </MenuItem>
      </MenuList>
    </Menu>
  );
};
export default ProfileDropDown;
