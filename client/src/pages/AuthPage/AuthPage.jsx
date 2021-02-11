import React from "react";
import * as S from "./styled";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import Input from "../../components/Input";
import signupSchema from "../../validation/signupSchema";
import { useDispatch, useSelector } from "react-redux";
import { userActions } from "../../redux/user";
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
