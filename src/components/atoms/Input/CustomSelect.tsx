import Select from '@mui/material/Select';
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';
import { useEffect, useState } from 'react';
import { FieldError } from "react-hook-form";
import { useSelector } from "react-redux";
import { RootState } from "redux/rootReducer";


type CustomSelectType = {
  id: string;
  label: string;
  error: FieldError | undefined;
  register: any;
  children: React.ReactNode
  value?: any
  inputProps?: any;
}

const CustomSelect: React.FC<CustomSelectType> = ({ id, label, error, register, children, value, inputProps }) => {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const changeTheme = useSelector((state: RootState) => state.common.changeTheme);

  useEffect(() => {
    const storedTheme = window.localStorage.getItem('theme');
    const isSystemDarkMode = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
    const initialTheme = storedTheme && storedTheme !== 'system' ? storedTheme : (isSystemDarkMode ? 'dark' : 'light');
    setIsDarkMode(initialTheme === 'dark')
  }, [changeTheme]);

  return(
    <FormControl className='mt-4 mb-3' fullWidth >
      <InputLabel id={id} style={{ color: isDarkMode ? 'white' : 'black' }}>
        {label}
      </InputLabel>
      <Select
        id={id}
        label={label}
        fullWidth
        {...register(id)}
        error={!!error}
        value={value}
        inputProps={inputProps}
        MenuProps={{
          sx: {
            '.MuiMenu-paper': {
              backgroundColor: isDarkMode ? '#1A2229': '#fff',
            },
            '.MuiMenuItem-root': {
              backgroundColor: isDarkMode ? '#1A2229': '#fff',
            },
          },
        }}
        sx={{
          color: isDarkMode ? 'white' : 'black',
          '& .MuiOutlinedInput-notchedOutline': {
            borderColor: isDarkMode ? 'white' : 'black',
          },
          '& .MuiSelect-icon': {
            color: isDarkMode ? 'white' : 'black',
          },
        }}
      >
        {children}
      </Select>
    </FormControl>
  )
}

export default CustomSelect;
