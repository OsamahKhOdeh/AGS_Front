import React from 'react'
import { useSelector } from 'react-redux';

const Price = ({ price , freezoneToLocalPercentage ,additionOnLocalPercentage }) => {
    const currency = useSelector((state) => state.filters.currency);
  const location = useSelector((state) => state.filters.location);
  const usdToAedRate = useSelector((state) => state.filters.usdToAedRate);
  console.log(price);
     
   let localPrice =price+ price * freezoneToLocalPercentage / 100;
   console.log(localPrice);
   let localPriceAfterAddition = localPrice + localPrice * additionOnLocalPercentage / 100;
     console.log(localPriceAfterAddition);

  return (
    <div> <b style={{ backgroundColor: "#E0E5E4", color: "red" }}>
            {location === "local" ? (
              <>{currency === "USD" ? price + "  $" : (Math.round(price * usdToAedRate * 100) / 100).toFixed(2) + "  AED"}</>
            ) : (
              <>{currency === "USD" ?
               (localPriceAfterAddition).toFixed(2) + "  $" 
              : ((localPriceAfterAddition * usdToAedRate * 100) / 100).toFixed(2) + "  AED"}</>
            )}
          </b></div>
  )
}

export default Price