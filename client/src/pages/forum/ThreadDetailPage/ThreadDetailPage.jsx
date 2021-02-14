import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { threadActions } from "../../../redux/forum/threads";
import * as S from "./styled";

const ThreadDetailPage = () => {
  const { id } = useParams();
  const dispatch = useDispatch();

  useEffect(() => {
    // dispatch(threadActions.getThreads(`?page=$}`));
  }, [dispatch]);

  return (
    <S.Container>
      <p>ThreadDetailPage</p>
      {id && <p>{id}</p>}
    </S.Container>
  );
};

export default ThreadDetailPage;
