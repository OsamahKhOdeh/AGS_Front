import React, { useEffect, useState } from "react";
import {
  Grid,
  CircularProgress,
  Paper,
  Container,
  Typography,
} from "@material-ui/core";
import { AiTwotoneDelete } from "react-icons/ai";
import Product from "./Product/Product";
import useStyles from "./styles";
import { staticProducts } from "../../../data";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { setIsLoading } from "../../../store/showingSlice";
import {
  addProducttocart,
  deletProductformCart,
} from "../../../store/cartSlice";
const Products = ({ filters }) => {
  const dispatch = useDispatch();
  // console.log(Object.keys(filters).length);
  let isFilters = Object.keys(filters).length;
  // console.log(filters.capacities);
  let isCapacities = filters?.capacities?.length > 0;
  // console.log("IsCapacities: " + isCapacities);
  console.log(filters.brands);
  // console.log(filters.companies);
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
            : "http://ags-server.onrender.com/products"
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

  const classes = useStyles();
  console.log(products.length);
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

      <div class='sidebar'>
        <span>List of Items </span>
        <ul className='list__ofItems'>
          {cart.map((item, index) => (
            <div className='card__item'>
              <div>{item}</div>
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

        <div className='next'>
          <span>Next button </span>
        </div>
      </div>
    </>
  );
};

export default Products;
