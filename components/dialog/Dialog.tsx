import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { useIntl } from "react-intl";

import { AlertDialogType } from "shared/models";

export default function AlertDialog({
  openDialog = false,
  dialogTitle = "Title",
  dialogContent = "Content",
  handleClose,
  handleSubmit,
}: AlertDialogType) {
  const { formatMessage } = useIntl();
  const f = (id: string) => formatMessage({ id });
  return (
    <div>
      <Dialog
        open={openDialog}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{dialogTitle}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            {dialogContent}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>{f("dialogCancel")}</Button>
          <Button onClick={handleSubmit} autoFocus>
            {f("dialogAgree")}
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
