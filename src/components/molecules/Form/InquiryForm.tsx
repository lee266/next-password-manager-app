import { useTranslation } from 'next-i18next';
import { zodResolver } from '@hookform/resolvers/zod';
import { createInquiry, getInquiryCategories } from 'api/inquiry/crud';
import { useEffect, useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { Inquiry, InquiryCategory, InquirySchema } from 'types/models/Inquiry';
import { getToken } from 'utils/auth';
import FormControl from '@mui/material/FormControl';
import FormHelperText from '@mui/material/FormHelperText';
import AddButton from 'components/atoms/Button/AddButton';
import Box from '@mui/system/Box';
import { Alert } from 'redux/Feedback/types';
import { addAlert } from 'redux/Feedback/reducer';
import { useDispatch } from 'react-redux';
import CustomTextArea from 'components/atoms/Input/CustomTextArea';
import CustomSelect from 'components/atoms/Input/CustomSelect';
import CustomMenuItem from 'components/atoms/Menu/CustomMenuItem';
import CustomTypography from 'components/atoms/Text/CustomTypography';

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
    },
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = form;

  useEffect(() => {
    const fetchData = async () => {
      const token = getToken();
      try {
        const categories = await getInquiryCategories(token);
        setInquiryCategories(categories);
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, []);

  const onSubmit: SubmitHandler<Inquiry> = async (data) => {
    console.log(data);

    try {
      await createInquiry(data, token);
      const alert: Alert = { message: '送信に成功しました。', severity: 'success' };
      dispatch(addAlert(alert));
      reset();
    } catch (error) {
      const alert: Alert = { message: '送信に失敗しました。testerif0@gmail.comに連絡ください', severity: 'error' };
      dispatch(addAlert(alert));
    }
  };

  return (
    <div className="mt-4">
      <CustomTypography variant="h4" component="h2" align="center" gutterBottom>
        {t('component.dialog.title.inquiry')}
      </CustomTypography>
      <form id="inquiry-form" onSubmit={handleSubmit(onSubmit)}>
        <Box mb={4}>
          <CustomTypography variant="body1" component="h3">
            {t('component.dialog.explain.inquiry_category_explanation')}
          </CustomTypography>
          <CustomSelect
            id="inquiry_category"
            label={t('component.form.inquiryCategory')}
            register={register}
            error={errors.inquiry_content}
          >
            {InquiryCategories.map((category) => (
              <CustomMenuItem key={category.id} value={category.id}>
                {t(`component.menu.${category.category_name}`)}
              </CustomMenuItem>
            ))}
          </CustomSelect>
        </Box>
        <Box mb={4}>
          <CustomTypography variant="body1" component="h3">
            {t('component.dialog.explain.inquiry_content_explanation')}
          </CustomTypography>
          <FormControl fullWidth>
            <CustomTextArea
              id="inquiry_content"
              label={t('component.form.inquiryContent')}
              register={register}
              error={errors.inquiry_content}
            />
            <FormHelperText>{errors.inquiry_content?.message}</FormHelperText>
          </FormControl>
        </Box>
      </form>
      <Box display="flex" justifyContent="center" mt={2}>
        <AddButton name={t('component.button.sent')} form="inquiry-form" type="submit" />
      </Box>
    </div>
  );
};

export default InquiryForm;
