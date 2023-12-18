import DialogContent from '@mui/material/DialogContent';

type CustomDialogContentType = {
  children: React.ReactNode;
};

const CustomDialogContent: React.FC<CustomDialogContentType> = ({ children }) => {
  return (
    <DialogContent dividers className="dark:bg-back-rightDark">
      {children}
    </DialogContent>
  );
};

export default CustomDialogContent;
