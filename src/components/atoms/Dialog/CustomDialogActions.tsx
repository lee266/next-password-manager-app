import DialogActions from '@mui/material/DialogActions';

type CustomDialogActionsType = {
  children: React.ReactNode;
};

const CustomDialogActions: React.FC<CustomDialogActionsType> = ({ children }) => {
  return <DialogActions className="dark:bg-primary-dark">{children}</DialogActions>;
};

export default CustomDialogActions;
