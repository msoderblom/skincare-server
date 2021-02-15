import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { threadActions, threadTypes } from "../../../redux/forum/threads";
import * as S from "./styled";

const ThreadDetailPage = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const {
    viewedThread: thread,
    threads,
    getOneThreadError,
    loading,
  } = useSelector((state) => state.forum.threads);

  useEffect(() => {
    const threadFromRedux = threads.find((thread) => thread._id === id);

    if (threadFromRedux) {
      console.log("Getting thread from redux");
      dispatch({
        type: threadTypes.GET_ONE_THREAD_SUCCESS,
        payload: { ...threadFromRedux },
      });
    } else {
      console.log("Getting thread from api");
      dispatch(threadActions.getOneThread(id));
    }
  }, [dispatch, id, threads]);

  return (
    <S.Container>
      <p>ThreadDetailPage</p>
      {id && <p>{id}</p>}
      {thread && (
        <div>
          <h2>{thread.title}</h2>
          <span>Posted by: {thread.author.username}</span>
          <p>{thread.body}</p>
        </div>
      )}
    </S.Container>
  );
};

export default ThreadDetailPage;
