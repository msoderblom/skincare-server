import React, { useEffect, useState } from "react";
import { Link, useHistory, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { postActions } from "../../../redux/blog/posts";
import Pagination from "@material-ui/lab/Pagination";
import * as S from "./styled";
import { CircularProgress } from "@material-ui/core";

const BlogFeedPage = () => {
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

  const handlePageChange = (event, value) => {
    setPage(value);
    history.replace({ pathname: "/blog", search: `?page=${value}` });
  };
  return (
    <S.Container>
      <p>BlogFeedPage</p>
      {totalPages > 1 && (
        <Pagination
          count={totalPages}
          page={page}
          onChange={handlePageChange}
        />
      )}
      {loading && <CircularProgress />}
      {posts.length > 0 && !loading && (
        <div>
          {posts.map((post) => (
            <div key={post._id}>
              <Link to={`/blog/post/${post._id}`}>
                <h3>{post.title}</h3>
              </Link>
              <span>Posted by: {post?.author}</span>
              <div dangerouslySetInnerHTML={{ __html: post.body }} />
            </div>
          ))}
        </div>
      )}

      {getPostsError && <span>{getPostsError}</span>}
    </S.Container>
  );
};

export default BlogFeedPage;
