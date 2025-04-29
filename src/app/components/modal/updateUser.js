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
  const [tgCost, setTGCost] = useState(userData?.tgCost);
  const [wsCost, setWSCost] = useState(userData?.wsCost);
  const [phoneStatusCost, setPhoneStatusCost] = useState(userData?.phoneCost);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setUserName(userData?.username || "");
    setPassword(userData?.password || "");
    setRealName(userData?.realname || "");
    setTGCost(userData?.tgCost || 0);
    setWSCost(userData?.wsCost || 0);
    setPhoneStatusCost(userData?.phoneCost || 0);
  }, [userData]);

  const handleOpen = () => setOpen(!open);

  const regenerateUserName = () => {
    setUserName(generateRandomString(10));
  };

  const regeneratePassword = () => {
    setPassword(generateRandomString(10));
  };

  const handleUpdateUser = async () => {
    if (
      !userName ||
      !password ||
      !realName ||
      !tgCost ||
      !wsCost ||
      !phoneStatusCost
    )
      return;

    setIsLoading(true);

    const result = await updateUser(
      userData._id,
      userName,
      password,
      realName,
      tgCost,
      wsCost,
      phoneStatusCost
    );
    if (result) {
      showAlert("User was updated successfully", "success");
    } else {
      showAlert("User update failed. Something went wrong");
    }
    handleOpen();
    setIsLoading(false);
  };
  return (
    <Dialog open={open} handler={handleOpen}>
      <DialogHeader>Update User</DialogHeader>
      <DialogBody>
        <form className="w-full flex flex-col gap-8">
          <div className="relative">
            <Input
              label="User Name"
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
              label="Password"
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
            label="Real Name"
            value={realName}
            onChange={(e) => setRealName(e.target.value)}
          />
          <div className="flex gap-4">
            <Input
              variant="static"
              type="number"
              value={tgCost}
              onChange={(e) => setTGCost(e.target.value)}
              label="TG Days Detection Cost"
              placeholder="Points per 10000 ( default 5.715 )"
            />
            <Input
              variant="static"
              type="number"
              value={wsCost}
              onChange={(e) => setWSCost(e.target.value)}
              label="WS Days Detection Cost"
              placeholder="Points per 10000 ( default 2.142 )"
            />
          </div>
          <Input
            variant="static"
            type="number"
            value={phoneStatusCost}
            onChange={(e) => setPhoneStatusCost(e.target.value)}
            label="Phone Number Status Detect Cost"
            placeholder="Points per 10000 ( default 3.571 )"
          />
        </form>
      </DialogBody>
      <DialogFooter>
        <Button variant="red" onClick={handleOpen} className="mr-1">
          <span>Cancel</span>
        </Button>
        <Button color="green" loading={isLoading} onClick={handleUpdateUser}>
          <span>Update</span>
        </Button>
      </DialogFooter>
    </Dialog>
  );
};

export default UpdateUserModal;
