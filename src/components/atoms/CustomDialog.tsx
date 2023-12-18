import Dialog from '@mui/material/Dialog';

type CustomDialogProps = {
  children: React.ReactNode;
  params: {
    open: boolean;
    ariaLabelledBy: string;
    close: () => void;
  };
};

const CustomDialog: React.FC<CustomDialogProps> = ({ children, params }) => {
  return (
    <Dialog
      className="dark:bg-primary-dark"
      fullScreen
      open={params.open}
      aria-labelledby={params.ariaLabelledBy}
      scroll="paper"
      color="primary"
      onClose={params.close}
    >
      {children}
    </Dialog>
  );
};

export default CustomDialog;
