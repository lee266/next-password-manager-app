import { useState } from "react";
import  Visibility  from "@mui/icons-material/Visibility";
import  VisibilityOff  from "@mui/icons-material/VisibilityOff";
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import { useDispatch } from "react-redux";
import { addAlert } from "redux/Feedback/reducer";
import { Alert } from "redux/Feedback/types";

type PasswordTextPropsType = {
  text?: string
  labelId?: string
}

/*
  problem
    - You can see password value if you use develop tool(Elements).
  about
    - this is ok Because the user is logged in,
    - Please fix the problem to make it more secure
*/

const PasswordText = ({ text = '', labelId = '' }: PasswordTextPropsType) => {
  const [passwordVisible, setPasswordVisible] = useState<boolean>(false);
  const dispatch = useDispatch();

  const togglePasswordVisibility = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.stopPropagation();
    setPasswordVisible(!(passwordVisible));
  } 

  const handleCopyClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.stopPropagation();
    try {
      navigator.clipboard.writeText(text || '');
      const alert: Alert = {
        message: "パスワードをクリップボードにコピーしました",
        severity: "success",
      };
      dispatch(addAlert(alert));
    } catch (error: any) {
      const alert: Alert = { message: "パスワードのコピーに失敗しました。", severity: "error" };
      dispatch(addAlert(alert));
    }
  };

  return(
    <div className="text-gray-700 flex mr-1 dark:text-white">
      <label className="mr-1" htmlFor={"passwordInput" + (labelId || '')}>
        Password:
      </label>
      <input
        id={"passwordInput" + labelId}
        type={passwordVisible ? 'text' : 'password'}
        value={passwordVisible ? text : "*******"}
        className="mr-2 bg-transparent border-none focus:bg-transparent focus:outline-none focus:border-transparent" 
        readOnly
        />
      {/* eye icon button set password visible or not */}
      <button
        type="button"
        onClick={togglePasswordVisibility}
        className="bg-transparent focus:bg-transparent mr-2"
        aria-label={passwordVisible ? 'Hide password' : 'Show password'}
      >
        {passwordVisible? <VisibilityOff /> : <Visibility />}
      </button>
      {/* copy button  */}
      <button type="button" onClick={handleCopyClick} aria-label="Copy password">
        <ContentCopyIcon />
      </button>
    </div>
  )
}

export default PasswordText;
