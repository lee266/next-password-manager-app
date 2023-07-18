import { useCallback } from "react";
// MUI
import { Button, Dialog, DialogActions, DialogContent, IconButton, Typography } from "@mui/material";
import { Clear, DeleteOutline, ModeEditTwoTone } from "@mui/icons-material";

import axios from 'axios';

type SelectDataDialogType = {
  dialogOpen: boolean
  setDialogOpen: (value: boolean) => void
  calendarId: string
  url: string
  mutate: (value: string) => void
  eventData: any  
}

const SelectDataDialogs = (props:SelectDataDialogType) => {
  const handleClose = useCallback(() => {
    props.setDialogOpen(false)
  }, []);

  const deleteCalendarData= useCallback(
    async() => {
      try {
        // console.log("- data delete");
        // console.log(props.eventData);
        const res = await axios.delete(props.url+props.calendarId);
        // console.log("res:", res);
        await props.mutate(props.url)
        props.setDialogOpen(false)
      } catch (error) {
        console.log("error");
      }
    },[]
  )

  // const openEditDialog = () => {
  // }

  return(
    <div>
      <Dialog open={props.dialogOpen} onClose={handleClose}>
        <form>
          <DialogContent>
            <div>
              <IconButton aria-label="Example">
                <ModeEditTwoTone/>
              </IconButton>
              <IconButton onClick={deleteCalendarData}>
                <DeleteOutline/>
              </IconButton>
              <IconButton onClick={handleClose}>
                <Clear/>
              </IconButton>
            </div>
            <Typography>
              {props.eventData.title}
            </Typography>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose}>Cancel</Button>
          </DialogActions>
        </form>
      </Dialog>
    </div>
  )
}

export default SelectDataDialogs;