import { Button, FormControl, TextField } from "@mui/material";
import React from "react";
import { useDispatch, useSelector } from "react-redux";

export default function EditUsers() {
  const manage = useSelector((state) => state.user.manage);
  const editUserData = useSelector((state) => state.user.editUserData);
  const [name, setName] = React.useState(
    manage === "edituser" ? editUserData.name : ""
  );
  const [email, setEmail] = React.useState(
    manage === "edituser" ? editUserData.email : ""
  );
  const [phone, setPhone] = React.useState(
    manage === "edituser" ? editUserData.phone : ""
  );
  console.log(manage);
  const handleSubmitEdit = async (e) => {
    e.preventDefault();
    const data = {
      name,
      email,
      phone,
    };
    const response = await fetch(
      `${process.env.REACT_APP_API_URL}/${editUserData._id}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      }
    );
    const res = await response.json();
    alert(res.message);
  };

  const handleSubmitAdd = async (e) => {
    e.preventDefault();
    const data = {
      name,
      email,
      phone,
    };
    const response = await fetch(process.env.REACT_APP_API_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    const res = await response.json();
    alert(res.message);
  };
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
      }}
    >
      <div>
        {manage === "adduser" ? <h1>Add User</h1> : <h1>Update User</h1>}

        <form
          onSubmit={(e) =>
            manage === "adduser" ? handleSubmitAdd(e) : handleSubmitEdit(e)
          }
        >
          <FormControl>
            <TextField
              fullWidth
              onChange={(e) => {
                setName(e.target.value);
              }}
              name="name"
              type="text"
              color="secondary"
              value={name}
              placeholder="Name"
            />
            <TextField
              onChange={(e) => {
                setEmail(e.target.value);
              }}
              fullWidth
              name="email"
              type="email"
              value={email}
              color="secondary"
              placeholder="Email"
            />
            <TextField
              onChange={(e) => {
                setPhone(e.target.value);
              }}
              fullWidth
              name="mobile"
              type="text"
              value={phone}
              color="secondary"
              placeholder="Mobile"
            />
            <Button
              sx={{
                textTransform: "none",
              }}
              type="submit"
              variant="contained"
              color="secondary"
            >
              Submit
            </Button>
          </FormControl>
        </form>
      </div>
    </div>
  );
}
