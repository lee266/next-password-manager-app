import { useEffect, useState } from "react";
import { useTranslation } from "next-i18next";
import { useDispatch } from "react-redux";
import { changeTheme, closeSettingDialog, setSideBarPosition } from "redux/Common/reducer";
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
  // const [theme, setTheme] = useState('light');

  // useEffect(() => {
  //   const initialTheme = window.localStorage.getItem('theme') || (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');
  //   setTheme(initialTheme);

  //   if (initialTheme === 'dark') {
  //     document.documentElement.classList.add('dark');
  //   } else {
  //     document.documentElement.classList.remove('dark');
  //   }
  // }, []);

  const handleSave = () =>{
    dispatch(setSideBarPosition(sideBarPosition));
    dispatch(closeSettingDialog());
  }

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSideBarPositionState((event.target as HTMLInputElement).value);
  };

  // const toggleDarkMode = () => {
  //   if (theme === 'dark') {
  //     // Whenever the user explicitly chooses light mode
  //     setTheme('light');
  //     localStorage.theme = 'light';
  //   } else {
  //     // Whenever the user explicitly chooses dark mode
  //     setTheme('dark');
  //     localStorage.theme = 'dark';
  //   }
  //   dispatch(changeTheme);
  // };

  // useEffect(() => {
  //   if (theme === 'dark') {
  //     document.documentElement.classList.add('dark');
  //   } else {
  //     document.documentElement.classList.remove('dark');
  //   }
  // }, [theme]);

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
              <FormLabel id="side-nav-position">{t("component.radio.title.navbar")}</FormLabel>
              <RadioGroup
                row
                aria-labelledby="side-nav-position"
                name="side-nav-position"
                value={sideBarPosition}
                onChange={handleChange}
              >
                <CustomRadio value="left" label={t("component.radio.label.left")}/>
                <CustomRadio value="right" label={t("component.radio.label.right")}/>
              </RadioGroup>
            </FormControl>
            {/* <div className="flex">
              <span>{theme === 'dark' ? 'Dark mode' : 'Light mode'}</span>
              <Button type="button" onClick={toggleDarkMode}>{t("component.button.toggle_theme")}</Button>
            </div> */}
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
