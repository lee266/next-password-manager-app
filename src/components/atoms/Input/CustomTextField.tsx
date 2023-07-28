import { useEffect, useState } from "react";
import { useTranslation } from "next-i18next";
import { FieldError } from "react-hook-form";
import TextField from '@mui/material/TextField';
import { useSelector } from "react-redux";
import { RootState } from "redux/rootReducer";


type TextFieldType = {
  id: string;
  label: string;
  error: FieldError | undefined;
  register: any;
  type?: string;
}


const CustomTextField: React.FC<TextFieldType> = ({ id, label, error, register, type='text' }) => {
  const { t } = useTranslation();
  const [isDarkMode, setIsDarkMode] = useState(false);
  const changeTheme = useSelector((state: RootState) => state.common.changeTheme);

  useEffect(() => {
    const initialTheme = window.localStorage.getItem('theme') || (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');
    setIsDarkMode(initialTheme === 'dark');
  }, [changeTheme]);

  return(
    <TextField
      id={id}
      label={label}
      type={type}
      error={!!error}
      helperText={error && t(`general.error.${error?.message}`)}
      {...register(id)}
      fullWidth
      margin='normal'
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
      }}
    />
  )
}

export default CustomTextField;