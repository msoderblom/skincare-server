import React from "react";
import { useParams } from "react-router-dom";
import * as S from "./styled";

const ResellerDetailPage = ({ edit = false }) => {
  const { id } = useParams();

  return (
    <S.Container>
      <p>ResellerDetailPage</p>
      {edit && <p>edit is: true</p>}
      {!edit && <p>edit is: false</p>}
      {id && <p>id is: {id}</p>}
    </S.Container>
  );
};

export default ResellerDetailPage;
