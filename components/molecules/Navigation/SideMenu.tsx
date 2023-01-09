import * as React from 'react';
import List from '@mui/material/List';
// import Divider from '@mui/material/Divider';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import MailIcon from '@mui/icons-material/Mail';

import { useRouter } from "next/router";
import { useTranslation } from "next-i18next";

export function SideMenu() {
  const router = useRouter();

  const { t } = useTranslation("");
  const listName = ['password', 'chat', 'other', 'index']

  return (
    <>
      <List>
          {listName.map((text, index) => (
            <ListItem key={text} disablePadding>
              <ListItemButton>
                <ListItemIcon>
                  {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
                </ListItemIcon>
                <ListItemText primary={t("general.nav."+text)} />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
    </>
  )
}
