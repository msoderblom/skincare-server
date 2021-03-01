import React, { useState } from "react";
import { useForm } from "react-hook-form";
import {
  TextField,
  FormControlLabel,
  Checkbox,
  FormGroup,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import Button from "../../../components/Button";
import Input from "../../../components/Input";
import * as S from "./styled";
import SocialLinkInput from "../components/SocialLinkInput/SocialLinkInput";
import { skinfluencerActions } from "../../../redux/skinfluencers";
import { useDispatch, useSelector } from "react-redux";

const CreateSkinfluencerPage = () => {
  // const classes = useStyles();
  const [professionalTitle, setProfessionalTitle] = useState(false);
  const [socialLinks, setSocialLinks] = useState([]);

  const { register, handleSubmit, errors } = useForm();

  const dispatch = useDispatch();
  const { createdSkinfluencer, createSkinfluencerError, loading } = useSelector(
    (state) => state.skinfluencers
  );

  const handleCreateSkinfluencer = (data) => {
    console.log("In handleCreateSkinfluencer");
    console.log("data: ", data);
    console.log("prof title: ", professionalTitle);
    console.log("socialLinks: ", socialLinks);

    const payload = {
      ...data,
      hasProfessionalTitle: professionalTitle,
      socialLinks,
    };

    dispatch(skinfluencerActions.createSkinfluencer(payload));
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
    <S.Container>
      <p>CreateSkinfluencerPage</p>
      {/* TODO: Add field for uploading an image of the person */}

      <form onSubmit={handleSubmit(handleCreateSkinfluencer)}>
        <Input
          name="name"
          register={register}
          // error={errors.title?.message}
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
        <FormControlLabel
          control={
            <Checkbox
              checked={professionalTitle}
              onChange={() => setProfessionalTitle((prev) => !prev)}
              name="hasProfessionalTitle"
              color="primary"
              ref={register}
            />
          }
          label="The skinfluencer has a professional title"
        />
        <TextField
          name="about"
          label="About"
          multiline
          rows={4}
          variant="outlined"
          required
          inputRef={register}
          helperText={errors.about?.message}
          error={errors.about}
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
        <Button title="Create Skinfluencer" type="submit" />
        {createSkinfluencerError && <span>{createSkinfluencerError}</span>}
      </form>
    </S.Container>
  );
};

export default CreateSkinfluencerPage;
