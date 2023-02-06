import * as React from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';

import styles from '../styles/main.module.scss';

// MUI 
import { 
  Box, Button, Container, FormControl, IconButton, Input,
  InputAdornment, InputLabel, OutlinedInput, TextField, Typography, FormHelperText
} from '@mui/material';
import { Visibility, VisibilityOff} from '@mui/icons-material'

// with typescript
import { GetStaticProps, NextPage } from "next"

// translation
import { useTranslation } from "next-i18next"
import { serverSideTranslations } from "next-i18next/serverSideTranslations"

// validation rule
import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'

type testType = {
  email: string
  username: string
  password: string
}


const test: NextPage<testType> = ({}) => {
  const { t } = useTranslation();
  // validation rule 
  const schema = yup.object({
    email: yup.string().required(t("general.error.require")!).email(),
    username: yup.string().required(t("general.error.require")!),
    password: yup.string().required(t("general.error.require")!),
  });
  const { register, handleSubmit, formState: { errors } } = useForm<testType>({
    resolver: yupResolver(schema)
  });
  // password show function if click eye icon ,password show or hide  
  const [showPassword, setShowPassword] = React.useState(false);
  const handleClickShowPassword = () => setShowPassword((show) => !show);
  const handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
  };

  const onSubmit: SubmitHandler<testType> = (data) => {
    // バリデーションチェックOK！なときに行う処理を追加
    console.log(data)
  }
  
  return (
    <>
      <Box className={styles.content}>
        <Container maxWidth="xs">
          <Typography component="h1" variant="h5">
            {t("general.auth.signUp")}
          </Typography>
          <Box component="form">
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              inputProps={{required:true,}}
              label={t("general.auth.email")}
              autoComplete="email"
              autoFocus
              {...register('email')}
              error={'email' in errors}
              helperText={errors.email?.message}
            />
            <TextField
              id="username"
              type="username"
              margin="normal"
              required
              fullWidth
              label={t("general.auth.username")}
              autoComplete="username"
              {...register('username')}
              error={'username' in errors}
              helperText={errors.username?.message}
            />
            <FormControl 
              variant="outlined" 
              fullWidth 
              margin='normal'
              error={'password' in errors}
              >
              <InputLabel htmlFor="password" required>{t("general.auth.password")}</InputLabel>
              <OutlinedInput
                id="password"
                type={showPassword ? 'text' : 'password'}
                required
                endAdornment={
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={handleClickShowPassword}
                      onMouseDown={handleMouseDownPassword}
                      edge="end"
                    >
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                }
                label={t("general.auth.username")}
                {...register('password')}
              />
              <FormHelperText required>{errors.password?.message}</FormHelperText>
            </FormControl>
            <Button
              variant='contained'
              onClick={handleSubmit(onSubmit)}
            >
              {t("general.auth.signUp")}
            </Button>
          </Box>
        </Container>
      </Box>
    </>
  )
}


/**
 * locale: the value identifies and retrieves your country from URL(Sub-path Routing)
 * ex) if your route is localhost, the value is ja
 *     if your route is localhost/en, the value is en  
*/
export const getStaticProps: GetStaticProps = async ({
  locale,
}) => {
  // please check log in docker password_next  if you want to see console.log
  console.log(locale);
  const translations = await serverSideTranslations(locale!, ["common"])
  return {
    props: {
      ...translations
    },
  }
}

export default test;