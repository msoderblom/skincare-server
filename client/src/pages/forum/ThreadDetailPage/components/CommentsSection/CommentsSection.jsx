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
import {
  commentActions,
  commentTypes,
} from "../../../../../redux/forum/comments";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as S from "./styled";
import io from "socket.io-client";
import createCommentSchema from "../../../../../validation/createCommentSchema";

let socket;
const CommentsSection = ({ threadID }) => {
  const ENDPOINT = "http://localhost:5000";
  const dispatch = useDispatch();

  const { comments, getCommentsError, createCommentError } = useSelector(
    (state) => state.forum.comments
  );
  const { user } = useSelector((state) => state.user);

  const { register, handleSubmit, errors, reset } = useForm({
    resolver: yupResolver(createCommentSchema),
  });

  useEffect(() => {
    dispatch(commentActions.getComments(threadID));
    socket = io(ENDPOINT, {
      transport: ["websocket", "polling"],
    });

    socket.emit("join-comments-section", threadID);

    return () => {
      //  turn off socket if user leaves the comments section
      socket.off();
    };
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    console.log("Inside useEffect with socket.on");
    console.log("listen on new-comment");
    socket.on("new-comment", (comment) => {
      // dispatch(commentActions.getComments(threadID));
      dispatch({ type: commentTypes.UPDATE_COMMENTS, payload: comment });
    });
    // eslint-disable-next-line
  }, []);

  const handleSendComment = (data) => {
    dispatch(commentActions.createComment(data, threadID, socket));
    reset();
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
          inputRef={register}
          helperText={errors.content?.message}
          errors={errors.content}
        />

        <button type="submit">Comment</button>
        {createCommentError && <span>{createCommentError}</span>}
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
