import React from "react";
import * as S from "./styled";
import { Button as MaterialButton } from "@material-ui/core";
import { Link } from "react-router-dom";

const Button = ({
  link,
  title,
  color = "primary",
  style,
  className,
  ...props
}) => {
  return (
    <S.Container style={style} className={className}>
      {link ? (
        <Link
          onClick={(e) => !link && e.preventDefault()}
          to={link ? link : ""}
          style={{ textDecoration: "none" }}
        >
          <MaterialButton variant="contained" color={color} {...props}>
            {title}
          </MaterialButton>
        </Link>
      ) : (
        <MaterialButton variant="contained" color={color} {...props}>
          {title}
        </MaterialButton>
      )}
    </S.Container>
  );
};

export default Button;
