import React, { useEffect, useState } from "react";
import {
  Grid,
  CircularProgress,
  Container,
  Typography,
} from "@material-ui/core";
import { AiTwotoneDelete } from "react-icons/ai";
import Product from "./Product/Product";
import useStyles from "./styles";
import { staticProducts } from "../../../data";
import { useDispatch, useSelector } from "react-redux";
import {
  addProducttocart,
  deletProductformCart,
  deleteAll,
} from "../../../store/cartSlice";
import { useNavigate } from "react-router-dom";
const Products = ({ filters }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const products = useSelector((state) => state.products.products);

  const allProducts = staticProducts;
  const isLoading = useSelector((state) => state.show.isLoading);
  const cart = useSelector((state) => state.cart.cart);

  const spliceCart = (item) => {
    dispatch(deletProductformCart(item));
  };

  const deleteALl = () => {
    dispatch(deleteAll());
  };
  const classes = useStyles();
  let productsCount = products.length;
  return isLoading ? (
    <Container
      alignitems='center'
      style={{ alignItems: "center", width: "100%" }}>
      <CircularProgress
        style={{ alignSelf: "auto", marginLeft: "50%", marginTop: "10%" }}
      />
    </Container>
  ) : (
    <>
      <Typography className={classes.products_count}>
        {products.length < 1 && !isLoading
          ? "No products Found"
          : `There are  ${productsCount} products found`}
      </Typography>

      <Grid
        container
        className={classes.mainContainer}
        alignitems='stretch'
        spacing={3}>
        {products ? (
          products?.map((product) => (
            <Grid item key={product._id} xs={12} sm={12} md={6} lg={3}>
              <Product product={product} />
            </Grid>
          ))
        ) : (
          <h1>Loading</h1>
        )}
      </Grid>

      <div className='sidebar'>
        <span>List of Items </span>
        <ul className='list__ofItems'>
          {cart.map((item, index) => (
            <div className='card__item'>
              <div>{item.code}</div>
              <div
                style={{ cursor: "pointer" }}
                onClick={() => {
                  spliceCart(index);
                }}>
                <AiTwotoneDelete color='#E34A44' size={18} />
              </div>
            </div>
          ))}
        </ul>

        <div className='sidebar__buttons'>
          <div
            className='next'
            onClick={() => {
              navigate("/checkCustomer");
            }}>
            <span> Next </span>
          </div>
          <div className='delete' onClick={() => deleteALl()}>
            <span> Delete all </span>
          </div>
        </div>
      </div>
    </>
  );
};

export default Products;
