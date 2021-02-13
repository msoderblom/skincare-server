import { CircularProgress } from "@material-ui/core";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { threadActions } from "../../../redux/forum/threads";
import Pagination from "@material-ui/lab/Pagination";
import * as S from "./styled";
import { useHistory, useLocation } from "react-router-dom";

const ForumFeedPage = (props) => {
  const dispatch = useDispatch();
  const location = useLocation();
  const history = useHistory();

  const urlParams = new URLSearchParams(location.search);
  const pageNumber = Number(urlParams.get("page")) || 1;
  const [page, setPage] = useState(pageNumber);

  const { threads, getThreadsError, totalPages, loading } = useSelector(
    (state) => state.forum.threads
  );

  useEffect(() => {
    dispatch(threadActions.getThreads(`?page=${page}&limit=2`));
  }, [page, dispatch]);

  const handlePageChange = (event, value) => {
    setPage(value);
    history.replace({ pathname: "/forum", search: `?page=${value}` });
  };

  return (
    <S.Container>
      <p>ForumFeedPage</p>

      {totalPages > 1 && (
        <Pagination
          count={totalPages}
          page={page}
          onChange={handlePageChange}
        />
      )}
      {loading && <CircularProgress />}
      {threads.length > 0 && !loading && (
        <div>
          {threads.map((thread) => (
            <p key={thread._id}>{thread.title}</p>
          ))}
        </div>
      )}

      {getThreadsError && <span>{getThreadsError}</span>}
    </S.Container>
  );
};

export default ForumFeedPage;
