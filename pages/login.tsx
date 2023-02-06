import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import styles from '../styles/Home.module.scss';
import Copyright from '../components/molecules/Copyright';

import { useTranslation } from 'next-i18next';
import { serverSideTranslations } from "next-i18next/serverSideTranslations";

import Cookie from 'universal-cookie';
import { useRouter } from 'next/router';
import { useState } from 'react';

type loginType = {
  email: string
  username: string
  password: string
}

const cookie = new Cookie();
const theme = createTheme();

export default function SignIn() {
  const { t } = useTranslation();
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLogin, setIsLogin] = useState(true);

  const login = async () => {
    try {
      await fetch(
        `${process.env.NEXT_PUBLIC_RESTAPI_URL}api/auth/jwt/create/`,
        {
          method: "POST",
          body: JSON.stringify({email:email, password: password}),
          headers: {
            "Content-Type": "application/json"
          }
        }
      ).then((res) => {
        if (res.status === 400) {
          console.log("create jwt error 400");
          throw "authentication failed"
        }else if (res.ok) {
          console.log("correct create jwt");
          return res.json();
        }else {
          console.log("jwt create error");
        }
      }).then((data) => {
        const options = {path: "/"};
        console.log(data.access);
        cookie.set("access_token", data.access, options);
      });
      getUser();
    } catch (error) {
      alert(error);
    }
  }

  const getUser = async() => {
    try {
      const accessToken = cookie.get("access_token")
      await fetch(
        `${process.env.NEXT_PUBLIC_RESTAPI_URL}api/auth/users/me/`,
        {
          method: "GET",
          headers: {
            "Authorization": `JWT ${accessToken}`
          }
        }
      ).then((res) => {
        if (res.status === 400) {
          console.log("can't get user data 400");
          throw "authentication failed"
        }else if (res.ok) {
          console.log("can get user data");
          return res.json();
        }else {
          console.log("can't get user");
        }
      }).then((data) => {
        console.log(data);
        const options = {path: "/"}
        cookie.set("id", data.id, options);
        // router.push("/");
      })
    }catch (error) {
      alert(error);
    }
  }

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (isLogin) {
      login();
    }else {
      login();
    }
  };

  return (
    <Box className={styles.main}>
      <ThemeProvider theme={theme}>
        <Container component="main" maxWidth="xs">
          <CssBaseline />
          <Box
            sx={{
              marginTop: 8,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
            }}>
            <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
              <LockOutlinedIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
              {t("general.auth.signIn")}
            </Typography>
            <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
              <TextField
                margin="normal"
                required
                fullWidth
                id="email"
                inputProps={{required:true,}}
                label={t("general.auth.email")}
                name="email"
                autoComplete="email"
                autoFocus
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                }}
              />
              <TextField
                margin="normal"
                required
                fullWidth
                name="password"
                label={t("general.auth.password")}
                type="password"
                id="password"
                autoComplete="current-password"
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                }}
              />
              <FormControlLabel
                control={<Checkbox value="remember" color="primary" />}
                label="Remember me"
              />
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
              >
                {t("general.auth.signIn")}
              </Button>
              <Grid container>
                <Grid item xs>
                  <Link href="#" variant="body2">
                    {t("general.auth.forgotPassword") + "?"}
                  </Link>
                </Grid>
                <Grid item>
                  <Link href="/signup" variant="body2">
                    {t("general.auth.noAccount") + "?" + t("general.auth.pleaseSignUp")}
                  </Link>
                </Grid>
              </Grid>
            </Box>
          </Box>
          <Copyright sx={{ mt: 8, mb: 4 }} />
        </Container>
      </ThemeProvider>
    </Box>
  );
}

export async function getStaticProps({ locale }: any) {
  return {
    props: {
      ...(await serverSideTranslations(locale, ["common"])),
    }
  }
}
