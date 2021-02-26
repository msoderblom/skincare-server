import React from "react";
import * as S from "./styled";
import { InputAdornment, IconButton } from "@material-ui/core";
import Visibility from "@material-ui/icons/Visibility";
import VisibilityOff from "@material-ui/icons/VisibilityOff";
const Input = ({
  half,
  name,
  label,
  handleChange,
  autoFocus,
  type,
  handleShowPassword,
  error,
  register,
  required,
}) => {
  return (
    <S.Input
      name={name}
      label={label}
      onChange={handleChange}
      variant="outlined"
      required={required}
      fullWidth
      helperText={error}
      autoFocus={autoFocus}
      type={type}
      inputRef={register}
      InputProps={
        name === "password"
          ? {
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton onClick={handleShowPassword}>
                    {type === "password" ? <Visibility /> : <VisibilityOff />}
                  </IconButton>
                </InputAdornment>
              ),
            }
          : null
      }
    />
  );
};

export default Input;
