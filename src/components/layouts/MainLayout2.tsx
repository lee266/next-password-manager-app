import { Header2 } from "../organisms/Header/Header2";
import styles from '../../styles/main.module.scss';
import Toolbar from "@mui/material/Toolbar";

type MainLayoutType = {
  children: React.ReactNode;
}

export const MainLayout = (props:MainLayoutType) => {
  return(
    <div className={styles.content}>
      <Header2/>
      <Toolbar/>
      {props.children}
    </div>
  )
}