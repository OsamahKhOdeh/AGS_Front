import React, { useState } from "react";
import { Card, CardActions, CardContent, CardMedia, Button, Typography, ButtonBase } from "@material-ui/core/";
import DeleteIcon from "@material-ui/icons/Delete";
import useStyles from "./styles";

const Product = ({ product }) => {
  const classes = useStyles();
  const handleDownloadDatasheet = () => {
    console.log("Datasheet downloaded");
  };

  return (
    <Card className={classes.card} raised elevation={6}>
      <ButtonBase component="span" name="test" className={classes.cardAction} onClick={() => console.log("Product Selected")}>
        <CardMedia className={classes.media} image={product.image || "https://res.cloudinary.com/dwen6dx2a/image/upload/v1675842264/2038830_twveih.png"}></CardMedia>
        <div className={classes.overlay}>
          <Button size="small" color="secondary" onClick={() => console.log("Product Deleted")}>
            <DeleteIcon fontSize="small" /> &nbsp; Delete
          </Button>
        </div>
        <Typography className={classes.title} gutterBottom variant="h5" component="h2">
          {product.productName}
        </Typography>
        <Typography display="inline">Price : {product.price}</Typography>
        <Typography display="inline">Stock : {100}</Typography>

        <CardContent>
          <Typography variant="body2" color="textSecondary" component="p">
            DESCRIPTION :{product.description.split(" ").splice(0, 20).join(" ")}...
          </Typography>
        </CardContent>
        <CardActions className={classes.cardActions}>
          <Button variant="contained" size="large" fullWidth color="primary" onClick={handleDownloadDatasheet}>
            Download Datasheet
          </Button>
        </CardActions>
      </ButtonBase>
    </Card>
  );
};

export default Product;
