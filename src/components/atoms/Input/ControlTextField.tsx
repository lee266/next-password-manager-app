import { useEffect, useState } from "react";
import TextField, { TextFieldProps } from '@mui/material/TextField';
import { useSelector } from "react-redux";
import { RootState } from "redux/rootReducer";


type ControlTextFieldType = {
  value: any;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
} & TextFieldProps;

const ControlTextField: React.FC<ControlTextFieldType> = ({ value, onChange, label, ...props }) => {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const changeTheme = useSelector((state: RootState) => state.common.changeTheme);

  useEffect(() => {
    const storedTheme = window.localStorage.getItem('theme');
    const isSystemDarkMode = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
    const initialTheme = storedTheme && storedTheme !== 'system' ? storedTheme : (isSystemDarkMode ? 'dark' : 'light');
    setIsDarkMode(initialTheme === 'dark')
  }, [changeTheme]);

  return(
    <TextField
      variant="standard" 
      value={value} 
      onChange={onChange} 
      fullWidth 
      {...props}
      label={label}
      InputProps={{
        style: {
          color: isDarkMode ? 'white' : 'black',
        },
      }}
      InputLabelProps={{
        style: {
          color: isDarkMode ? 'white' : 'black',
        },
      }}
      sx={{
        '& .MuiOutlinedInput-notchedOutline': {
          borderColor: isDarkMode ? 'white' : 'black',
        },
        '& .MuiInput-underline:before': {
          borderBottomColor: isDarkMode ? 'white' : 'black',
        },
        '& .MuiInput-underline:hover:not(.Mui-disabled):before': {
          borderBottomColor: isDarkMode ? 'white' : 'black',
        },
      }}
    />
  )
}

export default ControlTextField;
