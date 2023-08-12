import * as React from 'react';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import MailIcon from '@mui/icons-material/Mail';
import { useTranslation } from "next-i18next";
import Link from 'next/link';

export function SideMenu() {

  const { t } = useTranslation("");
  // const listName = ['password', 'chat', 'other', 'index']
  const listItem = [
    ['password', 'password-manage'],
    ['chat', 'chat']
  ]

  return (
    <>
      <List className='dark:bg-back-rightDark'>
          {listItem.map((text, index) => (
            <Link href={`${text[1]}`} key={text[0]}>
              <ListItem  disablePadding>
                <ListItemButton>
                  <ListItemIcon>
                    {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
                  </ListItemIcon>
                  <ListItemText className='text-black dark:text-white' primary={t("general.nav."+text[0])} />
                </ListItemButton>
              </ListItem>
            </Link>
          ))}
        </List>
    </>
  )
}
