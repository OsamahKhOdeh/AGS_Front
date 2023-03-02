import React from "react";
import { useSelector } from "react-redux";

const Price = ({ price }) => {
  const currency = useSelector((state) => state.filters.currency);
  const location = useSelector((state) => state.filters.location);
  const usdToAedRate = useSelector((state) => state.filters.usdToAedRate);
  return (
    <div>
      <b style={{}}>
        {location === "freezone" ? (
          <>
            Price : &nbsp;
            {currency === "USD"
              ? price + "  $"
              : (Math.round(price * usdToAedRate * 100) / 100).toFixed(2) +
                "  AED"}
          </>
        ) : (
          <>
            Price :&nbsp;
            {currency === "USD"
              ? price + price / 10 + "  $"
              : (
                  Math.round((price + price / 10) * usdToAedRate * 100) / 100
                ).toFixed(2) + "  AED"}
          </>
        )}
      </b>
    </div>
  );
};

export default Price;
