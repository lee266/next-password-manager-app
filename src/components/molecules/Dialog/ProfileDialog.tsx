import { useEffect, useState } from "react";
import { useTranslation } from "next-i18next";
import { useDispatch } from "react-redux";
import { closeProfileDialog } from "redux/Common/reducer";
import { useSelector } from "react-redux";
import { RootState } from "redux/rootReducer";
import CustomDialog from "components/atoms/CustomDialog";
import CustomDialogTitle from "components/atoms/CustomDialogTitle";
import DialogContent from "@mui/material/DialogContent";
import { getUser } from "api/users/crud";
import { getToken } from "utils/auth";
import { User } from "types/models/User";

const ProfileDialog = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const open = useSelector((state: RootState) => state.common.openProfileDialog);
  const token = getToken();
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const user = await getUser(token);
        setUser(user)
      } catch (err) {
        console.error(err);
      }
    }
    fetchData();    
  }, [])

  return(
    <div className="profile-dialog">
      <CustomDialog params={{
        open: open, 
        ariaLabelledBy: "profile-dialog", 
        close: () => dispatch(closeProfileDialog())
      }}>
        <CustomDialogTitle
          title={t('component.dialog.title.profile')}
          close={() => dispatch(closeProfileDialog())}
        />
        <DialogContent dividers>
          <div>
            <p>Username</p>
            <span>{user?.username}</span>
          </div>
          <div>
            <p>Email</p>
            <span>{user?.email}</span>
          </div>
        </DialogContent>
      </CustomDialog>
    </div>
  )
}

export default ProfileDialog;