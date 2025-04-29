const { Typography } = require("@material-tailwind/react");

const GenerateNote = () => {
  return (
    <div className="flex flex-col gap-1 text-gray-500">
      <Typography variant="small">
        Note: This function is used to generate numbers in bulk, customize
        country codes and number ranges, and automatically generate the last few
        digits in order
      </Typography>
      <Typography variant="small">
        Note: A single number segment, such as the country code set to 55, the
        number segment set to 3198353, and the last few digits set to 4, this
        function will generate ten thousand numbers from 5531983530000 to
        5531983539999.
      </Typography>
      <Typography variant="small">
        Note: Multiple number segments, such as the country code set to 55, the
        number segment set to 119771319835219951, and the last few digits set to
        5, this function will generate three hundred thousand numbers from
        5511977100000 to 551197719999553198350000 to 55319835999552199510000 to
        5521995199999.
      </Typography>
    </div>
  );
};

export default GenerateNote;
