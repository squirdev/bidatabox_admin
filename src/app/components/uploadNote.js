const { Typography } = require("@material-tailwind/react");

const UploadNote = () => {
  return (
    <div className="flex flex-col gap-2 text-gray-500">
      <Typography variant="small">
        Note: No matter whether the number in the number file has a country code
        or not, the country code must be selected
      </Typography>
      <Typography variant="small">
        Note: Numbers uploaded in each batch can only be numbers from the same
        country, and analytics of numbers from multiple countries at one time is
        not supported.
      </Typography>
      <Typography variant="small">
        Note: After analytics, the downloaded number system has already brought
        the country code.
      </Typography>
      <Typography variant="small">
        Note: The file format only supports TXT format files/one mobile phone
        number per line/minimum 2000-200W number package upload/file less than
        30MB.
      </Typography>
    </div>
  );
};

export default UploadNote;
