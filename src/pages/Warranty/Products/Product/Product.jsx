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
import Price from "./Price";
const Product = ({ product }) => {

  const showPrice = useSelector((state) => state.show.showPrice);
  const showStock = useSelector((state) => state.show.showStock);
  const showDatasheet = useSelector((state) => state.show.showDatasheet);
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
          <div className='Product__title'>{product.code}</div>
           <div className='item__prices'>
            <div>
              <label htmlFor=''>Capacity : {product.capacity} </label>
            </div>
          </div>
          <div className='item__prices'>
           {showPrice &&
            <div>
              <label htmlFor=''>Price : <Price price={product.price} /> </label>
            </div>
}
{showStock &&
            <div>
              <label htmlFor=''>Stock : 250 </label>
            </div>
}
          </div>

          <div className='product__description'>Description : mmm nnn mmm nnn mmm nn 12 rk</div>
          {showDatasheet &&
          <div className='product__button'>
            <div className='detaills__product'>Download Datasheet</div>
          </div>
}
       </div>
      </div>
    </>
  );
};

export default Product;
