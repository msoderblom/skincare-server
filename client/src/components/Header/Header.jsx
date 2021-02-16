import React, { useEffect, useState } from "react";
import { useHistory, useLocation } from "react-router-dom";
import * as S from "./styled";
import decode from "jwt-decode";
import { useDispatch } from "react-redux";
import { userTypes } from "../../redux/user";
const Header = () => {
  const location = useLocation();
  const dispatch = useDispatch();
  const history = useHistory();
  const profile = JSON.parse(localStorage.getItem("profile"));

  // console.log(profile);
  const [user, setUser] = useState(profile?.user || null);

  useEffect(() => {
    //JWT ...
    const token = profile?.token;
    if (token) {
      const decodedToken = decode(token);
      // Check if the users token has expired, if true then logout will
      if (decodedToken.exp * 1000 < new Date().getTime()) {
        signOut();
      }
    }

    setUser(JSON.parse(localStorage.getItem("profile"))?.user);
    // eslint-disable-next-line
  }, [location]);

  const signOut = () => {
    dispatch({ type: userTypes.SIGN_OUT });
    // history.push("/");
    setUser(null);
  };

  return (
    <S.Container>
      <p>Header</p>
      {user && <p>User: {user.username}</p>}

      {user && <button onClick={signOut}>Sign Out</button>}
      {!user && (
        <button onClick={() => history.push("/auth")}>Sign In / Sign Up</button>
      )}
    </S.Container>
  );
};

export default Header;
