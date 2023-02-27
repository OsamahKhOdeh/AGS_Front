import React from "react";
import { useSelector } from "react-redux";
import ProductItem from "../Warranty/Products/Product/ProductItem";
import ReactToPrint from "react-to-print";

function CheckCustomer() {
  const cart = useSelector((state) => state.cart.cart);

  return (
    <>
      <div className='list__ite'>
        {cart.map((item, index) => (
          <div className='list__product' key={index}>
            <img src={item.image} alt='' />
            <div className='product__description'>{item.code}</div>
            <div>Price : {item.price}</div>
          </div>
        ))}
      </div>
    </>
  );
}

export default CheckCustomer;
