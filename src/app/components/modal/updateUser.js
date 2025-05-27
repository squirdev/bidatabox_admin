import { useEffect, useState } from "react";
import {
  Button,
  Dialog,
  DialogHeader,
  DialogBody,
  DialogFooter,
  Input,
} from "@material-tailwind/react";
import { TbRefresh } from "react-icons/tb";
import { generateRandomString } from "@/app/helper";
import { updateUser } from "@/app/api/user";
import { useAlert } from "../../../../context/alertContext";

const UpdateUserModal = ({ open, userData, setOpen }) => {
  const { showAlert } = useAlert();
  const [userName, setUserName] = useState(userData?.username);
  const [password, setPassword] = useState(userData?.password);
  const [realName, setRealName] = useState(userData?.realname);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setUserName(userData?.username || "");
    setPassword(userData?.password || "");
    setRealName(userData?.realname || "");
  }, [userData]);

  const handleOpen = () => setOpen(!open);

  const regenerateUserName = () => {
    setUserName(generateRandomString(10));
  };

  const regeneratePassword = () => {
    setPassword(generateRandomString(10));
  };

  const handleUpdateUser = async () => {
    if (!userName || !password || !realName) return;

    setIsLoading(true);

    const result = await updateUser(userData._id, userName, password, realName);
    if (result) {
      showAlert("用户已成功更新", "success");
    } else {
      showAlert("用户更新失败。出现问题");
    }
    handleOpen();
    setIsLoading(false);
  };
  return (
    <Dialog open={open} handler={handleOpen}>
      <DialogHeader>更新用户</DialogHeader>
      <DialogBody>
        <form className="w-full flex flex-col gap-8">
          <div className="relative">
            <Input
              label="用户名"
              value={userName}
              onChange={(e) => setUserName(e.target.value)}
            />
            <Button
              color="green"
              size="sm"
              onClick={regenerateUserName}
              className="!absolute right-1 top-1 rounded"
            >
              <TbRefresh className="w-4 h-4" />
            </Button>
          </div>
          <div className="relative">
            <Input
              label="密码"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <Button
              color="green"
              size="sm"
              onClick={regeneratePassword}
              className="!absolute right-1 top-1 rounded"
            >
              <TbRefresh className="w-4 h-4" />
            </Button>
          </div>
          <Input
            label="真实姓名"
            value={realName}
            onChange={(e) => setRealName(e.target.value)}
          />
        </form>
      </DialogBody>
      <DialogFooter>
        <Button variant="red" onClick={handleOpen} className="mr-1">
          <span>取消</span>
        </Button>
        <Button color="green" loading={isLoading} onClick={handleUpdateUser}>
          <span>更新</span>
        </Button>
      </DialogFooter>
    </Dialog>
  );
};

export default UpdateUserModal;
