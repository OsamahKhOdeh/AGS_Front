import React, { useRef, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import DeleteIcon from "@material-ui/icons/Delete";
import useStyles from "./styles";
import { useSelector, useDispatch } from "react-redux";

import { updateProduct } from "../../../../actions/products";

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
import { Button, TextField } from "@material-ui/core";
const Product = ({ product, index }) => {
 



  const showPrice = useSelector((state) => state.show.showPrice);
  const showStock = useSelector((state) => state.show.showStock);
  const showDatasheet = useSelector((state) => state.show.showDatasheet);

  const dispatch = useDispatch();
  const [isChecked, setIsChecked] = useState(false);
  // const QtyRef = useRef('')

  const [qty, setQty] = useState("");
  const [stateProduct , setStateProduct] = useState(product)
  const [price, setPrice] = useState(product.price);
  const [stock, setStock] = useState(product.stock);
  const [freezoneToLocalPercentage, setFreezoneToLocalPercentage] = useState(product.freezoneToLocalPercentage);
  const [additionOnLocalPercentage, setAdditionOnLocalPercentage] = useState(product.additionOnLocalPercentage);

  const classes = useStyles();
  
  const handlePriceStockChange =() => {
    
         dispatch(updateProduct(product._id , {...product , price : price , stock : stock ,
        freezoneToLocalPercentage : freezoneToLocalPercentage,
        additionOnLocalPercentage : additionOnLocalPercentage}));
        setStateProduct({...stateProduct , price : price , stock : stock ,
        freezoneToLocalPercentage : freezoneToLocalPercentage,
        additionOnLocalPercentage : additionOnLocalPercentage})
        console.log(stateProduct);
                showToastMessage();


  }

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

  const showToastMessage = () => {
    toast.success("Product updated Succesfully ✅", {
      position: "top-center",
      autoClose: 200,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
    });
  };

  return (
    <>
              <ToastContainer />

      <div
        className={exist ? "product__item background_color" : "product__item"}
        style={{}}>
        <div className='product__image '>
          <img
            src={
              product.image[0] ||
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
          <div className='item__prices'>
            <div>
              <label htmlFor=''>Capacity : {product.capacity} </label>
              <label htmlFor=''>Price : <Price price={product.price} freezoneToLocalPercentage={product.freezoneToLocalPercentage}
              additionOnLocalPercentage={product.additionOnLocalPercentage}/> </label>
            </div>
          </div>
          <div className='item__prices'>
            {showPrice && (
              <div>
                <label htmlFor=''>Price : {product.price}</label>
              </div>
            )}
            {showStock && (
              <div>
                <label htmlFor=''>Stock : {product.stock} </label>
              </div>
            )}
          </div>

          <div className='product__description'>{product.code}</div>
          <div className='product_price_stock'>
           <TextField fullWidth style={{marginBottom : "10px "}} variant="outlined" label="Price" value={price} onChange={
            (e)=>{setPrice(e.target.value); setStateProduct({...stateProduct , price : (e.target.value) , stock : stock ,
        freezoneToLocalPercentage : freezoneToLocalPercentage,
        additionOnLocalPercentage : additionOnLocalPercentage})}}>

           </TextField>
           <TextField fullWidth style={{marginBottom : "10px "}} variant="outlined" label="Stock" value={stock} onChange={(e)=>{setStock(e.target.value)}}></TextField>
           <TextField error={freezoneToLocalPercentage > 100 } fullWidth style={{marginBottom : "10px "}} variant="outlined" label="Addition on Freezone" value={freezoneToLocalPercentage} onChange={(e)=>{setFreezoneToLocalPercentage(e.target.value)}}></TextField>
           <TextField error={additionOnLocalPercentage>100} fullWidth style={{marginBottom : "10px "}} variant="outlined" label="Addition on Local" value={additionOnLocalPercentage} onChange={(e)=>{setAdditionOnLocalPercentage(e.target.value)}}></TextField>
           
            <Button variant="contained" style={{backgroundColor :"#ed3615"}} onClick={handlePriceStockChange} fullWidth>Update Product</Button>

          </div>  
        </div>
      </div>
    </>
  );
};

export default Product;
