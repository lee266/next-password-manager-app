import Radio from '@mui/material/Radio';
import FormControlLabel from '@mui/material/FormControlLabel';

type CustomRadioType = {
  value: string,
  label: string,
}

const CustomRadio: React.FC<CustomRadioType> = ({value, label}) => {
  return(
    <FormControlLabel 
      value={value} 
      label={label} 
      control={<Radio />} 
    />
  )
}

export default CustomRadio;
