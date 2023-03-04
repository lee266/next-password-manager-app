import * as React from 'react';

import MainLayout from '../components/layouts/MainLayout';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import styles from '../styles/Home.module.scss';
import CssBaseline from '@mui/material/CssBaseline';
import CheckLogin from '../components/molecules/Auth/checkLogin';

import { useTranslation } from 'next-i18next';
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { getAllData } from '../lib/posts';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import Divider from '@mui/material/Divider';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';
import Typography from '@mui/material/Typography';
import { Button, FormControlLabel, Icon, makeStyles, TextField } from '@mui/material';
import { useTheme } from '@emotion/react';



export default function Chat() {
  const { t } = useTranslation();
  const [messages, setMessages] = React.useState([])

  React.useEffect(() => {
      fetch('http://127.0.0.1:8000/api/message', {method: 'GET'})
      .then(res => res.json())
      .then(data => {
        setMessages(data)
      })
  },[])
  console.log(messages);

  return(
    <CheckLogin>
      <MainLayout title='Chat'>
        <List sx={{ width: '100%', bgcolor: 'background.paper' }}>
          {messages.map((message, i) => (
            <div key={i}>
              <ListItem alignItems="flex-start" key={message.id}>
                <ListItemAvatar>
                  <Avatar>{message.user}</Avatar>
                </ListItemAvatar>
                <ListItemText
                  primary={message.user}
                  secondary={
                    <React.Fragment>
                      <Typography
                        sx={{ display: 'inline' }}
                        component="span"
                        variant="body2"
                        color="text.primary"
                      >
                        {message.Message}
                      </Typography>
                    </React.Fragment>
                  }
                >
                </ListItemText>
              </ListItem>
              <Divider variant="inset" component="li" />
            </div>
          ))}
        </List>
        <Box component="form" noValidate sx={{
          display: "flex",
          justifyContent: "center",
          width: "100%",
        }}>
          <TextField id="outlined-basic" label="メッセージを入力" variant="outlined" sx={{
              width: '100%',
              backgroundColor: '#FFF'
            }}/>
          <Button variant="contained" color="primary" sx={{
            }}>
            <Icon>send</Icon>
          </Button>
        </Box>
      </MainLayout>
    </CheckLogin>
  )
}

export async function getStaticProps({ locale }: any) {

  return {
    props: {
      ...(await serverSideTranslations(locale, ["common"])),
    }
  }
}
