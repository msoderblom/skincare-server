import React from "react";
import * as S from "./styled";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import Input from "../../components/Input";
import signupSchema from "../../validation/signupSchema";

const AuthPage = () => {
  const { register, handleSubmit, errors, setError, reset } = useForm({
    resolver: yupResolver(signupSchema),
  });

  // const UserData = useSelector((state) => state)
  // const {user, error: signupError, loading} = useSelector((state) => state)

  const handleSignUp = (data) => {
    console.log("In handleSignUp");
    console.log(data);
    if (data.password !== data.confirmPassword) {
      return setError("confirmPassword", {
        type: "manual",
        message: "The password and confirm password do not match",
      });
    }

    /* 
    To display error from backend
    .catch(error) {
      setError("signupError", {
        type: "manual",
        message: error.response.data.error,
      })
    }
    
    */
  };

  return (
    <S.Container>
      <p>AuthPage</p>
      <form onSubmit={handleSubmit(handleSignUp)}>
        <Input
          name="username"
          register={register}
          error={errors.username?.message}
          type="text"
          label="Username"
          required
        />
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
        <Input
          name="confirmPassword"
          register={register}
          error={errors.confirmPassword?.message}
          type="password"
          label="Confirm password"
          required
        />
        <button type="submit">Sign Up</button>
      </form>
    </S.Container>
  );
};

export default AuthPage;
