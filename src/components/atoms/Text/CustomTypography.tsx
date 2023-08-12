import Typography, { TypographyProps as MuiTypographyProps } from '@mui/material/Typography';

type TypographyProps = MuiTypographyProps & {
  component?: React.ElementType;
};

type CustomTypographyProps = TypographyProps & {
  children: React.ReactNode;
  marginTop?: number; // 追加
};

const CustomTypography: React.FC<CustomTypographyProps> = ({ children, marginTop=4, ...props }) => {
  const marginTopClass = marginTop ? `mt-${marginTop}` : '';

  return (
    <Typography className={`${marginTopClass} dark:text-white`} {...props}>
      {children}
    </Typography>
  );
}

export default CustomTypography;