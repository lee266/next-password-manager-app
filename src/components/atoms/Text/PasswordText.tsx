import { useState } from "react";
import  Visibility  from "@mui/icons-material/Visibility";
import  VisibilityOff  from "@mui/icons-material/VisibilityOff";
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
// Alert 
import { useDispatch } from "react-redux";
import { addAlert } from "redux/Feedback/reducer";
import { Alert } from "redux/Feedback/types";

type PasswordTextPropsType = {
  text: string
  labelId: string
}

/*
  problem
    - You can see password value if you use develop tool.
*/

const PasswordText = (props: PasswordTextPropsType) => {
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const defaultValue = "*******"
  const value = props.text
  const dispatch = useDispatch();

  const togglePasswordVisibility = () => setShowPassword(!(showPassword));
  const handleCopyClick = () => {
    try {
      navigator.clipboard.writeText(value);
      const alert: Alert = {
        message: "パスワードをクリップボードにコピーしました",
        severity: "success",
      }
      dispatch(addAlert(alert));
    } catch (error: any) {
      const alert: Alert = {
        message: error.message,
        severity: "error",
      }
      dispatch(addAlert(alert));
    }
  };

  return(
    <div className="text-gray-700 flex">
      {/* display password  */}
      <label className="mr-1" htmlFor={"passwordInput" + props.labelId}>
        Password:
      </label>
      <input
        id={"passwordInput" + props.labelId}
        type={showPassword ? 'text' : 'password'}
        readOnly
        value={showPassword ? value : defaultValue}
        className="mr-2 bg-transparent border-none focus:bg-transparent focus:outline-none focus:border-transparent" 
      />
      {/* eye button */}
      <button
        type="button"
        onClick={togglePasswordVisibility}
        className="bg-transparent focus:bg-transparent mr-2"
        aria-label={showPassword ? 'Hide password' : 'Show password'}
      >
        {showPassword? <VisibilityOff /> : <Visibility />}
      </button>
      {/* copy button  */}
      <button
        onClick={handleCopyClick}
        aria-label="Copy password"
      >
        <ContentCopyIcon />
      </button>
    </div>
  )
}

export default PasswordText;
