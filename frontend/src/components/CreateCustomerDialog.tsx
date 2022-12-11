import { useState, Dispatch, SetStateAction } from "react";
import { useRouter } from "next/router";
import { AxiosError } from "axios";
import Button from "@mui/material/Button";
import LoadingButton from "@mui/lab/LoadingButton";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import TextField from "@mui/material/TextField";

import { validateEmail } from "../utils/validateEmail";
import { api } from "../services/api";

interface ICreateCustomerDialogProps {
  isOpen: boolean;
  handleClose: () => void;
  setSnackbarOptions: Dispatch<SetStateAction<ISnackbarInfos>>;
}

export function CreateCustomerDialog({
  handleClose,
  isOpen,
  setSnackbarOptions,
}: ICreateCustomerDialogProps) {
  const router = useRouter();

  const [isLoading, setIsLoading] = useState(false);

  const [firstNameValue, setFirstNameValue] = useState("");
  const [lastNameValue, setLastNameValue] = useState("");
  const [emailValue, setEmailValue] = useState("");
  const [passwordValue, setPasswordValue] = useState("");

  const [firstNameError, setFirstNameError] = useState("");
  const [lastNameError, setLastNameError] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");

  async function handleCreateUser() {
    setFirstNameError("");
    setLastNameError("");
    setEmailError("");
    setPasswordError("");

    if (firstNameValue.trim().length === 0) {
      setFirstNameError("First name is required");
      return;
    }

    if (lastNameValue.trim().length === 0) {
      setLastNameError("Last name is required");
      return;
    }

    if (!validateEmail(emailValue)) {
      setEmailError("Email is invalid");
      return;
    }

    if (passwordValue.trim().length === 0) {
      setPasswordError("Password is required");
      return;
    }

    setIsLoading(true);

    try {
      await api.post("/customers", {
        firstName: firstNameValue.trim(),
        lastName: lastNameValue.trim(),
        email: emailValue.trim(),
        password: passwordValue.trim(),
      });

      setIsLoading(false);

      router.reload();
    } catch (err) {
      setIsLoading(false);

      setSnackbarOptions({
        isOpen: true,
        message: "Error to create new customer",
        duration: 3000,
        severity: "error",
      });

      if (err instanceof AxiosError) {
        if (err.response!.status === 409)
          setEmailError("Email already registered before");
        setSnackbarOptions({
          isOpen: true,
          message: "Email already registered before",
          duration: 3000,
          severity: "error",
        });
      }
    }
  }

  return (
    <Dialog open={isOpen} onClose={handleClose}>
      <DialogTitle>Create customer</DialogTitle>
      <DialogContent>
        <TextField
          autoFocus
          error={firstNameError.length != 0}
          helperText={firstNameError}
          margin="normal"
          label="First Name"
          fullWidth
          variant="filled"
          value={firstNameValue}
          onChange={(e) => setFirstNameValue(e.target.value)}
        />
        <TextField
          error={lastNameError.length != 0}
          helperText={lastNameError}
          margin="normal"
          label="Last Name"
          fullWidth
          variant="filled"
          value={lastNameValue}
          onChange={(e) => setLastNameValue(e.target.value)}
        />
        <TextField
          error={emailError.length != 0}
          helperText={emailError}
          margin="normal"
          label="Email Address"
          type="email"
          fullWidth
          variant="filled"
          value={emailValue}
          onChange={(e) => setEmailValue(e.target.value)}
        />
        <TextField
          error={passwordError.length != 0}
          helperText={passwordError}
          margin="normal"
          label="Password"
          type="password"
          fullWidth
          variant="filled"
          value={passwordValue}
          onChange={(e) => setPasswordValue(e.target.value)}
        />
      </DialogContent>
      <DialogActions>
        <Button color="inherit" onClick={handleClose}>
          Cancel
        </Button>
        <LoadingButton loading={isLoading} onClick={handleCreateUser}>
          Create
        </LoadingButton>
      </DialogActions>
    </Dialog>
  );
}
