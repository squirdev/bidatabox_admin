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
  const [tgCost, setTGCost] = useState(5.715);
  const [wsCost, setWSCost] = useState(2.142);
  const [phoneStatusCost, setPhoneStatusCost] = useState(3.571);

  const [isLoading, setIsLoading] = useState(false);

  const handleOpen = () => setOpen(!open);

  const regenerateUserName = () => {
    setUserName(generateRandomString(10));
  };

  const regeneratePassword = () => {
    setPassword(generateRandomString(10));
  };

  const handleCreateUser = async () => {
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

    const result = await createUser(
      userName,
      password,
      realName,
      tgCost,
      wsCost,
      phoneStatusCost
    );
    if (result) {
      showAlert("User was created successfully", "success");
    } else {
      showAlert("Something went wrong");
    }
    handleOpen();
    setIsLoading(false);
  };
  return (
    <Dialog open={open} handler={handleOpen}>
      <DialogHeader>Create a new user</DialogHeader>
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
        <Button color="green" loading={isLoading} onClick={handleCreateUser}>
          <span>Confirm</span>
        </Button>
      </DialogFooter>
    </Dialog>
  );
};

export default AddNewUserModal;
