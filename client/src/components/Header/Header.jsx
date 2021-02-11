import React, { useEffect, useState } from "react";
import { Link, useHistory, useLocation } from "react-router-dom";
import * as S from "./styled";
import decode from "jwt-decode";

const Header = () => {
  const location = useLocation();
  const { user: userData, token } = JSON.parse(localStorage.getItem("profile"));
  // console.log(profile);
  const [user, setUser] = useState(userData);
  console.log(user);

  useEffect(() => {
    //JWT ...

    if (token) {
      // const decodedToken = decode(token);
      // Check if the users token has expired, if true then logout will
      /*  if (decodedToken.exp * 1000 < new Date().getTime()) {
        // logout();
      } */
    }

    setUser(JSON.parse(localStorage.getItem("profile")).user);
  }, [location, token]);

  return (
    <S.Container>
      <p>Header</p>
      <p>User: {user.username}</p>
    </S.Container>
  );
};

export default Header;
