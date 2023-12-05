import TextField from "@mui/material/TextField";
import DialogContent from "@mui/material/DialogContent";

function CustomerDialog({ customer, handleChange }) {
  return (
    <DialogContent>
      <TextField
        margin="dense"
        label="Firstname"
        name="firstname"
        fullWidth
        variant="standard"
        value={customer.firstname}
        onChange={handleChange}
      />
      <TextField
        margin="dense"
        label="Lastname"
        name="lastname"
        fullWidth
        variant="standard"
        value={customer.lastname}
        onChange={handleChange}
      />
      <TextField
        margin="dense"
        label="Email"
        name="email"
        fullWidth
        variant="standard"
        value={customer.email}
        onChange={handleChange}
      />
      <TextField
        margin="dense"
        label="Phone"
        name="phone"
        fullWidth
        variant="standard"
        value={customer.phone}
        onChange={handleChange}
      />
      <TextField
        margin="dense"
        label="Street address"
        name="streetaddress"
        fullWidth
        variant="standard"
        value={customer.streetaddress}
        onChange={handleChange}
      />
      <TextField
        margin="dense"
        label="Postcode"
        name="postcode"
        fullWidth
        variant="standard"
        value={customer.postcode}
        onChange={handleChange}
      />
      <TextField
        margin="dense"
        label="City"
        name="city"
        fullWidth
        variant="standard"
        value={customer.city}
        onChange={handleChange}
      />
    </DialogContent>
  );
}

export default CustomerDialog;
