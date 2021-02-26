import React from "react";
import * as S from "./styled";
import { Button as MaterialButton } from "@material-ui/core";
import { Link } from "react-router-dom";

const Button = ({ link, title, ...props }) => {
  return (
    <S.Container>
      {link ? (
        <Link
          onClick={(e) => !link && e.preventDefault()}
          to={link ? link : ""}
        >
          <MaterialButton variant="contained" color="primary" {...props}>
            {title}
          </MaterialButton>
        </Link>
      ) : (
        <MaterialButton variant="contained" color="primary" {...props}>
          {title}
        </MaterialButton>
      )}
    </S.Container>
  );
};

export default Button;
