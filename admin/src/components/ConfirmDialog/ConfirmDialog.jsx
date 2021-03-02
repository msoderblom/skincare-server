import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Typography,
} from "@material-ui/core";
import React from "react";
import Button from "../Button";
// import * as S from "./styled";

const ConfirmDialog = ({ confirmDialog, setConfirmDialog }) => {
  return (
    <Dialog open={confirmDialog.isOpen}>
      <DialogTitle>{confirmDialog.title}</DialogTitle>
      <DialogContent>
        {confirmDialog.subTitle && (
          <Typography variant="subtitle2">{confirmDialog.subTitle}</Typography>
        )}
      </DialogContent>
      <DialogActions>
        <Button
          title="No"
          onClick={() =>
            setConfirmDialog((prev) => ({ ...prev, isOpen: false }))
          }
        />
        <Button
          title="Yes"
          onClick={() => {
            confirmDialog.onConfirm();
            setConfirmDialog((prev) => ({ ...prev, isOpen: false }));
          }}
        />
      </DialogActions>
    </Dialog>
  );
};

export default ConfirmDialog;
