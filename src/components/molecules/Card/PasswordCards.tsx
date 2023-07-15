import { useSelector, useDispatch } from 'react-redux';
import { Alert } from 'redux/Feedback/types';
import { addAlert } from 'redux/Feedback/reducer';
import DragHandleIcon from '@mui/icons-material/DragHandle';
import { useEffect, useState } from "react";
import { DragDropContext, Droppable, Draggable, resetServerContext } from "react-beautiful-dnd";
import { StrictModeDroppable } from '../StrictModeDroppable';
import { getUser } from 'api/users/crud';
import { updateIndex } from 'api/password/crud';
import { getToken } from 'utils/auth';
import { Password } from 'types/models/Password';
import { getGroupedPasswords } from 'api/password/crud';
import  PasswordText  from 'components/atoms/Text/PasswordText';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import { RootState } from 'redux/store';
import { deleteSelectedPassword, movePassword, openDetailDialog, updateSelectedPassword } from 'redux/passwordManage/reducer';

type Data = {
  [key: string]: {
    passwords: any[];
    open: boolean;
  };
}

const PasswordCard = () => {
  const [data, setData] = useState<Data>({});
  const [oldData, setOldData] = useState<Data>({});
  const passwords = useSelector((state: RootState) => state.passwordManage.passwordTitles);
  const groups = useSelector((state: RootState) => state.passwordManage.groups);
  const passwordDelete = useSelector((state: RootState) => state.passwordManage.passwordDelete);
  const passwordUpdate = useSelector((state: RootState) => state.passwordManage.passwordUpdate);
  const passwordMove = useSelector((state: RootState) => state.passwordManage.passwordMove);
  const dispatch = useDispatch();

  const toggleDropdown = (key: string) => {
    setData((prevData) => ({
      ...prevData,
      [key]: {
        ...prevData[key],
        open: !prevData[key].open,
      },
    }));
  };

  useEffect(() => {
    const fetchData = async () => {
      const authToken = getToken();
      const userData = await getUser(authToken);
      userData.user_id = userData.id
      const passwordData = await getGroupedPasswords(userData);
      setData(passwordData.data);
      // 各グループの初期値を設定
      const updatedData: Data = {};
      Object.keys(passwordData.data).forEach((key) => {
        updatedData[key] = {
          passwords: passwordData.data[key],
          open: false, // 初期値は非表示
        };
      });

      setData(updatedData);
      dispatch(deleteSelectedPassword(false));
      dispatch(updateSelectedPassword(false));
      dispatch(movePassword(false));
      console.log("Get data", updatedData);
    }
    fetchData();
    
  }, [passwords, groups, passwordDelete, passwordUpdate, passwordMove]);

  const onDragEnd = async (result:any) => {
    console.log("Active onDragEnd");
    const authToken = getToken();
    const userData = await getUser(authToken);
    
    const { source, destination } = result;
    const oldGroup = source.droppableId ?source.droppableId : 'other';
    const newGroup = destination.droppableId ?destination.droppableId : 'other';
    console.log("source: 元のデータ情報", source);console.log("destination: 移動後のデータ情報", destination);
    console.log("sourceGroup is", oldGroup, "destinationGroup is", newGroup);
    setOldData(data);

    if (!destination) {return;}
    // pass if not move the item 
    if (oldGroup === newGroup && source.index === destination.index){
      console.log("Not move");return;
    }
    
    // detected the dragging item
    const sourcePasswords = data[oldGroup]; // origin group that has the moving item passwords
    const draggedPassword = sourcePasswords.passwords[source.index];
    console.log("draggedPassword", draggedPassword);console.log("startPassword", sourcePasswords);
    try {
      // if the dragging item move to different group
      if (oldGroup !== newGroup) {
        const destinationPasswords = data[newGroup];
        console.log("destinationPasswords", destinationPasswords);
  
        const updatedSourcePasswords = Array.from(sourcePasswords.passwords);
        updatedSourcePasswords.splice(source.index, 1);
  
        const updatedDestinationPasswords = Array.from(destinationPasswords.passwords);
        updatedDestinationPasswords.splice(destination.index, 0, draggedPassword);
  
        const passwordsToUpdate = updatedDestinationPasswords.map((password, index) => ({id: password.id, group_id: password.group, index}));
        const oldPasswords = sourcePasswords.passwords.map((password, index) => ({id: password.id, group_id: password.group, index}));
        const submitData = {
          new_passwords: passwordsToUpdate,
          old_passwords: oldPasswords,
          old_group: oldGroup,
          new_group: newGroup,
          user: userData,
        }
        
        const newData = {
          ...data,
          [oldGroup]: {
            ...sourcePasswords,
            passwords: updatedSourcePasswords,
          },
          [newGroup]: {
            ...destinationPasswords,
            passwords: updatedDestinationPasswords,
          },
        };
        setData(newData);
        await updateIndex(submitData);
        dispatch(movePassword(true));
      }else{
        console.log("Move to same group");
        
        const updatedSourcePasswords = Array.from(sourcePasswords.passwords);
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
          [oldGroup]: {
            ...sourcePasswords,
            passwords: updatedSourcePasswords,
          },
        };
        setData(newData);
        await updateIndex(submitData);
        dispatch(movePassword(true));

        console.log('New passwords: keyName: passwordsToUpdate', passwordsToUpdate);
        console.log('draggedPassword', draggedPassword);
        console.log('old_group_id', draggedPassword.oldGroup);
        console.log('new_group_id', draggedPassword.group);
        console.log('SubmitData', submitData);
      }
    } catch (error:any) {
      // undo updated data
      setData(oldData);
      const alert: Alert = {message: "移動に失敗しました。", severity: 'error',}
      dispatch(addAlert(alert));
    }
  }

  // Open passwordDetail dialog
  const SelectPassword = (item:any) => {
    console.log("Select Password");
    dispatch(openDetailDialog(item));
  }

  return (
    <div className="password_card">
      <DragDropContext onDragEnd={onDragEnd}>
        {Object.keys(data).map((key:string) => {
          const group = data[key];
          return (
            <StrictModeDroppable key={key} droppableId={key}>
              {(provided) => (
                <div {...provided.droppableProps} ref={provided.innerRef}>
                  {/* Group name */}
                  <div className='group_name flex justify-between items-center p-2 bg-primary rounded cursor-pointer' onClick={() => toggleDropdown(key)}>
                    <h2 className='text-lg font-semibold mr-2'>{key}</h2>
                    <ExpandLessIcon style={{ transform: `${group.open ? 'rotate(180deg)' : 'rotate(0deg)'}`, transition: 'transform 0.3s' }} />
                  </div>
                  {group.open && (
                    // Password groups
                    <div className='dropdown_content'>
                      {group.passwords.map((item: Password, index:number) => (
                        <Draggable key={item.id} draggableId={String(item.id)} index={index}>
                          {(provided) => (
                          // password Box
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
                              <div className='password-text'
                                onClick={() => SelectPassword(item)}
                              >
                                <div className="font-bold text-xl mb-2" >{item.title}</div>
                                <PasswordText 
                                  text={item.password}
                                  labelId={String(item.id)}
                                />
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
          );
        })}
      </DragDropContext>
    </div>
  )
}

export default PasswordCard;
