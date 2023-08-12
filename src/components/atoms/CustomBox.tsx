import Box from '@mui/material/Box';

type CustomBoxProps = {
  children: React.ReactNode;
  maxHeight?: string | number;
  my?: number | string; // 追加
};

const CustomBox: React.FC<CustomBoxProps> = ({ children, maxHeight = 'auto', my = 0 }) => {
  return(
    <Box 
      className="bg-back dark:bg-back-subDark" 
      p={1} 
      my={my} 
      style={{ maxHeight, overflowY: 'auto', lineHeight: '1em' }}
    >
      {children}
    </Box>
  );
}

export default CustomBox;
