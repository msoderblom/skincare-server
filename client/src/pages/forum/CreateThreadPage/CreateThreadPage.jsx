import { yupResolver } from "@hookform/resolvers/yup";
import { TextareaAutosize, TextField } from "@material-ui/core";
import React from "react";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import Input from "../../../components/Input";
import createThreadSchema from "../../../validation/createThreadSchema";
import * as S from "./styled";

const CreateThreadPage = () => {
  const { register, handleSubmit, errors, setError, reset } = useForm({
    resolver: yupResolver(createThreadSchema),
  });
  const dispatch = useDispatch();

  const handleCreateThread = (data) => {
    console.log("In handleSignIn");
    console.log(data);

    // dispatch(userActions.signIn(data));
  };

  return (
    <S.Container>
      <p>CreateThreadPage</p>

      <form onSubmit={handleSubmit(handleCreateThread)}>
        <Input
          name="title"
          register={register}
          error={errors.title?.message}
          type="text"
          label="Title"
          required
        />

        <TextField
          name="body"
          label="Body"
          multiline
          rows={4}
          variant="outlined"
          required
          inputRef={register}
          helperText={errors.body?.message}
          errors={errors.body}
        />

        <button type="submit">Create Thread</button>
        {/* {signInError && <span>{signInError}</span>} */}
      </form>
    </S.Container>
  );
};

export default CreateThreadPage;
