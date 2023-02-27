import React, { useRef, useState } from "react";

import DeleteIcon from "@material-ui/icons/Delete";
import useStyles from "./styles";
import { useSelector, useDispatch } from "react-redux";
import {
  addProductToWarrantyList,
  removeProductFromWarrantyList,
  setProductQty,
} from "../../../../store/warrantySlice";

import {
  addProducttocart,
  deletProductformCart,
} from "../../../../store/cartSlice";
import product from "../Product/style/product.css";
const Product = ({ product }) => {
  const dispatch = useDispatch();
  const [isChecked, setIsChecked] = useState(false);
  // const QtyRef = useRef('')

  const [qty, setQty] = useState("");

  const classes = useStyles();
  const handleCheckboxChange = (event) => {
    setIsChecked(event.target.checked);
    if (!isChecked) {
      dispatch(addProductToWarrantyList({ ...product, qty }));
    } else {
      dispatch(removeProductFromWarrantyList(product));
    }
  };

  const handleQtyChange = (event) => {
    setQty(event.target.value);
  };

  let stock = 0;
  product.bl.map((item) => {
    stock = stock + item.qty;
  });

  const addTocart = (items) => {
    dispatch(addProducttocart(items));
  };

  return (
    <>
      {/* <Card className={classes.card} raised elevation={6}>
        <Checkbox
          checked={isChecked}
          onChange={handleCheckboxChange}
          style={{
            transform: "scale(2)",
          }}
        />
        <CardMedia
          style={{
            width: "auto",
            maxHeight: "200px",
          }}
          className={classes.media}
          image={
            product.image ||
            "https://res.cloudinary.com/dwen6dx2a/image/upload/v1675842264/2038830_twveih.png"
          }></CardMedia>

        <div className={classes.overlay}></div>
        <Typography className={classes.title} variant='h6' component='h2'>
          {product.code}
        </Typography>

        <Typography className={classes.capacity} variant='h6'>
          Capacity :
          <b style={{ backgroundColor: "#87FFB0" }}> {product.capacity}</b>
        </Typography>

        <CardContent>
          {isChecked && (
            <div className={classes.if_checked}>
              <Typograp className={classes.qty} variant='h5'>
                Qty :
              </Typograp
  const spliceCart = (item) => {
    dispatch(deletProductformCart(item));
  };hy>
              
              <TextField
                className={classes.qty_text}
                value={qty}
                onChange={handleQtyChange}
                onBlur={() => {
                  dispatch(setProductQty({ id: product._id, qty: qty }));
                }}
              />
            </div>
          )}
        </CardContent>
      </Card> */}

      <div className='product__item'>
        <div className='product__image'>
          <img
            src={
              product.image ||
              "https://res.cloudinary.com/dwen6dx2a/image/upload/v1675842264/2038830_twveih.png"
            }
            alt=''
          />
          <div
            className='check__product'
            onClick={() => {
              addTocart(product);
            }}>
            +
          </div>
        </div>
        <div className='product__description'>
          <div className='Product__title'>Luminous Battery</div>
          <div className='item__prices'>
            <div>
              <label htmlFor=''>Price : 300 </label>
            </div>
            <div>
              <label htmlFor=''>Stock : 250 </label>
            </div>
          </div>

          <div className='product__description'>{product.code}</div>
          <div className='product__button'>
            <div className='detaills__product'>Download Datasheet</div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Product;
