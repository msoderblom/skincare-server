import { yupResolver } from "@hookform/resolvers/yup";
import { TextField } from "@material-ui/core";
import React from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import Input from "../../../components/Input";
import { threadActions } from "../../../redux/forum/threads";
import createThreadSchema from "../../../validation/createThreadSchema";
import * as S from "./styled";

const CreateThreadPage = () => {
  const { register, handleSubmit, errors } = useForm({
    resolver: yupResolver(createThreadSchema),
  });
  const dispatch = useDispatch();

  const { createdThread, createThreadError } = useSelector(
    (state) => state.forum.threads
  );
  const handleCreateThread = (data) => {
    console.log("In handleSignIn");
    console.log(data);

    dispatch(threadActions.createThread(data));
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
        {createThreadError && <span>{createThreadError}</span>}
        {createdThread && <span>{createdThread.title}</span>}
      </form>
    </S.Container>
  );
};

export default CreateThreadPage;
