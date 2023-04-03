import { useState } from "react";
import Input from '@mui/material/Input';
import IconButton from '@mui/material/IconButton';
import InputAdornment from '@mui/material/InputAdornment';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';

type PasswordTextFieldProps = {
  password: string;
};

const PasswordTextFiled = ({ password }: PasswordTextFieldProps)  => {
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [value, setValue] = useState<string>("]:^2:/");

  function handleClickShowPassword() {
    setShowPassword(!(showPassword));
    if (value == "]:^2:/") {
      setValue(password);
    } else {
      setValue("]:^2:/")
    }
    
  }

  return(
    <>
      <Input
        id="showPasswordButton"
        readOnly
        value={value}
        type={showPassword ? "text" : "password"}
        disableUnderline
        endAdornment={
          <InputAdornment position="end">
            <IconButton
              edge="end"
              onClick={handleClickShowPassword}
            >
              {showPassword ? <VisibilityOff/> : <Visibility/>}
            </IconButton>
          </InputAdornment>
        }
      />
    </>
  )
}

export default PasswordTextFiled;