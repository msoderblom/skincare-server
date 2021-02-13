import { yupResolver } from "@hookform/resolvers/yup";
import React from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import Input from "../../../../components/Input";
import signinSchema from "../../../../validation/signinSchema";
import { userActions } from "../../../../redux/user";
import * as S from "./styled";

const SignInForm = () => {
  const { register, handleSubmit, errors } = useForm({
    resolver: yupResolver(signinSchema),
  });

  const dispatch = useDispatch();
  const { signInError } = useSelector((state) => state.user);

  const handleSignIn = (data) => {
    console.log("In handleSignIn");
    console.log(data);

    dispatch(userActions.signIn(data));
  };

  return (
    <S.Container>
      <p>SignInForm</p>
      <form onSubmit={handleSubmit(handleSignIn)}>
        <Input
          name="email"
          register={register}
          error={errors.email?.message}
          type="email"
          label="Email"
          required
        />
        <Input
          name="password"
          register={register}
          error={errors.password?.message}
          type="password"
          label="Password"
          required
        />

        <button type="submit">Sign In</button>
        {signInError && <span>{signInError}</span>}
      </form>
    </S.Container>
  );
};

export default SignInForm;
