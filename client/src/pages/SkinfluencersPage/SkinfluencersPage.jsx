import { CircularProgress } from "@material-ui/core";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { skinfluencerActions } from "../../redux/skinfluencers";
import Skinfluencer from "./components/Skinfluencer";
import * as S from "./styled";

const SkinfluencersPage = () => {
  const dispatch = useDispatch();

  const { skinfluencers, getSkinfluencersError, loading } = useSelector(
    (state) => state.skinfluencers
  );

  useEffect(() => {
    dispatch(skinfluencerActions.getSkinfluencers());
    // eslint-disable-next-line
  }, []);

  return (
    <S.Container>
      <p>SkinfluencersPage</p>

      <div>
        {loading && <CircularProgress />}
        {skinfluencers &&
          !loading &&
          skinfluencers.map((skinfluencer) => (
            <Skinfluencer key={skinfluencer._id} skinfluencer={skinfluencer} />
          ))}

        {getSkinfluencersError && <span>{getSkinfluencersError}</span>}
      </div>
    </S.Container>
  );
};

export default SkinfluencersPage;
