import React, { useEffect, useState } from "react";
import { Link, useHistory, useLocation } from "react-router-dom";
import * as S from "./styled";
import decode from "jwt-decode";

const Header = () => {
  const location = useLocation();
  const profile = JSON.parse(localStorage.getItem("profile"));

  // console.log(profile);
  const [user, setUser] = useState(profile?.user || null);

  useEffect(() => {
    //JWT ...
    const token = profile?.token;
    if (token) {
      // const decodedToken = decode(token);
      // Check if the users token has expired, if true then logout will
      /*  if (decodedToken.exp * 1000 < new Date().getTime()) {
        // logout();
      } */
    }

    setUser(JSON.parse(localStorage.getItem("profile"))?.user);
  }, [location, profile?.token]);

  return (
    <S.Container>
      <p>Header</p>
      {user && <p>User: {user.username}</p>}
    </S.Container>
  );
};

export default Header;
