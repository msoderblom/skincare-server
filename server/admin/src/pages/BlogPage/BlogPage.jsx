import React, { useEffect, useState } from "react";
import * as S from "./styled";
import { DataGrid } from "@material-ui/data-grid";
import {
  CircularProgress,
  TableContainer,
  Table,
  TableBody,
  Paper,
  TableHead,
  TableRow,
  TableCell,
  Switch,
} from "@material-ui/core";
import { Link, useHistory, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { postActions } from "../../redux/blog/posts";
const rows = [
  { id: 1, col1: "Hello", col2: "World" },
  { id: 2, col1: "XGrid", col2: "is Awesome" },
  { id: 3, col1: "Material-UI", col2: "is Amazing" },
];
const columns = [
  { field: "col1", headerName: "Column 1", width: 150 },
  { field: "col2", headerName: "Column 2", width: 150 },
];

const BlogPage = () => {
  const dispatch = useDispatch();
  const location = useLocation();
  const history = useHistory();

  const urlParams = new URLSearchParams(location.search);
  const pageNumber = Number(urlParams.get("page")) || 1;
  const [page, setPage] = useState(pageNumber);

  const { posts, getPostsError, totalPages, loading } = useSelector(
    (state) => state.blog.posts
  );

  useEffect(() => {
    dispatch(postActions.getPosts(`?page=${page}`));
  }, [page, dispatch, location]);
  return (
    <S.Container>
      <p>BlogPage</p>

      {/* {posts && posts.map((post) => <p>{post.title}</p>)} */}
      {/* {loading && <CircularProgress />} */}

      <TableContainer component={Paper}>
        <Table aria-label="simple table" style={{ height: 300, width: "100%" }}>
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
            {posts &&
              posts.length > 0 &&
              posts.map((post, index) => (
                <TableRow key={post._id}>
                  <TableCell component="th" scope="row">
                    {index + 1}
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
        </Table>
      </TableContainer>

      {/*   <div style={{ height: 300, width: "100%" }}>
        <DataGrid rows={rows} columns={columns} />
      </div> */}
    </S.Container>
  );
};

export default BlogPage;
