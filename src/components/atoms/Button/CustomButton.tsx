import { useTranslation } from "next-i18next";
import Button from '@mui/material/Button';
import CircularProgress from "@mui/material/CircularProgress";

type ButtonType = {
  isSubmitting: boolean;
  type?: "button" | "submit" | "reset" | undefined;
  fullWidth?: boolean;
  onClick: () => void;
  buttonText: string;
}

const CustomButton: React.FC<ButtonType> = ({isSubmitting, type = "button", fullWidth = false, onClick, buttonText}) => {
  const { t } = useTranslation();

  return(
    <Button
      className="bg-blue-500 dark:bg-primary-dark"
      type={type}
      fullWidth={fullWidth}
      variant="contained"
      sx={{ mt: 3, mb: 2 }}
      onClick={onClick}
      disabled={isSubmitting}
    >
      {isSubmitting ? 
        <CircularProgress size={24} color="primary" /> : t("component.button."+buttonText)
      }
    </Button>
  )
}

export default CustomButton;