import React from "react";
import {
  Input,
  Button,
  Dialog,
  IconButton,
  Typography,
  DialogBody,
  DialogHeader,
  DialogFooter,
} from "@material-tailwind/react";
import { AiOutlineClose } from "react-icons/ai";

const UpdatePasswordModal = ({ open, setOpen }) => {
  const handleOpen = () => setOpen(!open);

  const handleUpdatePassword = () => {
    setOpen(!open);
  };

  return (
    <Dialog size="sm" open={open} handler={handleOpen} className="p-4">
      <DialogHeader className="relative m-0 block">
        <Typography variant="h4" color="blue-gray">
          Change password
        </Typography>
        <IconButton
          size="sm"
          variant="text"
          className="!absolute right-3.5 top-3.5"
          onClick={handleOpen}
        >
          <AiOutlineClose className="h-4 w-4 stroke-2" />
        </IconButton>
      </DialogHeader>
      <DialogBody className="space-y-8 pb-8">
        <Input
          size="lg"
          label="Old Password"
          placeholder="Please enter the original login password"
          type="password"
        />
        <Input
          size="lg"
          label="New Password"
          placeholder="The new password must be greater than 6 characters"
          type="password"
        />
        <Input
          size="lg"
          label="Confirm Password"
          placeholder="Please enter the new password again"
          type="password"
        />
      </DialogBody>
      <DialogFooter className="flex items-end gap-2">
        <Button color="blue-gray" onClick={handleOpen}>
          Cancel
        </Button>
        <Button color="red" onClick={handleUpdatePassword}>
          submit
        </Button>
      </DialogFooter>
    </Dialog>
  );
};

export default UpdatePasswordModal;
