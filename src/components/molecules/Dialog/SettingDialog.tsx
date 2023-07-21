import { useState } from "react";
import { useTranslation } from "next-i18next";
import { useDispatch } from "react-redux";
import { closeSettingDialog, setSideBarPosition } from "redux/Common/reducer";
import { useSelector } from "react-redux";
import { RootState } from "redux/rootReducer";
import CustomDialog from "components/atoms/CustomDialog";
import CustomDialogTitle from "components/atoms/CustomDialogTitle";
import DialogActions from '@mui/material/DialogActions';
import DialogContent from "@mui/material/DialogContent";
import RadioGroup from '@mui/material/RadioGroup';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import CustomRadio from "components/atoms/Input/CustomRadio";
import Button from '@mui/material/Button';




const SettingDialog = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const open = useSelector((state: RootState) => state.common.openSettingDialog);
  const [sideBarPosition, setSideBarPositionState] = useState("left");

  const handleSave = () =>{
    dispatch(setSideBarPosition(sideBarPosition));
    dispatch(closeSettingDialog());
  }

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSideBarPositionState((event.target as HTMLInputElement).value);
  };

  return(
    <div className="setting-dialog">
      <CustomDialog params={{
        open: open, 
        ariaLabelledBy: "setting-dialog", 
        close: () => dispatch(closeSettingDialog())
      }}>
        <CustomDialogTitle
          title={t('component.dialog.title.setting')}
          close={() => dispatch(closeSettingDialog())}
        />
        <DialogContent dividers>
          <form>
            <FormControl>
              <FormLabel id="side-nav-position">サイドナビゲーションバー</FormLabel>
              <RadioGroup
                row
                aria-labelledby="side-nav-position"
                name="side-nav-position"
                value={sideBarPosition}
                onChange={handleChange}
              >
                <CustomRadio value="left" label="左側"/>
                <CustomRadio value="right" label="右側"/>
              </RadioGroup>
            </FormControl>
          </form>
        </DialogContent>
        <DialogActions>
          <Button color="primary" onClick={handleSave}>
            {t("component.button.save")}
          </Button>
      </DialogActions>
      </CustomDialog>
    </div>
  )
}

export default SettingDialog;
