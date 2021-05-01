import {
  Checkbox,
  FormControlLabel,
  Paper,
  Typography,
} from "@material-ui/core";
import React, { useEffect, useState } from "react";
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
import Input from "../../../components/Input";
import EditIcon from "@material-ui/icons/Edit";
import { Controller, useForm } from "react-hook-form";
import SocialLinkInput from "../components/SocialLinkInput/SocialLinkInput";

const SkinfluencerDetailPage = ({ edit = false }) => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const history = useHistory();

  const {
    currentSkinfluencer: skinfluencer,
    updateSkinfluencerError,
  } = useSelector((state) => state.skinfluencers);
  const [socialLinks, setSocialLinks] = useState([]);

  const {
    register,
    handleSubmit,
    setValue /* errors: formErrors  */,
    control,
  } = useForm({
    defaultValues: {
      name: skinfluencer?.name || "",
      about: skinfluencer?.about || "",
      hasProfessionalTitle: skinfluencer?.hasProfessionalTitle || false,
    },
  });

  useEffect(() => {
    if (skinfluencer) {
      setValue("name", skinfluencer.name);
      setValue("title", skinfluencer.title);
      setValue("about", skinfluencer.about);
      setValue("hasProfessionalTitle", skinfluencer.hasProfessionalTitle);
      setSocialLinks(skinfluencer.socialLinks);
    }
  }, [skinfluencer, setValue, edit]);

  useEffect(() => {
    dispatch(skinfluencerActions.getOneSkinfluencer(id));

    return () =>
      dispatch({
        type: skinfluencerTypes.GET_ONE_SKINFLUENCER_SUCCESS,
        payload: null,
      });
  }, [dispatch, id]);

  const handleUpdateSkinfluencer = (data) => {
    console.log("data: ", data);
    console.log("links: ", socialLinks);

    const payload = {
      ...data,
      socialLinks,
    };
    dispatch(skinfluencerActions.updateSkinfluencer(id, payload, history));
  };

  const handleAddSocialLink = () => {
    // TODO: Maybe add a max value for the amount of social links
    const newLinks = [...socialLinks];
    newLinks.push({
      platform: "",
      linkName: "",
      url: "",
    });

    setSocialLinks(newLinks);
  };
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
                <strong>Title: </strong>
                {skinfluencer.title}
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
                  <Paper
                    key={socialLink._id}
                    style={{ padding: 20, marginBottom: 5 }}
                  >
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
            </Paper>
          )}
          {edit && (
            <Paper style={{ padding: 20 }}>
              <form onSubmit={handleSubmit(handleUpdateSkinfluencer)}>
                <Input
                  name="name"
                  register={register}
                  // error={formErrors.name?.message}
                  type="text"
                  label="Name"
                  required
                />
                <Input
                  name="title"
                  register={register}
                  // error={errors.title?.message}
                  type="text"
                  label="Title (e.g. dermatologist or youtuber)"
                  required
                />
                <Input
                  name="about"
                  register={register}
                  // error={formErrors.description?.message}
                  type="text"
                  label="about"
                  multiline
                  required
                />

                <Controller
                  control={control}
                  name="hasProfessionalTitle"
                  render={({ onChange, value, ref }) => (
                    <FormControlLabel
                      control={
                        <Checkbox
                          color="primary"
                          onChange={(e) => onChange(e.target.checked)}
                          checked={value}
                          inputRef={ref}
                        />
                      }
                      label="The skinfluencer has a professional title"
                    />
                  )}
                />

                {socialLinks.length > 0 &&
                  socialLinks.map((socialLink, index) => (
                    <SocialLinkInput
                      key={index}
                      socialLink={socialLink}
                      index={index}
                      socialLinks={socialLinks}
                      setSocialLinks={setSocialLinks}
                    />
                  ))}
                <Button title="Add Social Link" onClick={handleAddSocialLink} />

                <div style={{ display: "flex", justifyContent: "flex-end" }}>
                  <Button
                    title="Cancel"
                    link={`/skinfluencers/${skinfluencer._id}`}
                    color="default"
                  />
                  <Button
                    title="Save"
                    type="submit"
                    style={{ marginLeft: 10 }}
                  />
                </div>
                {updateSkinfluencerError && <p>{updateSkinfluencerError}</p>}
              </form>
            </Paper>
          )}
        </S.Container>
      )}
    </>
  );
};

export default SkinfluencerDetailPage;
