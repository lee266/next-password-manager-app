import { Header2 } from "../organisms/Header/Header2";
import styles from '../../styles/main.module.scss';
import Toolbar from "@mui/material/Toolbar";
import SettingDialog from "components/molecules/Dialog/SettingDialog";
import ProfileDialog from "components/molecules/Dialog/ProfileDialog";

type MainLayoutType = {
  children: React.ReactNode;
}

export const MainLayout = (props:MainLayoutType) => {
  // console.log("create MainLayout");
  return(
    <div className={styles.content}>
      <Header2/>
      <Toolbar/>
      {props.children}
      <SettingDialog />
      <ProfileDialog />
    </div>
  )
}