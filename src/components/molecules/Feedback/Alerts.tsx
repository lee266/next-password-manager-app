import { useCallback } from 'react';
import { Alert, AlertTitle, Slide, Snackbar } from '@mui/material';
import { AlertColor, SlideProps } from '@mui/material';

type AlertsType = {
  alertOpen: boolean;
  alertMessage: string;
  setAlertOpen: (value: boolean) => void;
  severity: AlertColor;
};
type TransitionProps = Omit<SlideProps, 'direction'>;

const TransitionRight = (props: TransitionProps) => {
  return <Slide {...props} direction="left" />;
};

const Alerts = (props: AlertsType) => {
  const handleClose = useCallback(() => {
    props.setAlertOpen(false);
  }, []);

  return (
    <div>
      <Snackbar
        autoHideDuration={5000}
        open={props.alertOpen}
        onClose={handleClose}
        TransitionComponent={TransitionRight}
      >
        <Alert severity={props.severity} onClose={handleClose} sx={{ width: '100%' }}>
          <AlertTitle>{props.severity}</AlertTitle>
          {props.alertMessage}
        </Alert>
      </Snackbar>
    </div>
  );
};

export default Alerts;
