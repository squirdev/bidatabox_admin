const { Typography } = require("@material-tailwind/react");

const RegionNote = () => {
  return (
    <div className="flex flex-col gap-1 text-gray-500">
      <Typography variant="small">
        Note: The uploaded number must include the country code
      </Typography>
      <Typography variant="small">
        Note: Numbers uploaded in each batch can only be numbers from the same
        country, and analytics of numbers from multiple countries at one time is
        not supported.
      </Typography>
      <Typography variant="small">
        Note: The file format only supports TXT format files/one mobile phone
        number per line/minimum 100-200W number package upload/file less than
        30MB.
      </Typography>
    </div>
  );
};

export default RegionNote;
