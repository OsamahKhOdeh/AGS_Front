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
const Product = ({ product, index }) => {
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

  const addTocart = (items, index) => {
    dispatch(addProducttocart(items));
    // document.querySelector(".sidebar").style.display = "block";
  };

  const removefromcart = (items, index) => {
    dispatch(deletProductformCart(items, index));
  };

  const itemfromCart = useSelector((state) => state.cart.cart);
  // const data = itemfromCart.map((item) =>
  //   item._id.includes(product._id) ? true : false
  // );

  const exist = itemfromCart.some((item) => item._id === product._id);

  return (
    <>
      <div
        className={exist ? "product__item background_color" : "product__item"}
        style={{}}>
        <div className='product__image '>
          <img
            src={
              product.image ||
              "https://res.cloudinary.com/dwen6dx2a/image/upload/v1675842264/2038830_twveih.png"
            }
            alt=''
          />
          {exist ? (
            <div
              className='check__product'
              onClick={() => {
                removefromcart(product, index);
              }}>
              -
            </div>
          ) : (
            <div
              className='check__product'
              onClick={() => {
                addTocart(product, index);
              }}>
              +
            </div>
          )}
        </div>
        <div className='product__description'>
          <div className='Product__title'>Luminous Battery</div>
          <div className='item__prices'>
            <div>
              <label htmlFor=''>Price : {product.price} </label>
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
