import React, { useCallback } from 'react';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { RootState } from 'redux/rootReducer';
import { closeSnackbar, removeAlert } from 'redux/Feedback/reducer';
import Alert from '@mui/material/Alert';
import AlertTitle from '@mui/material/AlertTitle';
import Slide, { SlideProps } from '@mui/material/Slide';
import Snackbar from '@mui/material/Snackbar';

type TransitionProps = Omit<SlideProps, 'direction'>;

const TransitionRight = (props: TransitionProps) => {
  return <Slide {...props} direction="left" />;
};

const Alerts2 = () => {
  const dispatch = useDispatch();
  const { alerts, open } = useSelector((state: RootState) => state.alert);

  const handleClose = useCallback(
    (message: string) => {
      dispatch(removeAlert(message));
    },
    [dispatch]
  );

  const handleCloseSnackbar = useCallback(
    async (message: string) => {
      // console.log("Active handleCloseSnackbar");
      await dispatch(removeAlert(message));
      // console.log(alerts.length);

      if (alerts.length === 0) {
        dispatch(closeSnackbar());
      }
    },
    [dispatch, alerts]
  );

  if (alerts.length === 0) {
    return null; // don't render anything if there are no alerts
  }

  return (
    <div className="alerts">
      {alerts.map((alert, index) => (
        <Snackbar
          key={index}
          autoHideDuration={5000}
          open={open}
          onClose={() => handleCloseSnackbar(alert.message)}
          TransitionComponent={TransitionRight}
          anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
        >
          <Alert severity={alert.severity} onClose={() => handleClose(alert.message)} sx={{ width: '100%' }}>
            <AlertTitle>{alert.severity}</AlertTitle>
            {alert.message}
          </Alert>
        </Snackbar>
      ))}
    </div>
  );
};

export default Alerts2;
