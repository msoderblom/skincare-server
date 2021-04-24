import { Paper, Typography } from "@material-ui/core";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useParams } from "react-router";
import {
  skinfluencerActions,
  skinfluencerTypes,
} from "../../../redux/skinfluencers";
import * as S from "./styled";
import Moment from "react-moment";
import "moment-timezone";
import Button from "../../../components/Button";
import EditIcon from "@material-ui/icons/Edit";

const SkinfluencerDetailPage = ({ edit = false }) => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const history = useHistory();

  const { currentSkinfluencer: skinfluencer, errors } = useSelector(
    (state) => state.skinfluencers
  );

  useEffect(() => {
    dispatch(skinfluencerActions.getOneSkinfluencer(id));

    return () =>
      dispatch({
        type: skinfluencerTypes.GET_ONE_SKINFLUENCER_SUCCESS,
        payload: null,
      });
  }, [dispatch, id]);
  return (
    <>
      {skinfluencer && (
        <S.Container>
          <Typography variant="subtitle1" component="h2">
            <strong>Skinfluencer</strong>
          </Typography>
          <h1 style={{ marginTop: 0 }}>
            {edit && "Edit: "}
            {skinfluencer.name}
          </h1>
          <Typography variant="subtitle1" component="h2">
            <strong>ID: </strong>
            {skinfluencer._id}
          </Typography>

          {!edit && (
            <Paper style={{ padding: 20 }}>
              <div>
                <p>
                  <strong>Created: </strong>{" "}
                  <Moment format="YYYY-MM-DD">{skinfluencer.createdAt}</Moment>
                </p>
                <p>
                  <strong>Last updated: </strong>
                  <Moment format="YYYY-MM-DD HH:mm">
                    {skinfluencer.updatedAt}
                  </Moment>
                  {" ("}
                  <Moment fromNow>{skinfluencer.updatedAt}</Moment>
                  {")"}
                </p>

                <Button
                  title="Edit"
                  link={`/skinfluencers/${skinfluencer._id}/edit`}
                  startIcon={<EditIcon />}
                />
              </div>
              <p>
                <strong>Name: </strong>
                {skinfluencer.name}
              </p>
              <p>
                <strong>Has a professional title: </strong>
                {skinfluencer.hasProfessionalTitle ? "Yes" : "No"}
              </p>

              <strong>About:</strong>
              <p style={{ marginTop: 5 }}>{skinfluencer.about}</p>

              <h3>Social Links</h3>
              {skinfluencer.socialLinks.length > 0 &&
                skinfluencer.socialLinks.map((socialLink) => (
                  <Paper style={{ padding: 20, marginBottom: 5 }}>
                    <p>
                      <strong>Platform: </strong>
                      {socialLink.platform}
                    </p>
                    <p>
                      <strong>Link Name / Username: </strong>
                      {socialLink.linkName}
                    </p>
                    <p>
                      <strong>Link Url: </strong>
                      <a href={socialLink.url} rel="noreferrer">
                        {socialLink.url}
                      </a>
                    </p>
                  </Paper>
                ))}
              {/* <p>
                <strong>Link Url: </strong>
                <a href={skinfluencer.link.url} rel="noreferrer">
                  {skinfluencer.link.url}
                </a>
              </p> */}
            </Paper>
          )}
        </S.Container>
      )}
    </>
  );
};

export default SkinfluencerDetailPage;
