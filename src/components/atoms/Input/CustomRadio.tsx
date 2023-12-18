import Radio from '@mui/material/Radio';
import FormControlLabel from '@mui/material/FormControlLabel';

type CustomRadioType = {
  value: string;
  label: string;
};

const CustomRadio: React.FC<CustomRadioType> = ({ value, label }) => {
  return (
    <FormControlLabel
      className="dark:text-white"
      value={value}
      label={label}
      control={<Radio className="dark:text-white" />}
    />
  );
};

export default CustomRadio;
