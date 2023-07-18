import { useSelector, useDispatch } from 'react-redux';
import { Alert } from 'redux/Feedback/types';
import { useTranslation } from 'react-i18next';
import { addAlert } from 'redux/Feedback/reducer';
import DragHandleIcon from '@mui/icons-material/DragHandle';
import { useEffect, useState } from "react";
import { DragDropContext, Draggable } from "react-beautiful-dnd";
import { StrictModeDroppable } from '../StrictModeDroppable';
import { getUser } from 'api/users/crud';
import { searchPasswords, updateIndex } from 'api/password/crud';
import { getToken } from 'utils/auth';
import { Password } from 'types/models/Password';
import { getGroupedPasswords } from 'api/password/crud';
import  PasswordText  from 'components/atoms/Text/PasswordText';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import { RootState } from 'redux/store';
import { 
  addGroups, addPasswords, addTags, changePasswordFilters, changePasswords, deleteSelectedPassword, 
  movePassword, openDetailDialog, resetPasswordFilters, updateGroup, updateSelectedPassword, updateTag 
} from 'redux/passwordManage/reducer';
import { getTags } from 'api/password/tag';
import { getGroups } from 'api/password/group';


const PasswordCard = () => {
  const { t } = useTranslation();
  const token = getToken();
  const [data, setData] = useState<Record<string, Password[]>>({});
  const [oldData, setOldData] = useState<Record<string, Password[]>>({});
  const [dropdownOpenState, setDropdownOpenState] = useState<{[key: string]: boolean}>({});
  const passwords = useSelector((state: RootState) => state.passwordManage.passwordTitles);
  const groups = useSelector((state: RootState) => state.passwordManage.groups);
  const passwordDelete = useSelector((state: RootState) => state.passwordManage.passwordDelete);
  const passwordUpdate = useSelector((state: RootState) => state.passwordManage.passwordUpdate);
  const passwordMove = useSelector((state: RootState) => state.passwordManage.passwordMove);
  const tagUpdate = useSelector((state: RootState) => state.passwordManage.tagUpdate);
  const groupUpdate = useSelector((state: RootState) => state.passwordManage.groupUpdate);
  const filters = useSelector((state: RootState) => state.passwordManage.passwordFilters);
  const passwordFiltersUpdate = useSelector((state: RootState) => state.passwordManage.changePasswordFilters);
  const dispatch = useDispatch();

  const toggleDropdown = (key: string) => {
    setDropdownOpenState(prevState => ({...prevState, [key]: !prevState[key]}));
  };

  useEffect(() => {
    const fetchData = async () => {
      const authToken = getToken();
      const userData = await getUser(authToken);
      userData.user_id = userData.id
      const passwordData = await searchPasswords(userData.id, filters, token)
      setData(passwordData.data);
      // Set the initial state (open or closed) for the dropdown menus of each group
      Object.keys(passwordData.data).forEach((key) => {
        if (dropdownOpenState[key] === undefined) { 
          setDropdownOpenState(prevState => ({...prevState, [key]: false})); 
        }
      });

      dispatch(deleteSelectedPassword(false));
      dispatch(updateSelectedPassword(false));
      dispatch(movePassword(false));
    }

    const Tags =async () => {
      const userData = await getUser(token);
      const selectBoxTags = await getTags({ user_id: userData.id }, token);
      dispatch(addTags(selectBoxTags.data))
    }

    const Groups =async () => {
      const userData = await getUser(token);
      const selectBoxGroups = await getGroups({ user_id: userData.id }, token);
      dispatch(addGroups(selectBoxGroups.data));
    }

    const Passwords =async () => {
      const userData = await getUser(token);
      userData.user_id = userData.id;
      const selectBoxPasswords = await getGroupedPasswords(userData);
      dispatch(addPasswords(selectBoxPasswords.data));
    }

    fetchData();
    if (passwordUpdate) {
      Passwords()
      dispatch(changePasswords(false));
      dispatch(resetPasswordFilters());
    }
    if (tagUpdate) {
      Tags();
      dispatch(updateTag(false));
      dispatch(resetPasswordFilters());
    }
    if (groupUpdate) {
      Groups();
      dispatch(updateGroup(false));
      dispatch(resetPasswordFilters());
    }
    if (passwordFiltersUpdate) {
      dispatch(resetPasswordFilters());
      dispatch(changePasswordFilters(false));
    }
  }, [
    passwords, groups, passwordDelete, passwordUpdate, passwordMove, tagUpdate, 
    groupUpdate, passwordFiltersUpdate, filters]);

  const onDragEnd =async (result:any) => {
    // console.log("Active onDragEnd");
    const authToken = getToken();
    const userData = await getUser(authToken);

    const { source, destination } = result;
    // These are key of data and group name
    const oldGroup:string = source.droppableId ?source.droppableId : 'other';
    const newGroup:string = destination.droppableId ?destination.droppableId : 'other';
    // console.log("source: 元のデータ情報", source);console.log("destination: 移動後のデータ情報", destination);
    // console.log("sourceGroup is", oldGroup, "destinationGroup is", newGroup);
    setOldData(data);

    // Pass if not move the item 
    if (oldGroup === newGroup && source.index === destination.index){return;}

    const sourcePasswords = data[oldGroup]; // origin group that has the moving item passwords
    const draggedPassword = sourcePasswords[source.index]; // Detected the dragging item
    // console.log("draggedPassword", draggedPassword); console.log("beforeGroupPasswords", sourcePasswords);
    try {
      // if the dragging item move to different group
      if (oldGroup !== newGroup) {
        const destinationPasswords = data[newGroup];
        // console.log("destinationPasswords", destinationPasswords);

        const updatedSourcePasswords = Array.from(sourcePasswords);
        updatedSourcePasswords.splice(source.index, 1);
        const updatedDestinationPasswords = Array.from(destinationPasswords);
        updatedDestinationPasswords.splice(destination.index, 0, draggedPassword);
        const oldPasswords = updatedSourcePasswords.map((password, index) => ({id: password.id, group_id: password.group, index}));
        const passwordsToUpdate = updatedDestinationPasswords.map((password, index) => ({id: password.id, group_id: password.group, index}));
        
        const submitData = {
          new_passwords: passwordsToUpdate,
          old_passwords: oldPasswords,
          old_group: oldGroup,
          new_group: newGroup,
          user: userData,
        }
        const newData = {
          ...data,
          [oldGroup]: updatedSourcePasswords,
          [newGroup]: updatedDestinationPasswords,
        };
        setData(newData);
        await updateIndex(submitData);
        dispatch(movePassword(true));
        // console.log(passwordsToUpdate);
        // console.log(oldPasswords);

      }else {
        console.log("Move to same group");
        
        const updatedSourcePasswords = Array.from(sourcePasswords);
        const draggedPassword = updatedSourcePasswords.splice(source.index, 1)[0];
        updatedSourcePasswords.splice(destination.index, 0, draggedPassword);
        const passwordsToUpdate = updatedSourcePasswords.map((password, index) => ({id: password.id, group_id: password.group, index}));

        const submitData = {
          new_passwords: passwordsToUpdate,
          old_group: oldGroup,
          new_group: newGroup,
          user: userData,
        }

        const newData = {
          ...data,
          [oldGroup]: updatedSourcePasswords
        };
        setData(newData);
        await updateIndex(submitData);
        dispatch(movePassword(true));

        // console.log('New passwords: keyName: passwordsToUpdate', passwordsToUpdate);
        // console.log('draggedPassword', draggedPassword);
        // console.log('old_group_id', oldGroup);
        // console.log('new_group_id', newGroup);
        // console.log('SubmitData', submitData);
      }
    } catch (error) {
      // undo updated data
      setData(oldData);
      const alert: Alert = {message: t("general.error.moveItem"), severity: 'error',}
      dispatch(addAlert(alert));
    }
  }

  // Open passwordDetail dialog
  const SelectPassword = (item:Password) => { dispatch(openDetailDialog(item)); }

  return (
    <div className="password_card mt-1">
      <DragDropContext onDragEnd={onDragEnd}>
        {Object.keys(data).map((key:string) => {
          return(
            <StrictModeDroppable key={key} droppableId={key}>
              {(provided) => (
                <div {...provided.droppableProps} ref={provided.innerRef}>
                  {/* Group name */}
                  <div className='group_name flex justify-between items-center p-2 bg-primary rounded cursor-pointer' 
                    onClick={() => toggleDropdown(key)}
                  >
                    <h2 className='text-lg font-semibold mr-2'>{key}</h2>
                    <ExpandLessIcon style={{ 
                      transform: `${dropdownOpenState[key] ? 'rotate(180deg)' : 'rotate(0deg)'}`, transition: 'transform 0.3s' 
                    }} />
                  </div>
                  {/* Display passwords */}
                  {dropdownOpenState[key] && (
                    <div className='dropdown_content'>
                      {/* password boxes */}
                      {data[key].map((item: Password, index:number) => (
                        <Draggable key={item.id} draggableId={String(item.id)} index={index}>
                          {(provided) => (
                            // Password box
                            <div
                              {...provided.draggableProps}
                              ref={provided.innerRef}
                              className="password-box max-w-sm mx-auto rounded overflow-hidden md:hover:bg-primary"
                            >
                              <div className='flex items-center'>
                                <div
                                  {...provided.dragHandleProps} 
                                  className='password-drag-icon mr-2'
                                  aria-label="Drag Handle"
                                >
                                  <DragHandleIcon />
                                </div> 
                                <div className='password-text' onClick={() => SelectPassword(item)}>
                                  <div className="font-bold text-xl mb-2" >{item.title}</div>
                                  <PasswordText text={item.password ? item.password: ''} labelId={String(item.id)}/>
                                </div>
                              </div>
                            </div>
                          )}
                        </Draggable>
                      ))}
                    </div>
                  )}
                  {provided.placeholder}
                </div>
              )}
            </StrictModeDroppable>
          )
        })}
      </DragDropContext>
    </div>
  )
}

export default PasswordCard;
