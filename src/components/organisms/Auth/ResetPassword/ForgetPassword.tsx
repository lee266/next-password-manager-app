import { useTranslation } from "next-i18next";
// MUI 
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import CustomLink from "components/atoms/CustomLink";
import ForgetPasswordForm from "components/molecules/Form/ForgetPasswordForm";

const ForgetPassword = () => {
  const { t } = useTranslation();
  return(
    <div>
      <Box
        sx={{
          marginTop: 8,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
      }}>
        <Typography component="h1" variant="h5">
          {t("general.auth.resetPassword")}
        </Typography>
        <ForgetPasswordForm/>
        <CustomLink href="/login2">
          back
        </CustomLink>
      </Box>
    </div>
  )
}

export default ForgetPassword;
