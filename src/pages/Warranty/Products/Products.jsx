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
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { setIsLoading } from "../../../store/showingSlice";
import {
  addProducttocart,
  deletProductformCart,
  deleteAll,
} from "../../../store/cartSlice";
import { useNavigate } from "react-router-dom";
const Products = ({ filters }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  let isFilters = Object.keys(filters).length;
  let isCapacities = filters?.capacities?.length > 0;
  const notUniqeFathers = filters?.capacities?.map((cap) => {
    return cap.father;
  });
  let fathers = [...new Set(notUniqeFathers)];
  //console.log(fathers);

  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  useEffect(() => {
    const getProducts = async () => {
      let isFilters = Object.keys(filters).length;
      try {
        dispatch(setIsLoading(true));
        const res = await axios.get(
          isFilters !== 0
            ? `http://ags-server.onrender.com/products/search?categories=${
                filters.categories || ""
              }&countries=${filters.countries || ""}&companies=${
                filters.companies || ""
              }&brands=${filters.brands}&capacities=${fathers}`
            : "http://localhost:5000/products"
        );
        dispatch(setIsLoading(false));
        if (isCapacities) {
          let fathersProducts = res.data.data;
          let products = [];
          filters.capacities.map((cap) => {
            fathersProducts.map((item) => {
              if (cap.father === item.brand && cap.cap === item.capacity)
                products.push(item);
            });
          });
          setProducts(products);
          return;
        }
        setProducts(res.data.data);
      } catch (err) {}
    };
    getProducts();
  }, [filters, isFilters]);
  // console.log(products.data);

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
          products?.map((product, index) => (
            <Grid item key={product._id} xs={12} sm={12} md={6} lg={3}>
              <Product product={product} index={index} />
            </Grid>
          ))
        ) : (
          <h1>Loading</h1>
        )}
      </Grid>
      {cartLength.length > 0 ? (
        <div class='sidebar'>
          <div className='list__'>
            <span>List of Items </span>
            <div className='close__' onClick={() => closeside()}>
              <AiFillCloseCircle color='red' size={30} />
            </div>
          </div>
          <ul className='list__ofItems'>
            {cart.map((item, index) => (
              <div className='card__item' key={index}>
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
      ) : null}
    </>
  );
};

export default Products;
