import React, { useState } from "react";
import * as S from "./styled";
import Input from "../../../components/Input";
// import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { useForm } from "react-hook-form";
import Button from "../../../components/Button";
import ImageDropZone from "../../../components/ImageDropZone";
import { useDispatch, useSelector } from "react-redux";
import { postActions } from "../../../redux/blog/posts";

/* const modules = {
  toolbar: [
    [{ header: [1, 2, 3, false] }],
    ["bold", "italic", "underline", "strike", "blockquote"],
    [
      { list: "ordered" },
      { list: "bullet" },
      { indent: "-1" },
      { indent: "+1" },
    ],
    ["link", "image", "video"],
    ["clean"],
  ],
}; */

/* const formats = [
  "header",
  "bold",
  "italic",
  "underline",
  "strike",
  "blockquote",
  "list",
  "bullet",
  "indent",
  "link",
  "image",
  "video",
]; */

const CreatePostPage = () => {
  // title, body, author
  const [body] = useState("");
  const [files, setFiles] = useState([]);
  const { register, handleSubmit } = useForm();

  const dispatch = useDispatch();

  const { createPostError } = useSelector((state) => state.blog.posts);

  const handleCreatePost = (data) => {
    console.log("In handleCreatePost");
    console.log(data);
    console.log(body);
    console.log(files);

    const payload = new FormData();
    payload.append("title", JSON.stringify(data.title));
    payload.append("body", JSON.stringify(body));

    if (files.length > 0) {
      files.forEach((file) => {
        payload.append("images", file);
      });
    }

    dispatch(postActions.createPost(payload));
  };
  return (
    <S.Container>
      <p>CreatePostPage</p>

      <form onSubmit={handleSubmit(handleCreatePost)}>
        <ImageDropZone
          name="images"
          /* register={register} */
          files={files}
          setFiles={setFiles}
        />
        <Input
          name="title"
          register={register}
          // error={errors.title?.message}
          type="text"
          label="Title"
          required
        />
        {/*  <ReactQuill
          value={body}
          onChange={setBody}
          modules={modules}
          formats={formats}
        /> */}
        <Button title="Create Post" type="submit" />
        {createPostError && <span>{createPostError}</span>}
      </form>
    </S.Container>
  );
};

export default CreatePostPage;
