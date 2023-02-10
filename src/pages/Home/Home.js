import React, { useState } from "react";
import { Container, Grow, Grid, AppBar, TextField, Button, Paper } from "@material-ui/core";
import useStyles from "./styles";
import Products from "../../Components/Products/Products";

const Home = () => {
  const classes = useStyles();

  return (
    <Grow in>
      <Container maxWidth="xl">
        <Grid container justifyContent="space-between" alignItems="stretch" spacing={3} className={classes.gridContainer}>
          <Grid item xs={12} sm={12} md={12}>
            <Products />
          </Grid>
        </Grid>
      </Container>
    </Grow>
  );
};

export default Home;
