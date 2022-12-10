interface ICustomer {
  ID: number;
  FirstName: string;
  LastName: string;
  Email: string;
  CreatedAt: string;
  UpdatedAt: string;
  DeletedAt: string;
}

interface ISnackbarInfos {
  isOpen: boolean;
  message: string;
  duration: number;
  severity: "error" | "warning" | "info" | "success";
}
