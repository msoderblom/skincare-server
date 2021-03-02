import React, { useEffect, useState } from "react";
import * as S from "./styled";
import { useHistory, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { userActions } from "../../../../redux/user";
import {
  CircularProgress,
  TableContainer,
  Table,
  TableBody,
  Paper,
  TableHead,
  TableRow,
  TableCell,
  TableFooter,
  TablePagination,
} from "@material-ui/core";
import Moment from "react-moment";
import "moment-timezone";

const UsersTable = () => {
  const dispatch = useDispatch();
  const location = useLocation();
  const history = useHistory();

  const { users, loading, totalUsers } = useSelector((state) => state.user);

  const urlParams = new URLSearchParams(location.search);
  const pageNumber = Number(urlParams.get("page")) || 1;
  const limitNumber = Number(urlParams.get("limit")) || 50;
  const [page, setPage] = useState(pageNumber);
  const [limit, setLimit] = useState(limitNumber);

  useEffect(() => {
    dispatch(userActions.getAllUsers(`?page=${page}&limit=${limit}`));
  }, [page, limit, dispatch, location]);

  const handlePageChange = (event, value) => {
    setPage(value + 1);
    history.replace({
      pathname: "/users",
      search: `?page=${value + 1}&limit=${limit}`,
    });
  };
  const handleChangeRowsPerPage = (event) => {
    setLimit(Number(event.target.value));
    setPage(1);
    history.replace({
      pathname: "/users",
      search: `?page=1&limit=${event.target.value}`,
    });
  };
  return (
    <S.Container>
      <p>UsersTable</p>
      {loading && <CircularProgress />}

      <TableContainer component={Paper}>
        {users && users.length > 0 && (
          <Table
            stickyHeader
            aria-label="simple table"
            style={{ width: "100%" }}
          >
            <TableHead>
              <TableRow>
                <TableCell>#</TableCell>
                <TableCell>ID</TableCell>
                <TableCell align="left">Username</TableCell>
                <TableCell align="left">Email</TableCell>
                <TableCell align="left">Created</TableCell>
              </TableRow>
            </TableHead>

            <TableBody>
              {users.map((user, index) => (
                <TableRow key={user._id}>
                  <TableCell component="th" scope="row">
                    {(page - 1) * limit + index + 1}
                  </TableCell>
                  <TableCell component="th" scope="row">
                    {user._id}
                  </TableCell>
                  <TableCell align="left">{user.username}</TableCell>
                  <TableCell align="left">{user.email}</TableCell>
                  <TableCell align="left">
                    {<Moment format="YYYY-MM-DD">{user.createdAt}</Moment> ||
                      "unknown"}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
            <TableFooter>
              <TableRow>
                {users.length > 0 && (
                  <TablePagination
                    rowsPerPageOptions={[1, 5, 10, 25, 50]}
                    colSpan={3}
                    count={totalUsers}
                    rowsPerPage={limit}
                    page={page !== 0 ? page - 1 : page}
                    SelectProps={{
                      inputProps: { "aria-label": "rows per page" },
                      native: true,
                    }}
                    onChangePage={handlePageChange}
                    onChangeRowsPerPage={handleChangeRowsPerPage}
                    // ActionsComponent={TablePaginationActions}
                  />
                )}
              </TableRow>
            </TableFooter>
          </Table>
        )}
      </TableContainer>
    </S.Container>
  );
};

export default UsersTable;
