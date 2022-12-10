import { useState } from "react";
import LoadingButton from "@mui/lab/LoadingButton";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";

interface IConfirmDialogProps {
  isOpen: boolean;
  title: string;
  text: string;
  handleCloseDialog: () => void;
  handleConfirm: () => void;
}

export function ConfirmationDialog({
  isOpen,
  title,
  text,
  handleCloseDialog,
  handleConfirm,
}: IConfirmDialogProps) {
  const [isLoading, setIsLoading] = useState(false);

  return (
    <Dialog open={isOpen} onClose={handleCloseDialog}>
      <DialogTitle>{title}</DialogTitle>
      <DialogContent>
        <DialogContentText>{text}</DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleCloseDialog} autoFocus>
          No
        </Button>
        <LoadingButton
          loading={isLoading}
          color="error"
          onClick={async () => {
            setIsLoading(true);
            await handleConfirm();
            setIsLoading(false);
            handleCloseDialog();
          }}
        >
          Yes
        </LoadingButton>
      </DialogActions>
    </Dialog>
  );
}
