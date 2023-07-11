import React, { useEffect, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { editUser, manageUser, setUserData } from "../slices/userSlice";
import MaterialReactTable from "material-react-table";
import { Box, Button, Container, IconButton, MenuItem } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import AddIcon from "@mui/icons-material/Add";
import DeleteIcon from "@mui/icons-material/Delete";
import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye";
import { useNavigate } from "react-router-dom";

export default function Home() {
  const userData = useSelector((state) => state.user.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const fetchData = async () => {
    const response = await fetch(process.env.REACT_APP_API_URL);
    const data = await response.json();
    dispatch(setUserData(data?.users));
  };
  const columns = useMemo(
    () => [
      {
        header: "ID",
        accessorKey: "_id",
      },
      {
        header: "Name",
        accessorKey: "name",
      },
    ],
    []
  );
  const deleteData = async (id) => {
    const response = await fetch(`${process.env.REACT_APP_API_URL}/${id}`, {
      method: "DELETE",
    });
    const data = await response.json();
    console.log(data);
    fetchData();
  };

  useEffect(() => {
    fetchData();
  }, []);
  return (
    <Container>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
        }}
      >
        <h1>All Users</h1>
        <IconButton
          sx={{
            color: "red",
          }}
          onClick={() => {
            navigate("/manageUsers");
            dispatch(manageUser("adduser"));
          }}
        >
          <AddIcon /> Add User
        </IconButton>
      </Box>
      <MaterialReactTable
        columns={columns}
        data={userData}
        enableRowActions
        renderRowActions={({ row }) => (
          <Box>
            <IconButton onClick={() => console.info("Edit")}>
              <EditIcon
                onClick={() => {
                  navigate("/manageUsers");
                  dispatch(manageUser("edituser"));
                  dispatch(editUser(row?.original));
                }}
              />
            </IconButton>
            <IconButton onClick={() => deleteData(row?.original?._id)}>
              <DeleteIcon />
            </IconButton>
            <IconButton onClick={() => navigate(`viewUsers/${row?.original?._id}`)}>
              <RemoveRedEyeIcon />
            </IconButton>
          </Box>
        )}
      />
    </Container>
  );
}
