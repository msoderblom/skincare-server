import React from "react";
import Input from "../../components/Input";
import * as S from "./styled";
import { yupResolver } from "@hookform/resolvers/yup";
import signinSchema from "../../validation/signinSchema";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { adminActions } from "../../redux/admin";
import { Redirect, useHistory } from "react-router";
import Button from "../../components/Button";

const SignInPage = () => {
  const { register, handleSubmit, errors } = useForm({
    resolver: yupResolver(signinSchema),
  });
  const history = useHistory();
  const dispatch = useDispatch();
  const { errors: adminErrors, admin } = useSelector((state) => state.admin);

  const handleSignIn = (data) => {
    console.log("In handleSignIn");
    console.log(data);

    dispatch(adminActions.signIn(data, history));
  };

  return (
    <>
      {admin ? (
        <S.Container>
          <form onSubmit={handleSubmit(handleSignIn)}>
            <Input
              autoComplete="email"
              name="email"
              register={register}
              error={errors.email?.message}
              type="email"
              label="Email"
              required
            />
            <Input
              autoComplete="current-password"
              name="password"
              register={register}
              error={errors.password?.message}
              type="password"
              label="Password"
              required
            />

            <Button type="submit" title="Sign In" />
            {adminErrors.signIn && <span>{adminErrors.signIn}</span>}
          </form>
        </S.Container>
      ) : (
        <Redirect
          to={{
            pathname: "/dashboard",
          }}
        />
      )}
    </>
  );
};

export default SignInPage;
