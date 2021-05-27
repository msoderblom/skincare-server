import React from "react";
import * as S from "./styled";
import BlogPostTable from "./components/BlogPostTable";
import Button from "../../../components/Button";

const BlogPage = () => {
  return (
    <S.Container>
      <h1>All Posts</h1>
      <Button title="New Post" link="/blog/create-post" />
      <BlogPostTable />
    </S.Container>
  );
};

export default BlogPage;
