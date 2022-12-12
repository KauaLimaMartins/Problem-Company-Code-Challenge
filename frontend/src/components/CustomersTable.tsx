import { DataGrid, GridRowId, GridColDef } from "@mui/x-data-grid";
import { Dispatch, SetStateAction, useContext, useState } from "react";
import IconButton from "@mui/material/IconButton";
import Box from "@mui/material/Box";
import Delete from "@mui/icons-material/Delete";
import Add from "@mui/icons-material/Add";
import DeleteOutlined from "@mui/icons-material/DeleteOutlined";
import EditOutlined from "@mui/icons-material/EditOutlined";
import Snackbar from "@mui/material/Snackbar/Snackbar";
import Alert from "@mui/material/Alert/Alert";

import { api } from "../services/api";
import { ConfirmationDialog } from "./ConfirmationDialog";
import { CreateCustomerDialog } from "./CreateCustomerDialog";
import { EdtCustomerDialog } from "./EditCustomerDialog";
import { CustomersContext } from "../context/CustomersContext";

export function CustomersTable() {
  const { customersList, setCustomersList } = useContext(CustomersContext);

  const [isOpenConfirmationDialog, setIsOpenConfirmationDialog] =
    useState(false);
  const [isOpenCreateDialog, setIsOpenCreateDialog] = useState(false);
  const [isOpenEditDialog, setIsOpenEditDialog] = useState(false);

  const [editCustomerId, setEditCustomerId] = useState<GridRowId>(0);

  const [snackbarOptions, setSnackbarOptions] = useState<ISnackbarInfos>({
    isOpen: false,
    message: "",
    severity: "error",
    duration: 3000,
  });

  const [confirmationDialogText, setConfirmationDialogText] = useState("");
  const [confirmationDialogTitle, setConfirmationDialogTitle] = useState("");

  const [selectedIds, setSelectedIds] = useState<GridRowId[]>([]);

  async function handleDeleteSelected() {
    try {
      await api.delete("/customers", {
        data: {
          CustomersIds: selectedIds,
        },
      });

      const selectedIDs = new Set(selectedIds);

      setCustomersList((customersList) =>
        customersList.filter((customer) => !selectedIDs.has(customer.ID))
      );

      setSelectedIds([]);
    } catch (err) {
      setSnackbarOptions({
        isOpen: true,
        message: "Error to delete customers, try again",
        severity: "error",
        duration: 3000,
      });
    }
  }

  const columns: GridColDef[] = [
    { field: "ID", headerName: "ID", width: 15 },
    { field: "FirstName", headerName: "First name", flex: 1 },
    { field: "LastName", headerName: "Last name", flex: 1 },
    { field: "Email", headerName: "Email", flex: 1 },
    { field: "CreatedAt", headerName: "Created", flex: 1 },
    { field: "UpdatedAt", headerName: "Last update", flex: 1 },
    {
      field: "actions",
      headerName: "Actions",
      width: 100,
      sortable: false,
      disableColumnMenu: true,
      renderCell: (params) => {
        return (
          <>
            <IconButton
              onClick={(e) => {
                // It is used to not select the row if click in an action
                e.stopPropagation();

                setConfirmationDialogTitle(`Delete ${params.row.FirstName}?`);
                setConfirmationDialogText(
                  `Are you sure you want to delete ${params.row.FirstName} ${params.row.LastName} customer?`
                );
                setSelectedIds([params.id]);
                setIsOpenConfirmationDialog(true);
              }}
            >
              <DeleteOutlined />
            </IconButton>
            <IconButton
              onClick={(e) => {
                // It is used to not select the row if click in an action
                e.stopPropagation();

                setEditCustomerId(params.id);
                setIsOpenEditDialog(true);
              }}
            >
              <EditOutlined />
            </IconButton>
          </>
        );
      },
    },
    {
      field: "delete",
      width: 65,
      align: "center",
      sortable: false,
      disableColumnMenu: true,
      renderHeader: () => {
        return (
          <IconButton
            color="error"
            disabled={selectedIds.length === 0}
            onClick={() => {
              setConfirmationDialogTitle(
                `Delete ${selectedIds.length} ${
                  selectedIds.length > 1 ? "customers" : "customer"
                }?`
              );
              setConfirmationDialogText(
                `Are you sure you want to delete ${selectedIds.length} ${
                  selectedIds.length > 1 ? "customers" : "customer"
                }?`
              );
              setIsOpenConfirmationDialog(true);
            }}
          >
            <Delete />
          </IconButton>
        );
      },
    },
    {
      field: "create",
      width: 65,
      align: "center",
      sortable: false,
      disableColumnMenu: true,
      renderHeader: () => {
        return (
          <IconButton
            color="success"
            onClick={() => setIsOpenCreateDialog(true)}
          >
            <Add />
          </IconButton>
        );
      },
    },
  ];

  return (
    <>
      <Box width="95%">
        <DataGrid
          getRowId={(customer) => customer.ID}
          rows={customersList}
          columns={columns}
          autoHeight
          pageSize={10}
          rowsPerPageOptions={[10]}
          checkboxSelection
          onSelectionModelChange={(ids) => setSelectedIds([...ids])}
          style={{
            backgroundColor: "#FFF",
          }}
        />
        <ConfirmationDialog
          title={confirmationDialogTitle}
          text={confirmationDialogText}
          isOpen={isOpenConfirmationDialog}
          handleCloseDialog={() => setIsOpenConfirmationDialog(false)}
          handleConfirm={handleDeleteSelected}
        />
      </Box>

      <CreateCustomerDialog
        isOpen={isOpenCreateDialog}
        handleClose={() => setIsOpenCreateDialog(false)}
        setSnackbarOptions={setSnackbarOptions}
      />

      <EdtCustomerDialog
        customerId={editCustomerId}
        isOpen={isOpenEditDialog}
        handleClose={() => setIsOpenEditDialog(false)}
        setSnackbarOptions={setSnackbarOptions}
      />

      <Snackbar
        open={snackbarOptions.isOpen}
        autoHideDuration={snackbarOptions.duration}
        onClose={() =>
          setSnackbarOptions({
            ...snackbarOptions,
            isOpen: false,
          })
        }
      >
        <Alert
          onClose={() =>
            setSnackbarOptions({
              ...snackbarOptions,
              isOpen: false,
            })
          }
          severity={snackbarOptions.severity}
          sx={{ width: "100%" }}
        >
          {snackbarOptions.message}
        </Alert>
      </Snackbar>
    </>
  );
}
