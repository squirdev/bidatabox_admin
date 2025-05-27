import { useState } from "react";
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
import { createUser } from "@/app/api/user";
import { useAlert } from "../../../../context/alertContext";

const AddNewUserModal = ({ open, setOpen }) => {
  const { showAlert } = useAlert();
  const [userName, setUserName] = useState(generateRandomString(10));
  const [password, setPassword] = useState(generateRandomString(10));
  const [realName, setRealName] = useState("");

  const [isLoading, setIsLoading] = useState(false);

  const handleOpen = () => setOpen(!open);

  const regenerateUserName = () => {
    setUserName(generateRandomString(10));
  };

  const regeneratePassword = () => {
    setPassword(generateRandomString(10));
  };

  const handleCreateUser = async () => {
    if (!userName || !password || !realName) return;

    setIsLoading(true);

    const result = await createUser(userName, password, realName);
    if (result) {
      showAlert("用户创建成功", "success");
    } else {
      showAlert("出了点问题。");
    }
    handleOpen();
    setIsLoading(false);
  };
  return (
    <Dialog open={open} handler={handleOpen}>
      <DialogHeader>创建新用户</DialogHeader>
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
        <Button color="green" loading={isLoading} onClick={handleCreateUser}>
          <span>确认</span>
        </Button>
      </DialogFooter>
    </Dialog>
  );
};

export default AddNewUserModal;
