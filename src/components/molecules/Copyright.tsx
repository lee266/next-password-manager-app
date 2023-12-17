import Link from 'next/link';
import Typography from '@mui/material/Typography';


export default function Copyright(props:any) {
  return (
    <Typography className='text-white' variant="body2" color="text.secondary" align="center" {...props}>
      {'Copyright © '}
      <Link color="inherit" href="/">
        Password Manager
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}