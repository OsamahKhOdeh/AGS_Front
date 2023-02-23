import React, { useRef, useState } from "react";
import { Card, CardActions, CardContent, CardMedia, Button, Typography, ButtonBase, Checkbox, TextField, Paper, FormControlLabel, Switch } from "@material-ui/core/";
import DeleteIcon from "@material-ui/icons/Delete";
import useStyles from "./styles";
import { useSelector, useDispatch } from "react-redux";
import { addProductToWarrantyList, removeProductFromWarrantyList, setProductQty } from "../../../../store/warrantySlice";

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

  return (
    <Card className={classes.card} raised elevation={6}>
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
        image={product.image || "https://res.cloudinary.com/dwen6dx2a/image/upload/v1675842264/2038830_twveih.png"}
      ></CardMedia>
      <div className={classes.overlay}></div>
      <Typography className={classes.title} variant="h6" component="h2">
        {product.code}
      </Typography>{" "}
      <Typography className={classes.capacity} variant="h6">
        Capacity :<b style={{ backgroundColor: "#87FFB0" }}> {product.capacity}</b>
      </Typography>
      <CardContent>
        {isChecked && (
          <div className={classes.if_checked}>
            <Typography className={classes.qty} variant="h5">
              Qty :
            </Typography>
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
    </Card>
  );
};

export default Product;
