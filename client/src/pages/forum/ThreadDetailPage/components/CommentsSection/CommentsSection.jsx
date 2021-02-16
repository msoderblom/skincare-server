import {
  List,
  ListItem,
  ListItemText,
  TextField,
  Typography,
} from "@material-ui/core";
import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { commentActions } from "../../../../../redux/forum/comments";
import { useForm } from "react-hook-form";
import * as S from "./styled";
import io from "socket.io-client";

let socket;
const CommentsSection = ({ threadID }) => {
  const ENDPOINT = "http://localhost:5000";
  const dispatch = useDispatch();
  const location = useLocation();

  // const [comments, setComments] = useState([]);

  const { comments, getCommentsError, loading } = useSelector(
    (state) => state.forum.comments
  );

  const { register, handleSubmit, errors, setError, reset } = useForm();

  useEffect(() => {
    dispatch(commentActions.getComments(threadID));
    socket = io(ENDPOINT, {
      transport: ["websocket", "polling"],
    });

    socket.emit("join-comments-section", threadID);

    return () => {
      //  turn off socket if user leaves the comments section
      // socket.emit("leave-comments-section");

      socket.off();
    };
  }, [location, threadID, dispatch]);

  useEffect(() => {
    console.log("Inside useEffect with socket.on");
    socket.on("new-comment", (comment) => {
      dispatch(commentActions.getComments(threadID));
      // setComments((prev) => [...prev, comment]);
    });
  }, []);

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

      {getCommentsError && <span>{getCommentsError}</span>}
    </S.Container>
  );
};

export default CommentsSection;
