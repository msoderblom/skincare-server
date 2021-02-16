import {
  List,
  ListItem,
  ListItemText,
  TextField,
  Typography,
} from "@material-ui/core";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import * as S from "./styled";
// import openSocket from "socket.io-client"
import io from "socket.io-client";

let socket;
const CommentsSection = ({ threadID }) => {
  const ENDPOINT = "http://localhost:5000";

  /* socket.on("new-comments", (comment) => {
    setComments((prev) => [...prev, comment]);
  }); */
  const [comments, setComments] = useState([]);

  const { register, handleSubmit, errors, setError, reset } = useForm();

  useEffect(() => {
    getComments();
    socket = io(ENDPOINT, {
      transport: ["websocket", "polling"],
    });

    // const userId = JSON.parse(localStorage.getItem("profile")).user._id;
    socket.emit("join-comments-section", threadID);

    return () => {
      //  turn off socket if user leaves the comments section
      // socket.emit("leave-comments-section");

      socket.off();
    };
  }, []);

  useEffect(() => {
    console.log("Inside useEffect with socket.on");
    socket.on("new-comment", (comment) => {
      getComments();
      // setComments((prev) => [...prev, comment]);
    });
  }, []);

  const getComments = () => {
    fetch(`http://localhost:5000/api/forum/threads/${threadID}/comments`, {
      method: "GET",
    })
      .then((response) => response.json())
      .then((data) => setComments(data.comments));
  };

  const handleSendComment = (data) => {
    const payload = JSON.stringify(data);

    const token = JSON.parse(localStorage.getItem("profile")).token;
    fetch(`http://localhost:5000/api/forum/threads/${threadID}/comments`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: payload,
    })
      .then((response) => response.json())
      .then((data) => {
        socket.emit("new-comment", { comment: data.comment, threadID });
        reset();
      })
      .catch((err) => console.log(err.message));
  };

  return (
    <S.Container>
      <p>CommentsSection</p>

      <form onSubmit={handleSubmit(handleSendComment)}>
        <p>Leave a comment</p>

        <TextField
          name="content"
          label="Your comment"
          multiline
          variant="outlined"
          required
          inputRef={register}
          helperText={errors.content?.message}
          errors={errors.content}
        />

        <button type="submit">Comment</button>
      </form>

      {comments.length > 0 && (
        <List>
          {comments.map((comment) => (
            <ListItem key={comment._id} alignItems="flex-start">
              <ListItemText
                primary={comment.author.username}
                secondary={
                  <>
                    <Typography
                      component="span"
                      variant="body2"
                      color="textPrimary"
                    >
                      {comment.content}
                    </Typography>
                  </>
                }
              />
            </ListItem>
          ))}
        </List>
      )}
    </S.Container>
  );
};

export default CommentsSection;
