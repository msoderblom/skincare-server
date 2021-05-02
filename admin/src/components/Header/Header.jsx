import React, { useEffect } from "react";
import * as S from "./styled";
import {
  AppBar,
  Toolbar,
  Typography,
  IconButton,
  Menu,
  MenuItem,
} from "@material-ui/core";
import AccountCircle from "@material-ui/icons/AccountCircle";
import { makeStyles } from "@material-ui/core/styles";
import { useDispatch, useSelector } from "react-redux";
import { useLocation } from "react-router";
import decode from "jwt-decode";
import { adminTypes } from "../../redux/admin";

const useStyles = makeStyles((theme) => ({
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
  },
}));

const Header = () => {
  const classes = useStyles();
  const location = useLocation();
  const dispatch = useDispatch();

  const { admin } = useSelector((state) => state.admin);

  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);

  useEffect(() => {
    const profile = JSON.parse(localStorage.getItem("profile"));
    const token = profile?.token;
    if (token) {
      const decodedToken = decode(token);
      // Check if the users token has expired, if true then logout will
      if (decodedToken.exp * 1000 < new Date().getTime()) {
        // signOut();
      }

      if (profile.admin) {
        dispatch({
          type: adminTypes.SET_ADMIN,
          payload: profile.admin,
        });
      }
    }

    // eslint-disable-next-line
  }, [location]);

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <AppBar position="fixed" className={classes.appBar}>
      <S.Toolbar>
        <Typography variant="h5" noWrap>
          Skincare Admin
        </Typography>
        {admin && (
          <S.AdminContainer>
            <div>
              <IconButton
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={handleMenu}
                color="inherit"
              >
                <AccountCircle />
              </IconButton>
              <Menu
                id="menu-appbar"
                anchorEl={anchorEl}
                getContentAnchorEl={null}
                anchorOrigin={{
                  vertical: "bottom",
                  horizontal: "left",
                }}
                keepMounted
                transformOrigin={{
                  vertical: "top",
                  horizontal: "left",
                }}
                open={open}
                onClose={handleClose}
              >
                <MenuItem onClick={handleClose}>Sign Out</MenuItem>
              </Menu>
            </div>
            <Typography variant="subtitle1" noWrap>
              {admin.firstName} {admin.lastName}
            </Typography>
          </S.AdminContainer>
        )}
      </S.Toolbar>
    </AppBar>
  );
};

export default Header;
