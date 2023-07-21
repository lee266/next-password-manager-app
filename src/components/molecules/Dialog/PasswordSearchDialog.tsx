import { useTranslation } from 'next-i18next';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from 'redux/rootReducer';
import { addPasswordFilters, closeSearchDialog } from 'redux/passwordManage/reducer';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import Checkbox from '@mui/material/Checkbox';
import FormControl from '@mui/material/FormControl';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormGroup from '@mui/material/FormGroup';
import { useEffect, useState } from 'react';
import { Alert } from 'redux/Feedback/types';
import { addAlert } from 'redux/Feedback/reducer';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Radio from '@mui/material/Radio';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import CustomDialog from "components/atoms/CustomDialog";
import CustomDialogTitle from "components/atoms/CustomDialogTitle";


const PasswordSearchDialog = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const open = useSelector((state: RootState) => state.passwordManage.openSearchDialog);
  const groups = useSelector((state: RootState) => state.passwordManage.groups);
  const tags = useSelector((state: RootState) => state.passwordManage.tags);
  const [selectedGroups, setSelectedGroups] = useState<number[]>([]);
  const [selectedTags, setSelectedTags] = useState<number[]>([]);
  const [method, setMethod] = useState('and');
  const [title, setTitle] = useState('');
  const passwordUpdate = useSelector((state: RootState) => state.passwordManage.passwordUpdate);
  const passwordFiltersUpdate = useSelector((state: RootState) => state.passwordManage.changePasswordFilters);

  useEffect(() => {
    setSelectedGroups([]);
    setSelectedTags([]);
    setTitle('');
    setMethod('and');
  }, [groups, tags, passwordUpdate, passwordFiltersUpdate])

  const handleClose = () => { dispatch(closeSearchDialog()) }

  const handleTitleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(event.target.value);
  };


  const handleMethodChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setMethod(event.target.value);
    if (event.target.value === 'and') {
      // If "AND" is selected, clear all selections
      setSelectedGroups([]);
      setSelectedTags([]);
    }
  };

  const handleTagSelect = (event: React.ChangeEvent<HTMLInputElement>, tagId: number) => {
    if (event.target.checked) {
      if (method === 'and') {
        setSelectedTags([tagId]);
      } else {
        setSelectedTags([...selectedTags, tagId]);
      }
    } else {
      setSelectedTags(selectedTags.filter(id => id !== tagId));
    }
  };

  const handleGroupSelect = (event: React.ChangeEvent<HTMLInputElement>, groupId: number) => {
    if (event.target.checked) {
      if (method === 'and') {
        setSelectedGroups([groupId]);
      } else {
        setSelectedGroups([...selectedGroups, groupId]);
      }
    } else {
      setSelectedGroups(selectedGroups.filter(id => id !== groupId));
    }
  };

  const handleSearch = async() => {
    try {
      const data = {groups: selectedGroups, tags: selectedTags, title: title, method: method}
      dispatch(addPasswordFilters(data));
      handleClose()
    } catch (error) {
      const alert: Alert = {message: t('error.search'), severity: 'error',}
      dispatch(addAlert(alert));
    }
  }

  return(
    <CustomDialog params={{
      open: open, 
      ariaLabelledBy: "password-search-dialog", 
      close: () => handleClose()
    }}>
      <CustomDialogTitle
        title={t("component.dialog.title.search")}
        close={() => handleClose()}
        />
      <DialogContent dividers>
        <Container maxWidth="md">
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <FormControl component="fieldset" variant="standard">
                <Typography variant="h6">{t('component.form.searchMethod')}</Typography>
                <FormGroup row>
                  <FormControlLabel
                    control={
                      <Radio checked={method === 'and'} onChange={handleMethodChange} value="and" />
                    }
                    label="and"
                  />
                  <FormControlLabel
                    control={
                      <Radio checked={method === 'or'} onChange={handleMethodChange} value="or" />
                    }
                    label="or"
                  />
                </FormGroup>
              </FormControl>
            </Grid>
            <Grid item xs={12}>
              <TextField id="standard-basic" label={t('component.form.title')} variant="standard" value={title} onChange={handleTitleChange} fullWidth />
            </Grid>
            <Grid item xs={12}>
              <Box mb={2}><Typography variant="h6">{t('component.form.group')}</Typography></Box>
              {groups.map((group, index) => (
                <FormControlLabel
                  key={index}
                  label={group.group_name}
                  control={
                    <Checkbox checked={selectedGroups.includes(group.id)} onChange={(event) => handleGroupSelect(event, group.id)} />
                  }
                />
              ))}
              <FormControlLabel
                key={groups.length}
                label={'other'}
                control={
                  <Checkbox checked={selectedGroups.includes(-1)} onChange={(event) => handleGroupSelect(event, -1)} />
                }
              />
            </Grid>
            <Grid item xs={12}>
              <Box mb={2}><Typography variant="h6">{t('component.form.tag')}</Typography></Box>
              {tags.map((tag, index) => (
                <FormControlLabel
                  key={index}
                  label={tag.tag_name}
                  control={
                    <Checkbox checked={selectedTags.includes(tag.id)} onChange={(event) => handleTagSelect(event, tag.id)} />
                  }
                />
              ))}
            </Grid>
          </Grid>
        </Container>
      </DialogContent>
      <DialogActions>
        <Button color="primary" onClick={handleSearch}>
          {t("component.button.search")}
        </Button>
      </DialogActions>
    </CustomDialog>
  );
}

export default PasswordSearchDialog;