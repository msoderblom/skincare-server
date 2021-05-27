import React from "react";
import UsersTable from "../components/UsersTable";
import * as S from "./styled";

const UsersPage = () => {
  return (
    <S.Container>
      <h1>All Users</h1>
      <UsersTable />
    </S.Container>
  );
};

export default UsersPage;
