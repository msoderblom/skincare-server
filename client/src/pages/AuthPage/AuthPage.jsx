import React from "react";
import * as S from "./styled";
import SignUpForm from "./components/SignUpForm";
import SignInForm from "./components/SignInForm";

const AuthPage = () => {
  // const UserData = useSelector((state) => state)
  // const { user, signUpError, loading } = useSelector((state) => state.user);

  return (
    <S.Container>
      <p>AuthPage</p>

      <SignUpForm />
      <SignInForm />
    </S.Container>
  );
};

export default AuthPage;
