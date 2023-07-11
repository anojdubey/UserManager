import { Card, Container, Typography } from "@mui/material";
import React, { useEffect, useMemo } from "react";
import { useParams } from "react-router-dom";
import AccountBoxIcon from "@mui/icons-material/AccountBox";
import { MaterialReactTable } from "material-react-table";

export default function ViewPage() {
  const { id } = useParams();
  const [userData, setUserData] = React.useState({});
  const getUserData = async () => {
    const response = await fetch(`${process.env.REACT_APP_API_URL}/${id}`)
    const data = await response.json();
    setUserData(data?.user);
  };
  useEffect(() => {
    getUserData();
  }, []);
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
      {
        header: "Email",
        accessorKey: "email",
      },
      {
        header: "Phone",
        accessorKey: "phone",
      },
    ],
    []
  );
  return (
    <Container
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Card
        sx={{
          p: "2rem",
          m: "2rem",
        }}
      >
        <Typography sx={{
            display: "flex",
            alignItems: "center",
        }} variant="h4" component="div" gutterBottom>
          <AccountBoxIcon fontSize="large" sx={{ mr: "1rem" }} /> User Details
        </Typography>
        <MaterialReactTable
          columns={columns}
          data={[userData]}
          enableColumnFilters={false}
          enableFilterMatchHighlighting={false}
          enablePagination={false}
          enableGlobalFilter={false}
        />
      </Card>
    </Container>
  );
}
