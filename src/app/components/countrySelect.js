import { Option, Select } from "@material-tailwind/react";

const SelectCountry = () => {
  return (
    <Select variant="static" label="Country code">
      <Option>+852-HongKong</Option>
      <Option>+853-Macau</Option>
    </Select>
  );
};

export default SelectCountry;
