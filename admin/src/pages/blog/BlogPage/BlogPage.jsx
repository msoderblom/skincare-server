import React from "react";
import * as S from "./styled";
// import { Link, useHistory, useLocation } from "react-router-dom";
// import { useDispatch, useSelector } from "react-redux";
// import { postActions } from "../../redux/blog/posts";
import BlogPostTable from "./components/BlogPostTable";
import Button from "../../../components/Button";

const BlogPage = () => {
  /*   const dispatch = useDispatch();
  const location = useLocation();
  const history = useHistory(); */

  return (
    <S.Container>
      <p>BlogPage</p>

      <Button title="New Post" link="blog/create-post" />
      <BlogPostTable />
    </S.Container>
  );
};

export default BlogPage;
