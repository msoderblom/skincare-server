import { IconButton, Menu, MenuItem } from "@material-ui/core";
import MoreHorizIcon from "@material-ui/icons/MoreHoriz";
import DeleteIcon from "@material-ui/icons/Delete";
import VisibilityIcon from "@material-ui/icons/Visibility";
import EditIcon from "@material-ui/icons/Edit";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import ConfirmDialog from "../ConfirmDialog";
import * as S from "./styled";

const ActionMenu = ({ id, handleDelete }) => {
  const [anchorEl, setAnchorEl] = useState(null);
  const [confirmDialog, setConfirmDialog] = useState({
    isOpen: false,
    title: "",
    subTitle: "",
    onConfirm: () => {},
  });
  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleActionBtnClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  return (
    <S.Container>
      <IconButton
        /*    size="small" */
        aria-controls="action-menu"
        aria-haspopup="true"
        onClick={(e) => handleActionBtnClick(e)}
      >
        <MoreHorizIcon fontSize="default" />
      </IconButton>
      <Menu
        id="simple-menu"
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        <MenuItem onClick={handleClose}>
          <VisibilityIcon /> View
        </MenuItem>
        <MenuItem onClick={handleClose}>
          <Link style={{ display: "flex", textDecoration: "none" }}>
            <EditIcon /> Edit
          </Link>
        </MenuItem>
        <MenuItem
          onClick={() => {
            console.log("delete btn clicked");
            handleClose();
            setConfirmDialog({
              isOpen: true,
              title: "Are you sure you want to delete this Skinfluencer?",
              subTitle: "You can't regret this action?",
              onConfirm: () => handleDelete(id),
            });
          }}
        >
          <DeleteIcon htmlColor="red" />
          Delete
        </MenuItem>
      </Menu>
      <ConfirmDialog
        confirmDialog={confirmDialog}
        setConfirmDialog={setConfirmDialog}
      />
    </S.Container>
  );
};

export default ActionMenu;
