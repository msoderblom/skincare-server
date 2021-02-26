import React from "react";
import UsersTable from "../components/UsersTable";
import * as S from "./styled";

const UsersPage = () => {
  return (
    <S.Container>
      <p>UsersPage</p>
      <UsersTable />
    </S.Container>
  );
};

export default UsersPage;
