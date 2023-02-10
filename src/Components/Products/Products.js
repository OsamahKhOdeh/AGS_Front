import React from "react";
import { Grid, CircularProgress } from "@material-ui/core";
import Product from "./Product/Product";
import useStyles from "./styles";
import { products } from "../../data";

const Products = () => {
  const allProducts = products;
  const isLoading = false;
  const classes = useStyles();
  console.log(products.length);
  return isLoading ? (
    <CircularProgress />
  ) : (
    <Grid container className={classes.mainContainer} alignItems="stretch" spacing={3}>
      {allProducts?.map((product) => (
        <Grid item key={product._id} xs={12} sm={12} md={6} lg={3}>
          <Product product={product} />
        </Grid>
      ))}
    </Grid>
  );
};

export default Products;
