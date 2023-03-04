import * as React from 'react';

import MainLayout from '../components/layouts/MainLayout';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import styles from '../styles/Home.module.scss';
import CssBaseline from '@mui/material/CssBaseline';
import CheckLogin from '../components/molecules/Auth/checkLogin';
import { Button } from '@mui/material';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

import { useTranslation } from 'next-i18next';
import { serverSideTranslations } from "next-i18next/serverSideTranslations";

interface PasswordManageProps {
  children: React.ReactNode;
  open: boolean;
  id: string;
}

const theme = createTheme();

const passwords = async () => {
  try {
    await fetch(
      `${process.env.NEXT_PUBLIC_RESTAPI_URL}api/password/`,
      {
        method: "GET",
      }
    ).then((res) => {
      if (res.status === 400) {
        throw "authentication failed"
      }else if (res.ok) {
        return res.json();
      }
    }).then((data) => {
      console.log(data);
      return data
    })
  }catch(error) {
    console.log(error);
    
    // alert(error);
  }

} 

function PasswordManage() {
  const { t } = useTranslation();
  const [posts, setPosts] = React.useState([])

  React.useEffect(() => {
      fetch('http://127.0.0.1:8000/api/password', {method: 'GET'})
      .then(res => res.json())
      .then(data => {
          setPosts(data)
      })
  },[])
  console.log(posts);
  

  // console.log(props.root);
  
  return(
    <CheckLogin>
      <MainLayout title='password manage'>
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell>id</TableCell>
                <TableCell align="right">title</TableCell>
                <TableCell align="right">password</TableCell>
                <TableCell align="right">email</TableCell>
                <TableCell align="right">created_at</TableCell>
              </TableRow>
          </TableHead>
          <TableBody>
            {posts.map((post, i) => (
              <TableRow
              key={post.id}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
              >
                <TableCell align="right">{post.id}</TableCell>
                <TableCell align="right">{post.title}</TableCell>
                <TableCell align="right">{post.password}</TableCell>
                <TableCell align="right">{post.email}</TableCell>
                <TableCell align="right">{post.created_at}</TableCell>
              </TableRow>
            ))}
          </TableBody>
          </Table>
        </TableContainer>
        {/* <p>{props.data}</p> */}
        <Button
          onClick={() => {
            passwords();
          }}>
          Click me
        </Button>
      </MainLayout>
    </CheckLogin>
  )

}

//

import fetch from 'isomorphic-unfetch'
import { type } from 'os';

export async function getServerSideProps({ locale }: any) {
  // const url = `${process.env.NEXT_PUBLIC_RESTAPI_URL}api/tasks.json`
  const url = `https://gist.githubusercontent.com/h5y1m141/f52eece296999105742c/raw/f3291233f69032a0b168192e11958575836833c2/react.json`
  // const url = "http://127.0.0.1:8000/api/test"
  console.log(url);
  const res = await fetch(url);
  const data = await res.json()
  console.log(res);
  // const data =  await res.data;
  console.log("worked");
  console.log(data);
  
  
  return {
    props: {
      ...(await serverSideTranslations(locale, ["common"])),
      data
    }
  }
}

export default PasswordManage