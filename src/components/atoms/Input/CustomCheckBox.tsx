import Checkbox from '@mui/material/Checkbox';
import FormControlLabel from '@mui/material/FormControlLabel';

type CustomCheckBoxProps = {
  checked: boolean;
  onChange: (event: React.ChangeEvent<HTMLInputElement>, checked: boolean) => void;
  label: React.ReactNode;
  indeterminate?: boolean;
  marginLeft?: number | string;
};

const CustomCheckBox: React.FC<CustomCheckBoxProps> = ({ 
  checked, 
  onChange, 
  label, 
  indeterminate = false, 
  marginLeft = 0
}) => {
  return(
    <FormControlLabel
      className='dark:text-white'
      sx={{ marginLeft, mb: -1 }}
      control={
        <Checkbox
          className='dark:text-white'
          checked={checked}
          onChange={onChange}
          indeterminate={indeterminate}
        />
      }
      label={label}
    />
  );
}

export default CustomCheckBox;
