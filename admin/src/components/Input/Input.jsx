import React, { useState } from "react";
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
  error,
  register,
  required,
  ...props
}) => {
  const [showPassword, setShowPassword] = useState(false);
  const handleShowPassword = () => setShowPassword((prev) => !prev);
  return (
    <S.Input
      {...props}
      name={name}
      label={label}
      onChange={handleChange}
      variant="outlined"
      required={required}
      fullWidth
      helperText={error}
      autoFocus={autoFocus}
      type={type === "password" && showPassword ? "text" : type}
      inputRef={register}
      InputProps={
        type === "password"
          ? {
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton onClick={handleShowPassword}>
                    {!showPassword ? <Visibility /> : <VisibilityOff />}
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
