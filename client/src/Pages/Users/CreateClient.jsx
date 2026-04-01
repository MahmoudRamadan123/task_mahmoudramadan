import React, { useState } from "react";
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField, CircularProgress } from "@mui/material";
import { useDispatch } from "react-redux";
import { createClient } from "../../redux/action/user";
import { Close } from "@mui/icons-material";

const CreateClient = ({ open, scroll, setOpen }) => {
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

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async () => {
    setLoading(true);
    try {
      await dispatch(createClient(formData));
      setOpen(false);
      setFormData({
        firstName: "",
        lastName: "",
        username: "",
        email: "",
        phone: "",
        city: "",
        CNIC: ""
      });
    } catch (error) {
      console.error("Error creating client:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleClose = () => {
    setOpen(false);
    setFormData({
      firstName: "",
      lastName: "",
      username: "",
      email: "",
      phone: "",
      city: "",
      CNIC: ""
    });
  };

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      scroll={scroll}
      aria-labelledby="scroll-dialog-title"
      aria-describedby="scroll-dialog-description"
      maxWidth="md"
      fullWidth
    >
      <DialogTitle id="scroll-dialog-title" className="flex justify-between items-center">
        <span>Create New Client</span>
        <Close 
          onClick={handleClose} 
          className="cursor-pointer hover:text-red-500 transition-colors"
        />
      </DialogTitle>
      <DialogContent dividers={scroll === "paper"}>
        <div className="grid grid-cols-2 gap-4">
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
          {loading ? <CircularProgress size={24} /> : "Create Client"}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default CreateClient;