import React, { useEffect, useState } from "react";
import * as S from "./styled";
import { useHistory, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { postActions } from "../../../../redux/blog/posts";
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
  Switch,
} from "@material-ui/core";

const BlogPostTable = () => {
  const dispatch = useDispatch();
  const location = useLocation();
  const history = useHistory();

  const { posts, getPostsError, loading, totalPosts } = useSelector(
    (state) => state.blog.posts
  );

  const urlParams = new URLSearchParams(location.search);
  const pageNumber = Number(urlParams.get("page")) || 1;
  const limitNumber = Number(urlParams.get("limit")) || 50;
  const [page, setPage] = useState(pageNumber);
  const [limit, setLimit] = useState(limitNumber);

  useEffect(() => {
    dispatch(postActions.getPosts(`?page=${page}&limit=${limit}`));
  }, [page, limit, dispatch, location]);

  const handlePageChange = (event, value) => {
    setPage(value + 1);
    history.replace({
      pathname: "/blog",
      search: `?page=${value + 1}&limit=${limit}`,
    });
  };
  const handleChangeRowsPerPage = (event) => {
    setLimit(Number(event.target.value));
    setPage(1);
    history.replace({
      pathname: "/blog",
      search: `?page=1&limit=${event.target.value}`,
    });
  };
  return (
    <S.Container>
      {loading && <CircularProgress />}

      <TableContainer component={Paper}>
        {posts && posts.length > 0 && (
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
                <TableCell align="left">Published</TableCell>
                <TableCell align="left"></TableCell>
              </TableRow>
            </TableHead>

            <TableBody>
              {posts.map((post, index) => (
                <TableRow key={post._id}>
                  <TableCell component="th" scope="row">
                    {(page - 1) * limit + index + 1}
                  </TableCell>
                  <TableCell component="th" scope="row">
                    {post._id}
                  </TableCell>
                  <TableCell align="left">{post.author}</TableCell>
                  <TableCell align="left">{post.title}</TableCell>
                  <TableCell align="left">
                    {post.body.replace(/(<([^>]+)>)/gi, "").slice(0, 20) +
                      " ..."}
                  </TableCell>
                  <TableCell align="left">
                    <Switch
                      checked={post.published}
                      // onChange={handleChange}
                      color="primary"
                      name="published"
                    />
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
            <TableFooter>
              <TableRow>
                {posts.length > 0 && (
                  <TablePagination
                    rowsPerPageOptions={[1, 5, 10, 25, 50]}
                    colSpan={4}
                    count={totalPosts}
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

      {getPostsError && <span>{getPostsError}</span>}
    </S.Container>
  );
};

export default BlogPostTable;
