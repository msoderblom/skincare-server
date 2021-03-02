import React, { useEffect, useState } from "react";
import * as S from "./styled";
import { useDispatch, useSelector } from "react-redux";
import { threadActions } from "../../../redux/forum/threads";
import {
  CircularProgress,
  Switch,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableFooter,
  TableHead,
  TablePagination,
  TableRow,
  Paper,
} from "@material-ui/core";
import Moment from "react-moment";
import "moment-timezone";
import { useHistory, useLocation } from "react-router-dom";

const ForumPage = () => {
  const dispatch = useDispatch();
  const location = useLocation();
  const history = useHistory();

  const { threads, getThreadsError, totalThreads, loading } = useSelector(
    (state) => state.forum.threads
  );

  const urlParams = new URLSearchParams(location.search);
  const pageNumber = Number(urlParams.get("page")) || 1;
  const limitNumber = Number(urlParams.get("limit")) || 50;
  const [page, setPage] = useState(pageNumber);
  const [limit, setLimit] = useState(limitNumber);

  useEffect(() => {
    dispatch(threadActions.getThreads(`?page=${page}&limit=${limit}`));
  }, [page, limit, dispatch, location]);

  const handlePageChange = (event, value) => {
    setPage(value + 1);
    history.replace({
      pathname: "/forum",
      search: `?page=${value + 1}&limit=${limit}`,
    });
  };
  const handleChangeRowsPerPage = (event) => {
    setLimit(Number(event.target.value));
    setPage(1);
    history.replace({
      pathname: "/forum",
      search: `?page=1&limit=${event.target.value}`,
    });
  };

  return (
    <S.Container>
      <p>ForumPage</p>

      {loading && <CircularProgress />}

      <TableContainer component={Paper}>
        {threads && threads.length > 0 && (
          <Table
            stickyHeader
            aria-label="simple table"
            style={{ width: "100%" }}
          >
            <TableHead>
              <TableRow>
                <TableCell>#</TableCell>
                <TableCell>ID</TableCell>
                <TableCell align="left">Author</TableCell>
                <TableCell align="left">Title</TableCell>
                <TableCell align="left">Body</TableCell>
                <TableCell align="left">Created At</TableCell>
                <TableCell align="left">Actions</TableCell>
              </TableRow>
            </TableHead>

            <TableBody>
              {threads.map((thread, index) => (
                <TableRow key={thread._id}>
                  <TableCell component="th" scope="row">
                    {(page - 1) * limit + index + 1}
                  </TableCell>
                  <TableCell component="th" scope="row">
                    {thread._id}
                  </TableCell>
                  <TableCell align="left">{thread.author.username}</TableCell>
                  <TableCell align="left">{thread.title}</TableCell>
                  <TableCell align="left">
                    {thread.body.replace(/(<([^>]+)>)/gi, "").slice(0, 20) +
                      " ..."}
                  </TableCell>
                  <TableCell align="left">
                    <Moment format="YYYY-MM-DD">{thread?.createdAt}</Moment>
                  </TableCell>
                  <TableCell align="left"></TableCell>
                </TableRow>
              ))}
            </TableBody>
            <TableFooter>
              <TableRow>
                {threads.length > 0 && (
                  <TablePagination
                    rowsPerPageOptions={[1, 5, 10, 25, 50]}
                    colSpan={4}
                    count={totalThreads}
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

      {getThreadsError && <p>{getThreadsError}</p>}
    </S.Container>
  );
};

export default ForumPage;
