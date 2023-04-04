import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import ApproveIcon from '@material-ui/icons/CheckCircle';
import {
  Box,
  Card,
  Container,
  IconButton,
  TableFooter,
  TablePagination,
} from "@material-ui/core";
import Axios from "axios";
import TablePaginationActions from "@material-ui/core/TablePagination/TablePaginationActions";
import EditIcon from "@material-ui/icons/Edit";
import DeleteIcon from "@material-ui/icons/Delete";
import CancelIcon from '@material-ui/icons/Cancel';
import Toast_Comp from "../../../../components/Toast/Toast_Comp";

const useStyles = makeStyles({
  table: {
    minWidth: 650,
  },
  root: {
    height: "100%",
    paddingTop: "30px",
  },
});

const AuthorizeUserTable = () => {
  const classes = useStyles();

  const [data, setData] = useState([]);
  const [error, setError] = useState();
  const [loading, setLoading] = useState(false);
  const [toast, setToast] = useState(false);
  const userList = async () => {
    const user = await Axios.get("/users/authorizeUsers",{
        headers:{
            "Authorization":"Bearer "+localStorage.getItem("auth_token")
        }
    })
    setData(user.data.userInfoToAuthorize)
    //console.log(user.data.teacherInfo)
  };


  useEffect(() => {
    userList()
  }, []);

  async function approveUser(userId){
    //axios.patch('/resources/123', { fieldToUpdate: 'new value' })
    setLoading(true)
    const user = await Axios.patch("/users/authorizeUsersToUpdate",{userId},{
      headers:{
          "Authorization":"Bearer "+localStorage.getItem("auth_token")
      }
  });

  if(user){
    setLoading(false);
    setToast(true);
    setError(null);
    setTimeout(() => {
     }, 3000);
     clearTimeout();
  }
  userList();
}



  const rejectUser=(userId)=>{
    
  }

  //   const classes = useStyles2();
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);

  const emptyRows =
    rowsPerPage - Math.min(rowsPerPage, data.length - page * rowsPerPage);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };
  return (
    <Container className={classes.root}>
        <Toast_Comp
          setToast={setToast}
          renderToast={toast}
          msg="Approved Successfully"
        />
      <TableContainer component={Paper}>
        <Table className={classes.table} aria-label="simple table">
          <TableHead>
            <TableRow className="bg-dark ">
              <TableCell align="center" className="text-light">
                User Name
              </TableCell>
              <TableCell align="center" className="text-light">
                Role
              </TableCell>
              <TableCell align="center" className="text-light">
               Email
              </TableCell>
              
              <TableCell align="center" className="text-light">
                Actions
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {(rowsPerPage > 0
              ? data.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              : data
            ).map((row) => (
              <TableRow key={row._id}>
                <TableCell component="th" scope="row" align="center">
                  {row.userName}
                </TableCell>

                <TableCell align="center">{row.role}</TableCell>
                <TableCell align="center">
                {row.email}
                </TableCell>
                <TableCell className="" align="center">
             
                  <IconButton onClick={()=>approveUser(row._id)}>
                    <ApproveIcon style={{ color: "primary" }} />
                  </IconButton>
                  <IconButton onClick={()=>rejectUser(row._id)}>
                    <CancelIcon style={{ color: "red" }} />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}

            {emptyRows > 0 && (
              <TableRow style={{ height: 53 * emptyRows }}>
                <TableCell colSpan={6} />
              </TableRow>
            )}
          </TableBody>
          <TableFooter>
            <TableRow>
              <TablePagination
                rowsPerPageOptions={[5, 7, 10, 25, { label: "All", value: -1 }]}
                colSpan={3}
                count={data.length}
                rowsPerPage={rowsPerPage}
                page={page}
                SelectProps={{
                  inputProps: { "aria-label": "rows per page" },
                  native: true,
                }}
                onChangePage={handleChangePage}
                onChangeRowsPerPage={handleChangeRowsPerPage}
                ActionsComponent={TablePaginationActions}
              />
            </TableRow>
          </TableFooter>
        </Table>
      </TableContainer>
    </Container>
  );
};

export default AuthorizeUserTable;
