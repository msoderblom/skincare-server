import React, { useState } from "react";
import * as S from "./styled";
import Input from "../../../components/Input";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { useForm } from "react-hook-form";
import Button from "../../../components/Button";

const CreatePostPage = () => {
  // title, body, author
  const [body, setBody] = useState("");
  const { register, handleSubmit, errors } = useForm();

  const handleCreatePost = (data) => {
    console.log("In handleCreatePost");
    console.log(data);
    console.log(body);

    // dispatch(threadActions.createThread(data));
  };
  return (
    <S.Container>
      <p>CreatePostPage</p>
      <form onSubmit={handleSubmit(handleCreatePost)}>
        <Input
          name="title"
          register={register}
          // error={errors.title?.message}
          type="text"
          label="Title"
          required
        />
        <ReactQuill value={body} onChange={setBody} />
        <Button title="Create Post" type="submit" />
      </form>
    </S.Container>
  );
};

export default CreatePostPage;
