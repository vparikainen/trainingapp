import { useState } from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogActions from "@mui/material/DialogActions";
import CustomerDialog from "./CustomerDialog";
import EditIcon from "@mui/icons-material/Edit";
import Tooltip from "@mui/material/Tooltip";

export default function EditCustomer({ fetchCustomers, data, customerId }) {
  const [customer, setCustomer] = useState({
    firstname: "",
    lastname: "",
    streetaddress: "",
    postcode: "",
    city: "",
    email: "",
    phone: "",
  });

  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
    setCustomer({
      firstname: data.firstname,
      lastname: data.lastname,
      streetaddress: data.streetaddress,
      postcode: data.postcode,
      city: data.city,
      email: data.email,
      phone: data.phone,
    });
  };

  const handleClose = () => {
    setOpen(false);
  };

  const saveCustomer = () => {
    fetch(import.meta.env.VITE_API_URL + `/api/customers/${customerId}`, {
      method: "PUT",
      headers: { "content-type": "application/json" },
      body: JSON.stringify(customer),
    })
      .then((response) => {
        if (!response.ok)
          throw new Error(
            "Error when editing customer: " + response.statusText
          );

        fetchCustomers();
      })
      .catch((err) => console.error(err));

    handleClose();
  };

  const handleChange = (e) => {
    setCustomer({ ...customer, [e.target.name]: e.target.value });
  };

  return (
    <div>
      <Tooltip title="Edit">
        <Button
          size="small"
          onClick={handleClickOpen}
          startIcon={<EditIcon />}
        ></Button>
      </Tooltip>

      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Edit Customer</DialogTitle>
        <CustomerDialog customer={customer} handleChange={handleChange} />
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={saveCustomer}>Save</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
