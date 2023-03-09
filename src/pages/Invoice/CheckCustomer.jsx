import React from "react";
import { useSelector } from "react-redux";
import ProductItem from "../Warranty/Products/Product/ProductItem";

function CheckCustomer() {
  const cart = useSelector((state) => state.cart.cart);

  return (
    <>
      <div className='list__ite'>
        {cart.map((item, index) => (
          <div className='list__product' key={index}>
            <img src={item.image[0]} alt='' />
            <div className='description__product'>
              <div className='price'>Price : {item.price}</div>
              <div className='product__description'>{item.code}</div>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}

export default CheckCustomer;
