import React from "react";
import { useSelector } from "react-redux";
import Price from "../Warranty/Products/Product/Price";
import ProductItem from "../Warranty/Products/Product/ProductItem";

function CheckCustomer() {
  const cart = useSelector((state) => state.cart.cart);

  return (
    <>
      <div className='image__logo'>
        <img src='/images/logo.png' alt='' srcset='' />
      </div>
      <div className='list__ite'>
        {cart.map((item, index) => (
          <div className='list__product' key={index}>
            <img src={item.image} alt='' />
            <div className='description__product'>
              <div className='price'>
                <Price price={item.price} />
              </div>
              <div className='product__description'>{item.code}</div>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}

export default CheckCustomer;
