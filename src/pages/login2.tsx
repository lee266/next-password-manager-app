import { useState } from "react";
/* eslint-disable react-hooks/rules-of-hooks */
import { GetStaticProps, NextPage } from "next";
import styles from '../styles/Home.module.scss';
// translation
import { useTranslation } from "next-i18next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
// validation rule
import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'
import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import { createJwt } from "api/auth/jwt";
// Components 
import Alerts from "components/molecules/Feedback/Alerts";
// Redux
import { useRouter } from "next/router";
import { useDispatch } from "react-redux";
import { fetchUserDataRequest } from "redux/users/reducer";
// MUI 
import Box from "@mui/material/Box";
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Copyright from '../components/molecules/Copyright';
import { AlertColor } from "@mui/material";
import { saveToken } from "utils/auth";
import { useSelector } from "react-redux";
import { RootState } from "redux/rootReducer";
import Alerts2 from "components/molecules/Feedback/Alerts2";


type loginType = {
  locale: string
}

type AddFromType = {
  email: string
  user: number
  password:string
}


const login2: NextPage<loginType> = ( props ) => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const user = useSelector((state: RootState) => state.user.user);
  const router = useRouter();
  // Alert States
  const [alertOpen, setAlertOpen] = useState<boolean>(false);
  const [severity, setSeverity] = useState<AlertColor>("info");
  const [alertMessage, setAlertMessage] = useState<string>("");
  // validation rule 
  const schema = yup.object().shape({
    email: yup.string()
      .required(t("general.yup.required")!)
      .email("Invalid email address"),
    password: yup.string()
      .required(t("general.yup.required")!),
  });

  const { 
    register, 
    handleSubmit, 
    formState: { errors } 
  } = useForm<AddFromType>({
    resolver: yupResolver(schema)
  });

  const onSubmit: SubmitHandler<AddFromType> = async(data) => {
    const token = await createJwt(data);
    if (token) {
      console.log(token);
      saveToken(token.data.access);
      const accessKey:string = token.data.access
      dispatch(fetchUserDataRequest({token: accessKey}))
      console.log("user",user);
      // console.log("delete user", user);
      router.push("/");
    }else{
      setAlertOpen(true)
      setSeverity("error")
      setAlertMessage('loginに失敗しました')
    }
  }

  return (
    <Box className={styles.main}>
      <Container component="main" maxWidth="xs">
        <Alerts
          alertOpen={alertOpen}
          alertMessage={alertMessage}
          setAlertOpen={setAlertOpen}
          severity={severity}
        />
        <Alerts2/>
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            {t("general.auth.login")}
          </Typography>
          <Box component="form" onSubmit={handleSubmit(onSubmit)} noValidate sx={{ mt: 1 }}>
            <TextField
              id="email"
              label={t("general.auth.email")}
              margin="normal"
              required
              fullWidth
              autoComplete="email"
              autoFocus
              {...register('email')}
              error={!!errors.email}
              helperText={errors.email?.message}
            />
            <TextField
              id="password"
              label={t("general.auth.password")}
              {...register('password')}
              margin="normal"
              required
              fullWidth
              type="password"
              autoComplete="current-password"
              error={!!errors.password}
              helperText={errors.password?.message}
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              {t("component.button.login")}
            </Button>
            <Grid container>
              <Grid item xs>
                <Link href="#" variant="body2">
                  {t("general.auth.forgotPassword") + "?"}
                </Link>
              </Grid>
              <Grid item>
                <Link href="/sign-up" variant="body2">
                  {t("general.auth.noAccount") + "?" + t("general.auth.pleaseSignUp")}
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
        <Copyright sx={{ mt: 8, mb: 4 }} />
      </Container>
    </Box>
  )
}

export const getStaticProps: GetStaticProps = async({
  locale,
}) => {
  // please check log in docker password_next  if you want to see console.log
  console.log(locale);
  const translations = await serverSideTranslations(locale!, ["common"])
  return {
    props: {
      locale,
      ...translations
    },
  }
}

export default login2;