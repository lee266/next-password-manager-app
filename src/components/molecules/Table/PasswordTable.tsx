import TableContainer from '@mui/material/TableContainer';
import Table from '@mui/material/Table';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import TableCell from '@mui/material/TableCell';
import TableBody from '@mui/material/TableBody';
import { getToken } from 'utils/auth';
import { searchPasswords } from 'api/password/crud';
import { useEffect, useState } from 'react';
import { getUser } from 'api/users/crud';
import PasswordTextFiled from 'components/atoms/PasswordTextField';

type PasswordData = {
  id: number
  title:string
  password: string
  website: string
  created_at: string
  tag: string
  notes: string
}

type PasswordTablePropsType = {
  token: string
}

const PasswordTable = (props:PasswordTablePropsType) => {
  const COLUMNS = ["title", "password", "website", "created_at", "tag", "notes", "option"];
  const [user, setUser] = useState({});
  // const [token, setToken] = useState("");
  const [data, setData] = useState<[]|[PasswordData]>([]);
  const [columns, setColumns] = useState<string[]>(COLUMNS);
  console.log("props",props);
  
  useEffect(() => {
    const fetchData =async () => {
      const authToken = getToken();
      // setToken(authToken);
      const userData = await getUser(authToken);
      setUser(userData);
      const passwordData = await searchPasswords(userData, authToken);
      console.log("passwordData",passwordData);
      setData(passwordData.data);
    }
    fetchData()
    console.log("user",user);
    console.log("data", data);
  }, [props]);

  return(
    <div className='password-table'>
      <TableContainer>
        <Table sx={{ minWidth: 650 }}>
          <TableHead>
            <TableRow>
              {columns.map((column, index) => (
                <TableCell key={index}>{column}</TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {data.map((passwords, index) => (
              <TableRow key={index}>
                {columns.map((column, index) => {
                  if (column == "password") {
                    return (
                      <TableCell key={index}>
                        <PasswordTextFiled
                          password = {passwords[column]}
                        />
                      </TableCell>
                    )
                  }else {
                    return (
                      // <TableCell key={index}>{passwords[column]}</TableCell>
                      <TableCell key={index}></TableCell>
                    )
                  }
                })}
                <TableCell>
                  <a 
                    href={passwords.website} 
                    target="_blank" 
                    rel='noopener noreferrer'
                  >
                    {passwords.website}
                  </a>
                </TableCell>
                <TableCell>{passwords.created_at}</TableCell>
                <TableCell>{passwords.tag}</TableCell>
                <TableCell>{passwords.notes}</TableCell>
                <TableCell>
                  <button>fix</button>
                  <button>delete</button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  )
}

export default PasswordTable;
