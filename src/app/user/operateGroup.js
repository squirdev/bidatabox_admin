const { Tooltip, IconButton } = require("@material-tailwind/react");
const { BiSolidEdit } = require("react-icons/bi");
const { TbCoinYenFilled } = require("react-icons/tb");

const OperateButtonGroup = ({ index, handleUpdate, handleCharge }) => {
  return (
    <>
      <Tooltip content="Update User">
        <IconButton variant="text" onClick={() => handleUpdate(index)}>
          <BiSolidEdit strokeWidth={0.1} className="h-5 w-5 text-green-700" />
        </IconButton>
      </Tooltip>
      <Tooltip content="Charge User">
        <IconButton variant="text" onClick={() => handleCharge(index)}>
          <TbCoinYenFilled
            strokeWidth={0.1}
            className="h-5 w-5 text-green-700"
          />
        </IconButton>
      </Tooltip>
    </>
  );
};

export default OperateButtonGroup;
