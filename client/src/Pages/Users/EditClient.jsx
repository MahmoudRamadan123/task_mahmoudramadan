import React, { useState, useEffect } from "react";
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField, CircularProgress } from "@mui/material";
import { useDispatch } from "react-redux";
import { updateUser } from "../../redux/action/user";
import { Close } from "@mui/icons-material";

const EditClient = ({ open, setOpen, client }) => {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    username: "",
    email: "",
    phone: "",
    city: "",
    CNIC: ""
  });

  useEffect(() => {
    if (client) {
      setFormData({
        firstName: client.firstName || "",
        lastName: client.lastName || "",
        username: client.username || "",
        email: client.email || "",
        phone: client.phone || "",
        city: client.city || "",
        CNIC: client.CNIC || ""
      });
    }
  }, [client]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async () => {
    setLoading(true);
    try {
      await dispatch(updateUser(client._id, formData));
      setOpen(false);
    } catch (error) {
      console.error("Error updating client:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      aria-labelledby="edit-dialog-title"
      maxWidth="md"
      fullWidth
    >
      <DialogTitle id="edit-dialog-title" className="flex justify-between items-center">
        <span>Edit Client</span>
        <Close 
          onClick={handleClose} 
          className="cursor-pointer hover:text-red-500 transition-colors"
        />
      </DialogTitle>
      <DialogContent>
        <div className="grid grid-cols-2 gap-4 mt-4">
          <TextField
            autoFocus
            margin="dense"
            name="firstName"
            label="First Name"
            type="text"
            fullWidth
            variant="outlined"
            value={formData.firstName}
            onChange={handleChange}
            required
          />
          <TextField
            margin="dense"
            name="lastName"
            label="Last Name"
            type="text"
            fullWidth
            variant="outlined"
            value={formData.lastName}
            onChange={handleChange}
            required
          />
          <TextField
            margin="dense"
            name="username"
            label="Username"
            type="text"
            fullWidth
            variant="outlined"
            value={formData.username}
            onChange={handleChange}
            required
          />
          <TextField
            margin="dense"
            name="email"
            label="Email Address"
            type="email"
            fullWidth
            variant="outlined"
            value={formData.email}
            onChange={handleChange}
            required
          />
          <TextField
            margin="dense"
            name="phone"
            label="Phone Number"
            type="tel"
            fullWidth
            variant="outlined"
            value={formData.phone}
            onChange={handleChange}
            required
          />
          <TextField
            margin="dense"
            name="city"
            label="City"
            type="text"
            fullWidth
            variant="outlined"
            value={formData.city}
            onChange={handleChange}
          />
          <TextField
            margin="dense"
            name="CNIC"
            label="CNIC"
            type="text"
            fullWidth
            variant="outlined"
            value={formData.CNIC}
            onChange={handleChange}
          />
        </div>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} color="secondary">
          Cancel
        </Button>
        <Button 
          onClick={handleSubmit} 
          color="primary" 
          variant="contained"
          disabled={loading}
        >
          {loading ? <CircularProgress size={24} /> : "Update Client"}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default EditClient;