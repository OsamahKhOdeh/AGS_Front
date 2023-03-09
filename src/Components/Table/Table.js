import { Button, TextField } from "@material-ui/core";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { deletProductformCart, setProductQty, modifyProductPrice } from "../../store/cartSlice";
import { contents } from "./test";
const TablePage = () => {
  const dispatch = useDispatch();
  const totalAmount = useSelector((state) => state.products.total);
  const selectedProducts = useSelector((state) => state.cart.cart);
  const location = useSelector((state) => state.filters.location);
  const currency = useSelector((state) => state.filters.currency);
  const usdToAedRate = useSelector((state) => state.filters.usdToAedRate);

  const [qty, setQty] = useState("");
  console.log(selectedProducts);

  function calcPrice(price, freezoneToLocalPercentage, additionOnLocalPercentage) {
    let netToFreezonePer = freezoneToLocalPercentage;
    let freezoneToLocalPer = additionOnLocalPercentage;
    let freezonePrice = price + (price * netToFreezonePer) / 100;
    let localPrice = freezonePrice + (freezonePrice * freezoneToLocalPer) / 100;

    if (location === "freezone") {
      if (currency === "USD") {
        return freezonePrice;
      } else {
        return (Math.round(freezonePrice * usdToAedRate * 100) / 100).toFixed(2);
      }
    } else {
      if (currency === "USD") {
        return localPrice.toFixed(2);
      } else {
        return ((localPrice * usdToAedRate * 100) / 100).toFixed(2);
      }
    }
  }

  return (
    <>
      <div className="container mx-auto">
        <table className="w-full whitespace-nowrap">
          <thead>
            <tr className="h-16  text-sm leading-none text-gray-800">
              <th className="font-normal text-left ">NO</th>
              <th className="font-normal text-left pl-12">ITEMS</th>
              <th className="font-normal text-left ">QTY(PCS)/(WATTS)</th>
              <th className="font-normal text-left ">UNIT PRICE(USD)</th>
              <th className="font-normal text-left ">TOLTAL USD</th>
              <th className="font-normal  pl-12">ACTIONS</th>
            </tr>
          </thead>
          <tbody className="">
            {selectedProducts.map((item, index) => (
              <tr className="h-20 text-sm leading-none text-gray-800 bg-white hover:bg-gray-100 border-b border-t border-gray-100" key={index}>
                <td className="pl-4 cursor-pointer">
                  <div className="flex items-center">{index + 1}</div>
                </td>
                <td className="pl-12">
                  <p className="text-sm font-medium leading-none text-gray-800">{item.code}</p>
                </td>
                <td className="pl-12">
                  <p className="font-medium">{item.qty}</p>
                </td>
                <td className="pl-12">
                  <p className="font-medium">
                    {" "}
                    {currency === "USD" ? " $ " : " AED "}
                    {calcPrice(item.price, item.freezoneToLocalPercentage, item.additionOnLocalPercentage)}
                  </p>
                </td>
                <td className="pl-12">
                  <p className="font-medium">
                    {currency === "USD" ? " $ " : " AED "}
                    {(calcPrice(item.price, item.freezoneToLocalPercentage, item.additionOnLocalPercentage) * item.qty).toFixed(2)}
                  </p>
                </td>
                <td className="pl-12">
                  <Button
                    variant="contained"
                    onClick={() => {
                      dispatch(modifyProductPrice({ id: item._id, price: calcPrice(item.price, item.freezoneToLocalPercentage, item.additionOnLocalPercentage) }));

                      dispatch(setProductQty({ id: item._id, qty: qty }));
                    }}
                    style={{ marginRight: "20px" }}
                    color="primary"
                  >
                    MODIFY
                  </Button>
                  <TextField
                    variant="outlined"
                    onChange={(e) => {
                      setQty(e.target.value);
                    }}
                    style={{ width: "70px", marginRight: "20px" }}
                  />
                  <Button
                    onClick={() => {
                      dispatch(deletProductformCart(item));
                    }}
                    variant="contained"
                    style={{ backgroundColor: "red" }}
                    color="error"
                  >
                    DELETE
                  </Button>
                </td>
              </tr>
            ))}
            <tr className="h-20 text-sm leading-none text-gray-800 bg-white hover:bg-gray-100 border-b border-t border-gray-100">
              <td className="pl-12">
                <p className="text-sm font-medium leading-none text-gray-800"></p>
              </td>
              <td className="pl-12">
                <p className="text-sm font-medium leading-none text-gray-800"></p>
              </td>
              <td className="pl-12">
                <p className="text-sm font-medium leading-none text-gray-800"></p>
              </td>
              <td className="pl-12">
                <p className="text-sm font-medium leading-none text-gray-800">Total Invoice :</p>
              </td>
              <td className="pl-12">
                <p className="text-sm font-medium leading-none text-gray-800">{totalAmount}</p>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </>
  );
};

export default TablePage;
