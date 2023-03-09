import React, { useCallback } from "react";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { RootState } from "redux/rootReducer";
import { closeSnackbar, removeAlert } from "redux/Feedback/reducer";
import { Alert as AlertType } from "redux/Feedback/types";
import Alert from "@mui/material/Alert";
import AlertTitle from "@mui/material/AlertTitle";
import Slide, { SlideProps } from "@mui/material/Slide";
import Snackbar from "@mui/material/Snackbar";

type TransitionProps = Omit<SlideProps, 'direction'>;

const TransitionRight = (props:TransitionProps) => {
  return <Slide {...props} direction="left" />;
}

const Alerts2 = () => {
  const dispatch = useDispatch();
  const { alerts, open } = useSelector((state: RootState) => state.alert);

  const handleClose = useCallback((message: string) => {
    dispatch(removeAlert(message));
  }, [dispatch]);

  const handleCloseSnackbar = useCallback(() => {
    dispatch(closeSnackbar());
  }, [dispatch])
  
  useEffect(() => {
    alerts.forEach((alert: AlertType) => {
      setTimeout(() => {
        handleClose(alert.message);
      }, 5000)
    })
  }, [alerts, handleClose]);

  return(
    <div>
      {alerts.map((alert, index) => (
        <Snackbar 
          key={index}
          autoHideDuration={5000} 
          open={open} 
          onClose={handleCloseSnackbar} 
          TransitionComponent={TransitionRight}
        >
          <Alert
            severity={alert.severity} 
            onClose={() => handleClose(alert.message)} 
            sx={{width: '100%'}}
          >
            <AlertTitle>{alert.severity}</AlertTitle>
            {alert.message}
          </Alert>
        </Snackbar>
      ))}
    </div>
  )
}

export default Alerts2;
