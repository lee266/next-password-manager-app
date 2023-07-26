import { useTranslation } from 'next-i18next';
import { zodResolver } from "@hookform/resolvers/zod";
import { createInquiry, getInquiryCategories } from "api/inquiry/crud";
import { useEffect, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { Inquiry, InquiryCategory, InquirySchema } from "types/models/Inquiry";
import { getToken } from "utils/auth";
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import FormHelperText from '@mui/material/FormHelperText';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import AddButton from 'components/atoms/Button/AddButton';
import { Controller } from "react-hook-form";
import Box from '@mui/system/Box';
import { Alert } from 'redux/Feedback/types';
import { addAlert } from 'redux/Feedback/reducer';
import { useDispatch } from 'react-redux';


const InquiryForm = () => {
  const [InquiryCategories, setInquiryCategories] = useState<InquiryCategory[]>([]);
  const token = getToken();
  const { t } = useTranslation();
  const dispatch = useDispatch();

  const form = useForm<Inquiry>({
    resolver: zodResolver(InquirySchema),
    defaultValues: { 
      inquiry_content: '',
      status: 'UNREAD',
      inquiry_category: '',
    }
  })

  const { register, handleSubmit, formState: { errors }, reset } = form;

  useEffect(() => {
    const fetchData = async () => {
      const token = getToken();
      try {
        const categories = await getInquiryCategories(token);
        setInquiryCategories(categories);
      } catch (error) {
        console.error(error);
      }
    }

    fetchData();
  }, [])

  const onSubmit: SubmitHandler<Inquiry> = async (data) => {
    console.log(data);
    
    try {
      await createInquiry(data, token);
      const alert: Alert = {message: "送信に成功しました。", severity: 'success',}
      dispatch(addAlert(alert));
      reset();
    } catch (error) {
      const alert: Alert = {message: "送信に失敗しました。testerif0@gmail.comに連絡ください", severity: 'error',}
      dispatch(addAlert(alert));    }
  };

  return(
    <div className='mt-2'>
      <Typography variant="h4" component="h2" align="center" gutterBottom>
        {t('component.dialog.title.inquiry')}
      </Typography>
      <form id='inquiry-form' onSubmit={handleSubmit(onSubmit)}>
        <Box mb={4}>
          <Typography variant="body1" component="h3">
            {t('component.dialog.explain.inquiry_category_explanation')}
          </Typography>
          <FormControl className="mt-2"  fullWidth>
            <InputLabel id='inquiry_category_label'>{t('component.form.inquiryCategory')}</InputLabel>
            <Controller
              name="inquiry_category"
              control={form.control}
              defaultValue=""
              render={({ field }) => (
                <Select
                  id='inquiry_category'
                  label={t('component.form.inquiryCategory')}
                  labelId='inquiry_category_label'
                  fullWidth
                  {...field}
                  error={!!errors.inquiry_category}
                >
                  {InquiryCategories.map((category) => (
                    <MenuItem key={category.id} value={category.id}>{t(`component.menu.${category.category_name}`)}</MenuItem>
                  ))}
                </Select>
              )}
            />
            <FormHelperText>{errors.inquiry_category?.message}</FormHelperText>
          </FormControl>
        </Box>
        <Box mb={4}>
          <Typography variant="body1" component="h3">
            {t('component.dialog.explain.inquiry_content_explanation')}
          </Typography>
          <FormControl fullWidth>
            <TextField
              className="mt-2"
              id="inquiry_content"
              label={t('component.form.inquiryContent')}
              {...register('inquiry_content')}
              error={!!errors.inquiry_content}
              multiline
              rows={4}
            />
            <FormHelperText>{errors.inquiry_content?.message}</FormHelperText>
          </FormControl>
        </Box>
      </form>
      <Box display="flex" justifyContent="center" mt={2}>
        <AddButton name={t('component.button.sent')} form='inquiry-form' type='submit' />
      </Box>
    </div>
  )
}

export default InquiryForm;
