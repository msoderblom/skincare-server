import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { TextField, FormControlLabel, Checkbox } from "@material-ui/core";
import Button from "../../../components/Button";
import Input from "../../../components/Input";
import * as S from "./styled";
import SocialLinkInput from "../components/SocialLinkInput/SocialLinkInput";
import { skinfluencerActions } from "../../../redux/skinfluencers";
import { useDispatch, useSelector } from "react-redux";

const CreateSkinfluencerPage = () => {
  const [professionalTitle, setProfessionalTitle] = useState(false);
  const [socialLinks, setSocialLinks] = useState([]);

  const { register, handleSubmit, errors } = useForm();

  const dispatch = useDispatch();
  const { createSkinfluencerError } = useSelector(
    (state) => state.skinfluencers
  );

  const handleCreateSkinfluencer = (data) => {
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
      <h1>Create Skinfluencer</h1>
      {/* TODO: Add field for uploading an image of the person */}

      <S.Form onSubmit={handleSubmit(handleCreateSkinfluencer)}>
        <Input
          name="name"
          register={register}
          type="text"
          label="Name"
          required
          style={{ gridColumn: "span 2" }}
        />
        <Input
          name="title"
          register={register}
          type="text"
          label="Title (e.g. dermatologist or youtuber)"
          required
          style={{ gridColumn: "span 2" }}
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
          style={{ gridColumn: "span 2" }}
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
          style={{ gridColumn: "span 2" }}
        />
        <div style={{ gridColumn: "span 2" }}>
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

          <Button
            title="Add Social Link"
            onClick={handleAddSocialLink}
            style={{ marginTop: 20 }}
          />
        </div>
        <S.SubmitBtn title="Create Skinfluencer" type="submit" />
        {createSkinfluencerError && <span>{createSkinfluencerError}</span>}
      </S.Form>
    </S.Container>
  );
};

export default CreateSkinfluencerPage;
