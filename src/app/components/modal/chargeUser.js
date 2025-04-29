import { useEffect, useState } from "react";
import {
  Button,
  Dialog,
  DialogHeader,
  DialogBody,
  DialogFooter,
  Input,
  Typography,
} from "@material-tailwind/react";
import { chargeUser } from "@/app/api/user";
import { useAlert } from "../../../../context/alertContext";

const ChargeUserModal = ({ open, userData, setOpen }) => {
  const { showAlert } = useAlert();

  const [isLoading, setIsLoading] = useState(false);
  const [chargeAmount, setChargeAmount] = useState(0);
  const [balance, setBalance] = useState(0);

  useEffect(() => {
    setBalance(userData?.balance || 0);
  }, [userData]);

  const handleOpen = () => setOpen(!open);

  const handleChargeUser = async () => {
    if (!chargeAmount) return;

    setIsLoading(true);

    const result = await chargeUser(
      userData._id,
      userData.realname,
      chargeAmount
    );
    if (result) {
      showAlert("User was charged successfully", "success");
    } else {
      showAlert("User charge failed. Something went wrong");
    }
    handleOpen();
    setIsLoading(false);
  };
  return (
    <Dialog open={open} handler={handleOpen} size="sm">
      <DialogHeader>Charge User</DialogHeader>
      <DialogBody>
        <form className="w-full flex flex-col gap-8">
          <Input
            label="Charge Amount"
            type="number"
            variant="static"
            value={chargeAmount}
            onChange={(e) => setChargeAmount(e.target.value)}
          />
        </form>
      </DialogBody>
      <DialogFooter>
        <div className="w-full flex justify-between items-end">
          <div className="flex gap-1">
            <Typography variant="small">Current Balance:</Typography>
            <Typography variant="small">{balance}</Typography>
          </div>
          <div className="flex">
            <Button variant="red" onClick={handleOpen} className="mr-1">
              <span>Cancel</span>
            </Button>
            <Button
              color="green"
              disabled={Number(chargeAmount) === 0}
              loading={isLoading}
              onClick={handleChargeUser}
            >
              <span>Charge</span>
            </Button>
          </div>
        </div>
      </DialogFooter>
    </Dialog>
  );
};

export default ChargeUserModal;
