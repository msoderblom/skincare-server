import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { resellerActions } from "../../../redux/k-beauty/resellers";
import * as S from "./styled";

const ResellerDetailPage = ({ edit = false }) => {
  const { id } = useParams();
  const dispatch = useDispatch();

  const { currentReseller: reseller, errors } = useSelector(
    (state) => state.kBeauty.resellers
  );

  useEffect(() => {
    dispatch(resellerActions.getOneReseller(id));
  }, [dispatch, id]);

  return (
    <S.Container>
      <p>ResellerDetailPage</p>
      {edit && <p>edit is: true</p>}
      {!edit && <p>edit is: false</p>}
      {id && <p>id is: {id}</p>}
      {reseller && <p>{reseller.name}</p>}

      {errors.getOneReseller && <p>{errors.getOneReseller}</p>}
    </S.Container>
  );
};

export default ResellerDetailPage;
