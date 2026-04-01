import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createEmployee } from "../../redux/action/user";
import Topbar from "./Topbar";
import {
  Divider,
  Dialog,
  DialogContent,
  DialogTitle,
  Slide,
  DialogActions,
  TextField,
} from "@mui/material";
import { PiNotepad, PiXLight } from "react-icons/pi";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="down" ref={ref} {...props} />;
});

const CreateUser = ({ open, setOpen, scroll }) => {
  //////////////////////////////////////// VARIABLES /////////////////////////////////////
  const { isFetching } = useSelector((state) => state.user);
  const dispatch = useDispatch();

  const initialEmployeeState = {
    firstName: "",
    lastName: "",
    username: "",
    password: "",
    phone: "",
    email: "",
  };

  //////////////////////////////////////// STATES /////////////////////////////////////
  const [employeeData, setEmployeeData] = useState(initialEmployeeState);
  const [errors, setErrors] = useState({});

  //////////////////////////////////////// VALIDATION /////////////////////////////////////
  const validate = () => {
    let tempErrors = {};

    if (!employeeData.firstName.trim())
      tempErrors.firstName = "First name is required";

    if (!employeeData.lastName.trim())
      tempErrors.lastName = "Last name is required";

    if (!employeeData.username.trim())
      tempErrors.username = "Username is required";

    if (!employeeData.password.trim())
      tempErrors.password = "Password is required";

    if (!employeeData.phone.trim())
      tempErrors.phone = "Phone is required";

    setErrors(tempErrors);
    return Object.keys(tempErrors).length === 0;
  };

  //////////////////////////////////////// FUNCTIONS /////////////////////////////////////
  const handleSubmit = (e) => {
    e.preventDefault();

    if (!validate()) return;

    dispatch(createEmployee(employeeData, setOpen));
    setEmployeeData(initialEmployeeState);
    setErrors({});
  };

  const handleChange = (field, value) => {
    setEmployeeData((prev) => ({
      ...prev,
      [field]: value,
    }));

    // clear error when user types
    if (errors[field]) {
      setErrors((prev) => ({
        ...prev,
        [field]: "",
      }));
    }
  };

  const handleClose = () => {
    setOpen(false);
    setEmployeeData(initialEmployeeState);
    setErrors({});
  };

  //////////////////////////////////////// UI /////////////////////////////////////
  return (
    <Dialog
      scroll={scroll}
      open={open}
      TransitionComponent={Transition}
      keepMounted
      onClose={handleClose}
      fullWidth="sm"
      maxWidth="sm"
    >
      <DialogTitle className="flex items-center justify-between">
        <div className="text-sky-400 font-primary">Add New Employee</div>
        <div className="cursor-pointer" onClick={handleClose}>
          <PiXLight className="text-[25px]" />
        </div>
      </DialogTitle>

      <DialogContent>
        <div className="flex flex-col gap-2 p-3 text-gray-500 font-primary">
          <div className="text-xl flex items-center gap-2">
            <PiNotepad size={23} />
            <span>Employee Details</span>
          </div>

          <Divider />

          <table className="mt-4 w-full">
            <tbody>
              <tr>
                <td className="pb-4 text-lg">First Name</td>
                <td className="pb-4">
                  <TextField
                    size="small"
                    fullWidth
                    value={employeeData.firstName}
                    onChange={(e) =>
                      handleChange("firstName", e.target.value)
                    }
                    error={!!errors.firstName}
                    helperText={errors.firstName}
                  />
                </td>
              </tr>

              <tr>
                <td className="pb-4 text-lg">Last Name</td>
                <td className="pb-4">
                  <TextField
                    size="small"
                    fullWidth
                    value={employeeData.lastName}
                    onChange={(e) =>
                      handleChange("lastName", e.target.value)
                    }
                    error={!!errors.lastName}
                    helperText={errors.lastName}
                  />
                </td>
              </tr>

              <tr>
                <td className="pb-4 text-lg">User Name</td>
                <td className="pb-4">
                  <TextField
                    size="small"
                    fullWidth
                    value={employeeData.username}
                    onChange={(e) =>
                      handleChange("username", e.target.value)
                    }
                    error={!!errors.username}
                    helperText={errors.username}
                  />
                </td>
              </tr>

              <tr>
                <td className="pb-4 text-lg">Email</td>
                <td className="pb-4">
                  <TextField
                    size="small"
                    fullWidth
                    placeholder="Optional"
                    value={employeeData.email}
                    onChange={(e) =>
                      handleChange("email", e.target.value)
                    }
                  />
                </td>
              </tr>

              <tr>
                <td className="pt-2 text-lg">Password</td>
                <td className="pb-4">
                  <TextField
                    type="password"
                    size="small"
                    fullWidth
                    value={employeeData.password}
                    onChange={(e) =>
                      handleChange("password", e.target.value)
                    }
                    error={!!errors.password}
                    helperText={errors.password}
                  />
                </td>
              </tr>

              <tr>
                <td className="pt-2 text-lg">Phone</td>
                <td className="pb-4">
                  <TextField
                    type="number"
                    size="small"
                    fullWidth
                    value={employeeData.phone}
                    onChange={(e) =>
                      handleChange("phone", e.target.value)
                    }
                    error={!!errors.phone}
                    helperText={errors.phone}
                  />
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </DialogContent>

      <DialogActions>
        <button
          onClick={handleClose}
          type="button"
          className="bg-[#d7d7d7] px-4 py-2 rounded-lg text-gray-500 mt-4 hover:text-white hover:bg-[#6c757d] border-[2px] border-[#efeeee] hover:border-[#d7d7d7] font-thin transition-all"
        >
          Cancel
        </button>

        <button
          onClick={handleSubmit}
          type="button"
          className="bg-primary-red px-4 py-2 rounded-lg text-white mt-4 hover:bg-red-400 font-thin"
          disabled={isFetching}
        >
          {isFetching ? "Submitting..." : "Submit"}
        </button>
      </DialogActions>
    </Dialog>
  );
};

export default CreateUser;