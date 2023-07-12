import { Box, Button, FormControl, TextField } from "@mui/material";
import React, { useState } from "react";
import {useSelector } from "react-redux";

export default function EditUsers() {
  const manage = useSelector((state) => state.user.manage);
  const editUserData = useSelector((state) => state.user.editUserData);
  const [name, setName] = useState(
    manage === "edituser" ? editUserData.name : ""
  );
  const [email, setEmail] = useState(
    manage === "edituser" ? editUserData.email : ""
  );
  const [phone, setPhone] = useState(
    manage === "edituser" ? editUserData.phone : ""
  );
  const [pic, setPic] = useState(manage === "edituser" ? editUserData.pic : null);
  const [previewURL, setPreviewURL] = useState(null);
  const base64String = editUserData?.pic?.data
  ? encodeUint8ArrayToBase64(editUserData.pic.data)
  : '';

// Helper function to encode Uint8Array to base64 in chunks
function encodeUint8ArrayToBase64(uint8Array) {
  const CHUNK_SIZE = 8192; // Define the chunk size as per your requirement
  let base64String = '';
  let offset = 0;

  while (offset < uint8Array.length) {
    const chunk = Array.from(uint8Array.slice(offset, offset + CHUNK_SIZE));
    base64String += String.fromCharCode(...chunk);
    offset += CHUNK_SIZE;
  }

  return btoa(base64String);
}

  const handleSubmitEdit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("name", name);
    formData.append("email", email);
    formData.append("phone", phone);
    formData.append("pic", pic);
    const response = await fetch(
      `${process.env.REACT_APP_API_URL}/${editUserData._id}`,
      {
        method: "PUT",
        body: formData,
      }
    );
    const res = await response.json();
    alert(res.message);
  };

  const handleSubmitAdd = async (e) => {
    e.preventDefault();
    const formData = new FormData(); // Create a FormData object
    formData.append("name", name);
    formData.append("email", email);
    formData.append("phone", phone);
    formData.append("pic", pic);

    const response = await fetch(process.env.REACT_APP_API_URL, {
      method: "POST",
      body: formData,
    });
    const res = await response.json();
    alert(res.message);
  };

  const handleFileRead = (event) => {
    const file = event.target.files[0];
    setPic(file);
    console.log(file);

    const reader = new FileReader();
    reader.onload = () => {
      setPreviewURL(reader.result);
    };
    reader.readAsDataURL(file);
    console.log(previewURL);
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
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                padding: 2,
                gap: 2,
                marginTop: 2,
              }}
            >
              {manage === "edituser" && !previewURL && (
                <img
                  style={{ height: 80, width: 80, borderRadius: "50%" }}
                  src={`data:image/jpeg;base64,${base64String}`}
                  alt="Preview"
                />
              )}
              {previewURL && (
                <img
                  style={{ height: 80, width: 80, borderRadius: "50%" }}
                  src={previewURL}
                  alt="Preview"
                />
              )}
              <TextField
                id="originalFileName"
                type="file"
                inputProps={{
                  accept:
                    "image/*, .xlsx, .xls, .csv, .pdf, .pptx, .pptm, .ppt",
                }}
                required = {manage === "adduser" ? true : false}
                label="Document"
                name="originalFileName"
                onChange={handleFileRead}
                size="small"
                variant="standard"
              />
            </Box>
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
