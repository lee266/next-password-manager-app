import {Controller, SubmitHandler, useForm } from "react-hook-form";
import { useTranslation } from 'next-i18next';
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { Stack, TextField, Button } from "@mui/material";

type Inputs = {
  email: string,
  password: string,
  againPassword: string,
}
 
export default function SignUp() {
  const { t } = useTranslation();

  const {
    control,
    handleSubmit,
  } = useForm<Inputs>({
  })

  const validationRules = {
    email: {
      required: '名前を入力してください。'
    }
  }

  const onSubmit: SubmitHandler<Inputs> = (data: Inputs) => {
    console.log(`submit: ${data.email}`);
  }

  return(
    <>
      <Stack component="form"
        onSubmit={handleSubmit(onSubmit)}
        spacing={2} sx={{ m: 2 ,width: '25ch'}}>
        <Controller
          name="email"
          control={control}
          rules={validationRules.email}
          render={({ field, fieldState}) => (
            <TextField
              {...field}
              type="email"
              label="email"
            />
          )}/>
          <Button variant="contained" type="submit">
            send
          </Button>
      </Stack>
    </>
  )
}

export async function getStaticProps({ locale }: any) {
  return {
    props: {
      ...(await serverSideTranslations(locale, ["common"])),
    }
  }
}