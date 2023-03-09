import React, { useState } from "react";
import { Container, Grow, Grid, AppBar, TextField, Button, Paper } from "@material-ui/core";
import useStyles from "./styles";
import Products from "../../Components/Products/Products";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const classes = useStyles();
  const navigate = useNavigate();

  return (
    <Grow in>
      <Container style={{ display: "flex", flexDirection: "column", alignItems: "center" }} maxWidth="xl">
        <Button style={{ width: "25%", padding: "25px" }} variant="contained" onClick={() => navigate("/pdf")}>
          Price List
        </Button>
        <Button style={{ width: "25%", padding: "25px" }} variant="outlined" onClick={() => navigate("/makepi")}>
          Make PI
        </Button>{" "}
        <Button style={{ width: "25%", padding: "25px" }} variant="outlined" onClick={() => navigate("/admin")}>
          Admin
        </Button>
        <Button style={{ width: "25%", padding: "25px" }} variant="contained">
          Make PKL
        </Button>
        <Button style={{ width: "25%", padding: "25px", backgroundColor: "burlywood" }} variant="contained" onClick={() => navigate("/warranty")}>
          Warranty{" "}
        </Button>
        <Button style={{ width: "25%", padding: "25px" }} variant="outlined">
          Show PIs
        </Button>
        <Button style={{ width: "25%", padding: "25px" }} variant="contained">
          Show PKLs
        </Button>
        <Button style={{ width: "25%", padding: "25px" }} variant="outlined">
          Edit Price
        </Button>
        <Button style={{ width: "25%", padding: "25px" }} variant="contained">
          Promo Codes{" "}
        </Button>
        <Button style={{ width: "25%", padding: "25px" }} variant="outlined" onClick={() => navigate("/addproduct")}>
          Add Products
        </Button>
        <Button style={{ width: "25%", padding: "25px" }} variant="contained">
          Edit Product Card
        </Button>
        <Button style={{ width: "25%", padding: "25px" }} variant="outlined">
          Add Stock
        </Button>
      </Container>
    </Grow>
  );
};

export default Home;
