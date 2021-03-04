import { IconButton, Menu, MenuItem } from "@material-ui/core";
import MoreHorizIcon from "@material-ui/icons/MoreHoriz";
import DeleteIcon from "@material-ui/icons/Delete";
import VisibilityIcon from "@material-ui/icons/Visibility";
import EditIcon from "@material-ui/icons/Edit";
import React, { useRef, useState } from "react";
import { Link } from "react-router-dom";
import ConfirmDialog from "../ConfirmDialog";
import * as S from "./styled";

const ActionMenu = ({ id, handleDelete, confirmTitle }) => {
  const anchorEl = useRef(null);
  const [isOpen, setIsOpen] = useState(false);
  const [confirmDialog, setConfirmDialog] = useState({
    isOpen: false,
    title: confirmTitle || "Are you sure you want to delete this record?",
    subTitle: "You can't undo this action?",
    onConfirm: () => handleDelete(id),
  });

  const handleClose = () => setIsOpen(false);

  const handleDeleteBtnClick = () => {
    console.log("delete btn clicked");
    handleClose();
    setConfirmDialog((prev) => ({ ...prev, isOpen: true }));
  };

  return (
    <S.Container>
      <IconButton
        /*    size="small" */
        aria-controls="action-menu"
        aria-haspopup="true"
        ref={anchorEl}
        onClick={() => setIsOpen((prev) => !prev)}
      >
        <MoreHorizIcon fontSize="default" />
      </IconButton>
      <Menu
        id="simple-menu"
        anchorEl={anchorEl.current}
        keepMounted
        open={isOpen}
        onClose={handleClose}
      >
        <MenuItem onClick={handleClose}>
          <VisibilityIcon /> View
        </MenuItem>
        <MenuItem onClick={handleClose}>
          <Link to="/" style={{ display: "flex", textDecoration: "none" }}>
            <EditIcon /> Edit
          </Link>
        </MenuItem>
        <MenuItem onClick={handleDeleteBtnClick}>
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
