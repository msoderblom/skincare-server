import { Menu, MenuItem, TableCell, TableRow } from "@material-ui/core";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import Button from "../../../../components/Button";
import ConfirmDialog from "../../../../components/ConfirmDialog";
import * as S from "./styled";

const SkinfluencerRow = ({ skinfluencer, index, handleDelete }) => {
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
    <>
      <TableRow>
        <TableCell component="th" scope="row">
          {index + 1}
        </TableCell>
        <TableCell component="th" scope="row">
          {skinfluencer._id}
        </TableCell>
        <TableCell align="left">{skinfluencer.name}</TableCell>
        <TableCell align="left">{skinfluencer.title}</TableCell>
        <TableCell align="left">
          {skinfluencer.socialLinks.length + " st"}
        </TableCell>
        <TableCell align="left">
          {skinfluencer.createdAt || "unknown"}
        </TableCell>
        <TableCell align="left">
          <Button
            aria-controls="simple-menu"
            aria-haspopup="true"
            onClick={(e) => handleActionBtnClick(e, index)}
            title="Actions"
          />

          <Menu
            id="simple-menu"
            anchorEl={anchorEl}
            keepMounted
            open={Boolean(anchorEl)}
            onClose={handleClose}
          >
            <MenuItem onClick={() => handleClose(index)}>View</MenuItem>
            <MenuItem onClick={() => handleClose(index)}>
              <Link>Edit</Link>
            </MenuItem>
            <MenuItem
              onClick={() => {
                console.log("delete btn clicked");
                handleClose(index);
                setConfirmDialog({
                  isOpen: true,
                  title: "Are you sure you want to delete this Skinfluencer?",
                  subTitle: "You can't regret this action?",
                  onConfirm: () => handleDelete(skinfluencer._id),
                });
              }}
            >
              Delete
            </MenuItem>
          </Menu>
        </TableCell>
      </TableRow>
      <ConfirmDialog
        confirmDialog={confirmDialog}
        setConfirmDialog={setConfirmDialog}
      />
    </>
  );
};

export default SkinfluencerRow;
