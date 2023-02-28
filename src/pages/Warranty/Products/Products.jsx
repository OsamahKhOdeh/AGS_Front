import React, { useEffect, useState } from "react";
import {
  Grid,
  CircularProgress,
  Container,
  Typography,
} from "@material-ui/core";
import { AiFillCloseCircle, AiTwotoneDelete } from "react-icons/ai";
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
import { FaCarBattery } from "react-icons/fa";
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

  // const navigate = () => {
  //   navigate("/table");
  // };

  const cartLength = useSelector((state) => state.cart.cart);

  const closeside = () => {
    document.querySelector(".sidebar").style.display = "none";
    document.querySelector(".modal").style.display = "none";
  };

  const showList = () => {
    document.querySelector(".sidebar").style.display = "block";
    document.querySelector(".modal").style.display = "block";
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
      <p className='total__product'>
        {products.length < 1 && !isLoading
          ? "No products Found"
          : `There are  ${productsCount} products found`}
      </p>

      <Grid
        container
        className={classes.mainContainer}
        alignitems='stretch'
        spacing={3}>
        {products ? (
          products?.map((product, index) => (
            <Grid item key={product._id} xs={12} sm={12} md={6} lg={3}>
              <Product product={product} index={index} />
            </Grid>
          ))
        ) : (
          <h1>Loading</h1>
        )}
      </Grid>

      <div className='battery__bottom' onClick={showList}>
        <div className='bottom'>
          <img src='/images/battery.png' width={80} height={80} />
          <div className='battery__coutn'>{cart.length}</div>
        </div>
      </div>

      {cartLength.length > 0 ? (
        <div className='modal'>
          <div class='sidebar'>
            <div className='list__'>
              <span>List of Items : {cart.length} </span>
              <div className='close__' onClick={() => closeside()}>
                <AiFillCloseCircle color='' size={40} />
              </div>
            </div>
            <ul className='list__ofItems'>
              {cart.map((item, index) => (
                <div className='card__item' key={index}>
                  <div>{item.code}</div>
                  <div
                    style={{ cursor: "pointer" }}
                    onClick={() => {
                      spliceCart(item);
                    }}>
                    <AiTwotoneDelete color='#E34A44' size={20} />
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
        </div>
      ) : null}
    </>
  );
};

export default Products;
