import { useState } from 'react';
import { useTranslation } from 'next-i18next';
import { useDispatch } from 'react-redux';
import { changeTheme, closeSettingDialog, setSideBarPosition } from 'redux/Common/reducer';
import { useSelector } from 'react-redux';
import { RootState } from 'redux/rootReducer';
import CustomDialog from 'components/atoms/CustomDialog';
import CustomDialogTitle from 'components/atoms/CustomDialogTitle';
import RadioGroup from '@mui/material/RadioGroup';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import CustomRadio from 'components/atoms/Input/CustomRadio';
import Button from '@mui/material/Button';
import { useTheme } from 'next-themes';
import CustomDialogContent from 'components/atoms/Dialog/CustomDialogContent';
import CustomDialogActions from 'components/atoms/Dialog/CustomDialogActions';

const SettingDialog = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const open = useSelector((state: RootState) => state.common.openSettingDialog);
  const [sideBarPosition, setSideBarPositionState] = useState('left');
  const { theme, setTheme } = useTheme();

  const handleSave = () => {
    dispatch(setSideBarPosition(sideBarPosition));
    dispatch(closeSettingDialog());
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSideBarPositionState((event.target as HTMLInputElement).value);
  };

  const handleChangeTheme = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTheme(event.target.value);
    dispatch(changeTheme());
  };

  return (
    <div className="setting-dialog">
      <CustomDialog
        params={{
          open: open,
          ariaLabelledBy: 'setting-dialog',
          close: () => dispatch(closeSettingDialog()),
        }}
      >
        <CustomDialogTitle title={t('component.dialog.title.setting')} close={() => dispatch(closeSettingDialog())} />
        <CustomDialogContent>
          <form>
            <FormControl>
              <FormLabel className="text-black dark:text-white" id="side-nav-position">
                {t('component.radio.title.navbar')}
              </FormLabel>
              <RadioGroup
                row
                aria-labelledby="side-nav-position"
                name="side-nav-position"
                value={sideBarPosition}
                onChange={handleChange}
              >
                <CustomRadio value="left" label={t('component.radio.label.left')} />
                <CustomRadio value="right" label={t('component.radio.label.right')} />
              </RadioGroup>
            </FormControl>
            <FormControl>
              <FormLabel className="text-black dark:text-white" id="theme-choice">
                {t('component.radio.title.theme')}
              </FormLabel>
              <RadioGroup
                row
                aria-labelledby="theme-choice"
                name="theme-mode"
                value={theme}
                onChange={handleChangeTheme}
              >
                <CustomRadio value="system" label={t('component.radio.label.systemMode')} />
                <CustomRadio value="dark" label={t('component.radio.label.darkMode')} />
                <CustomRadio value="light" label={t('component.radio.label.lightMode')} />
              </RadioGroup>
            </FormControl>
          </form>
        </CustomDialogContent>
        <CustomDialogActions>
          <Button color="primary" onClick={handleSave}>
            {t('component.button.save')}
          </Button>
        </CustomDialogActions>
      </CustomDialog>
    </div>
  );
};

export default SettingDialog;
