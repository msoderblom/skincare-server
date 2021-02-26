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

const useStyles = makeStyles((theme) => ({
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
}));

const CreateSkinfluencerPage = () => {
  const classes = useStyles();
  const [professionalTitle, setProfessionalTitle] = useState(false);
  const { register, handleSubmit, errors } = useForm();

  const handleCreateSkinfluencer = (data) => {
    console.log("In handleCreateSkinfluencer");
    console.log(data);
    console.log(professionalTitle);
    // console.log(files);

    // dispatch(postActions.createPost(payload));
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

        <FormGroup>
          <FormControl variant="outlined" className={classes.formControl}>
            <InputLabel id="demo-simple-select-outlined-label">
              Platform
            </InputLabel>
            <Select
              labelId="platform-label"
              id="platform-select"
              // value={age}
              // onChange={handleChange}
              label="Platform"
            >
              <MenuItem value="instagram">Instagram</MenuItem>
              <MenuItem value="twitter">Twitter</MenuItem>
              <MenuItem value="facebook">Facebook</MenuItem>
              <MenuItem value="youtube">Youtube</MenuItem>
              <MenuItem value="tiktok">Tiktok</MenuItem>
              <MenuItem value="website">Website</MenuItem>
              <MenuItem value="blog">Blog</MenuItem>
            </Select>
          </FormControl>
          <Input
            name="linkName"
            register={register}
            // error={errors.title?.message}
            type="text"
            label="Link Name"
            // required
          />
        </FormGroup>

        <Button title="Create Skinfluencer" type="submit" />
      </form>
    </S.Container>
  );
};

export default CreateSkinfluencerPage;
