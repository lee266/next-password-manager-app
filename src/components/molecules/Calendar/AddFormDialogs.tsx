
// MUI 
import Button from "@mui/material/Button"
import Checkbox from "@mui/material/Checkbox"
import Dialog from "@mui/material/Dialog"
import DialogActions from "@mui/material/DialogActions"
import DialogContent from "@mui/material/DialogContent"
import DialogTitle from "@mui/material/DialogTitle"
import FormControlLabel from "@mui/material/FormControlLabel"
import TextField from "@mui/material/TextField"
// translation
import React, { useCallback, useState } from "react";
import { useTranslation } from 'next-i18next';
// validation rule
import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'
import { Controller, SubmitHandler, useForm } from 'react-hook-form';

import axios from 'axios';

type AddFormDialogType = {
  dialogOpen: boolean
  setDialogOpen: (value: boolean) => void
  mutate: (value: string) => void
  url: string
  defaultStart: string
  defaultEnd: string
}

type AddFromType = {
  title: string
  start: string
  end: string
  all_day: number | boolean
  email: string
  user: number
}

const AddFormDialog = (props:AddFormDialogType) => {
  const { t } = useTranslation();
  const [title, setTitle] = useState<string>("");
  const handleTitleChange = (event:React.ChangeEvent<HTMLInputElement>) => {
    setTitle(event.target.value);
  };
  const handleClose = useCallback(() => {
    props.setDialogOpen(false);
  }, []);

  const handleSave:SubmitHandler<AddFromType> = async(data) => {
    try {
      data['user'] = 1
      if (data.all_day == true) {
        data.all_day = 1
      } else {
        data.all_day = 0
      }
      const res = await axios.post(props.url, data);
      await props.mutate(props.url)
      props.setDialogOpen(false)
    } catch (error) {
      console.log(error);
    }
  }

  // validation rule 
  const schema = yup.object({
    title: yup.string().required(t("general.yup.required")!),
    start: yup.string().required(t("general.yup.required")!),
    end: yup.string().required(t("general.yup.required")!),
    all_day : yup.boolean(),
  });
  const { 
    register, 
    control,
    handleSubmit, 
    formState: { errors } 
  } = useForm<AddFromType>({
    resolver: yupResolver(schema)
  });


  // const [value, setValue] = React.useState<Dayjs | null>(
  //   dayjs('2014-08-18T21:11:54'),
  // );

  // const handleChange = (newValue: Dayjs | null) => {
  //   setValue(newValue);
  // };

  // const handleCheckboxChange = (e, field) => {
  //   field.onChange(e.target.checked)
  // }


  return(
    <div>
      <Dialog open={props.dialogOpen} onClose={handleClose}>
        <DialogTitle>Add Event</DialogTitle>
        <form autoComplete='new-password'>
          <DialogContent>
            <TextField
              id="title"
              label={t("general.auth.title")}
              onChange={(e) => setTitle(e.target.value)}
              value={title}
              autoComplete="new-password"
              autoFocus
              required
              inputProps={{required:true,}}
              margin="normal"
              fullWidth
              // {...register('title')}
              error={'title' in errors}
              helperText={errors.title?.message}
            />
            <TextField
              id="start"
              label="start date"
              type="datetime-local"
              autoComplete='off'
              // type="date"
              inputProps={{required:true,}}
              required
              margin="normal"
              autoFocus
              InputLabelProps={{
                shrink: true,
              }}
              defaultValue={props.defaultStart}
              {...register('start')}
              error={'start' in errors}
              helperText={errors.start?.message}
            />
            <TextField
              id="end"
              label="end date"
              type="datetime-local"
              autoComplete='off'
              // type="date"
              required
              margin="normal"
              inputProps={{required:true,}}
              autoFocus
              InputLabelProps={{
                shrink: true,
              }}
              defaultValue={props.defaultEnd}
              {...register('end')}
              error={'end' in errors}
              helperText={errors.end?.message}
            />
            <Controller
              name="all_day"
              control={control}
              render={({ field }) => (
                <FormControlLabel
                  control={
                    <Checkbox
                      color="primary"
                      onChange={(e) => field.onChange(e.target.checked)}
                    />
                  }
                  label="all-day"
                />
              )}
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose}>Cancel</Button>
            <Button onClick={handleSubmit(handleSave)}>Save</Button>
          </DialogActions>
        </form>
      </Dialog>
    </div>
  )
}

export default AddFormDialog;