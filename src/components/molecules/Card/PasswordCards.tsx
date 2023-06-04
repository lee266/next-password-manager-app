import DragHandleIcon from '@mui/icons-material/DragHandle';
import { useEffect, useState } from "react";
import { DragDropContext, Droppable, Draggable, resetServerContext } from "react-beautiful-dnd";
import { StrictModeDroppable } from '../StrictModeDroppable';
import { getUser } from 'api/users/crud';
import { getToken } from 'utils/auth';
import { Password } from 'types/models/Password';
import { getGroupedPasswords } from 'api/password/crud';
import  PasswordText  from 'components/atoms/Text/PasswordText'

type Data = {
  [key: string]: {
    passwords: any[];
    open: boolean;
  };
}

const PasswordCard = () => {
  const [data, setData] = useState<Data>({});
  const [dropdownIndex, setDropdownIndex] = useState<number | null>(null);

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
    }
    fetchData()
  }, []);

  const onDragEnd = (result:any) => {
    console.log(result);
    console.log(result.source.index);
    console.log(result.destination.index);
    
  }

  return (
    <div className="password_card">
      <DragDropContext onDragEnd={onDragEnd}>
        {Object.keys(data).map((key:string) => {
          const group = data[key];
          return (
            <StrictModeDroppable key={key} droppableId={key}>
              {(provided) => (
                <div
                  {...provided.droppableProps}
                  ref={provided.innerRef}
                >
                  <div className='group_name' onClick={() => toggleDropdown(key)}>
                    <h2>{key}</h2>
                  </div>
                  {group.open && (
                    <div className='dropdown_content'>
                      {group.passwords.map((item: Password, index:number) => (
                        <Draggable key={item.id} draggableId={String(item.id)} index={index}>
                          {(provided) => (
                          <div
                            {...provided.draggableProps}
                            ref={provided.innerRef}
                            className="max-w-sm mx-auto rounded overflow-hidden shadow-lg hover:bg-primary"
                          >
                            <div className='flex items-center'>
                              <div
                                {...provided.dragHandleProps} 
                                className='mr-2'
                                aria-label="Drag Handle"
                              >
                                <DragHandleIcon />
                              </div> 
                              <div>
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
