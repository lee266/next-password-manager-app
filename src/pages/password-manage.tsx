import { useEffect } from 'react';
import { useRouter } from "next/router";
import { verifyJwt } from 'api/auth/jwt';
import { getToken } from 'utils/auth';
import { MainLayout } from 'components/layouts/MainLayout2';
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
  const router = useRouter();
  // const [posts, setPosts] = useState([])

  // useEffect(() => {
  //     fetch('http://127.0.0.1:8000/api/password', {method: 'GET'})
  //     .then(res => res.json())
  //     .then(data => {
  //         setPosts(data)
  //     })
  // },[])
  useEffect(() => {
    const token = getToken();
    if (token) {
      try {
        const response = verifyJwt(token);
        console.log("response", response);
        console.log("Your true");
      } catch (error) {
        router.push("/login2");
      }
    } else {
      router.push("/login2");
    }
  }, [router]);
  
  return(
    <div>
      <MainLayout>
        <p>hello</p>
      </MainLayout>
    </div>
    // <CheckLogin>
    //   <MainLayout title='password manage'>
    //     <TableContainer component={Paper}>
    //       <Table sx={{ minWidth: 650 }} aria-label="simple table">
    //         <TableHead>
    //           <TableRow>
    //             <TableCell>id</TableCell>
    //             <TableCell align="right">title</TableCell>
    //             <TableCell align="right">password</TableCell>
    //             <TableCell align="right">email</TableCell>
    //             <TableCell align="right">created_at</TableCell>
    //           </TableRow>
    //       </TableHead>
    //       <TableBody>
    //         {posts.map((post, i) => (
    //           <TableRow
    //           key={post}
    //           sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
    //           >
    //             <TableCell align="right">{post}</TableCell>
    //             <TableCell align="right">{post}</TableCell>
    //             <TableCell align="right">{post}</TableCell>
    //             <TableCell align="right">{post}</TableCell>
    //             <TableCell align="right">{post}</TableCell>
    //           </TableRow>
    //         ))}
    //       </TableBody>
    //       </Table>
    //     </TableContainer>
    //     <Button
    //       onClick={() => {
    //         passwords();
    //       }}>
    //       Click me
    //     </Button>
    //   </MainLayout>
    // </CheckLogin>
  )

}


export async function getServerSideProps({ locale }: any) {
  // const url = `${process.env.NEXT_PUBLIC_RESTAPI_URL}api/tasks.json`
  // const url = `https://gist.githubusercontent.com/h5y1m141/f52eece296999105742c/raw/f3291233f69032a0b168192e11958575836833c2/react.json`
  // const url = "http://127.0.0.1:8000/api/test"
  // const res = await fetch(url);
  // const data = await res.json()
  return {
    props: {
      ...(await serverSideTranslations(locale, ["common"])),
    }
  }
}

export default PasswordManage;
