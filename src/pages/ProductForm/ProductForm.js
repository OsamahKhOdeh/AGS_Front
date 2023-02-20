import React, { useState } from "react";
import { TextField, Button, Typography, Paper, Container } from "@material-ui/core";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { createProduct } from "../../api";
//import { CloudinaryContext, Image } from "cloudinary-react";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import AddIcon from "@mui/icons-material/Add";

import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";

import useStyles from "./styles";
import { companyBrandCapacity, categories, china, countries, india, oman, southkorea, thailand, veitnam } from "../../data";
//import { INITIAL_STATE, producReducer } from "./productReducer";

const ProductForm = ({ currentId, setCurrentId }) => {
  //const regex = /^[0-9\b]+$/;
  const regex = /^-?\d*\.?\d*$/;
  //const [state, dispatch] = useReducer(producReducer, INITIAL_STATE);
  const [isUploading, setIsUploading] = useState(false);
  const [productData, setProductData] = useState({
    category: "",
    country: "",
    company: "",
    code: "",
    brand: "",
    price: "",
    capacity: "",
    image: "",
    description: "",
    netWeight: "",
    grossWeight: "",
    palatSize: "",
    bl: [],
  });

  const [bls, setBls] = useState([
    { code: "", qty: 0, date: "MM/DD/YY", warehouse: "" },
    { code: "", qty: 0, date: "MM/DD/YY", warehouse: "" },
    { code: "", qty: 0, date: "MM/DD/YY", warehouse: "" },
    { code: "", qty: 0, date: "MM/DD/YY", warehouse: "" },
  ]);
  const [image, setImage] = useState(null);

  let newArray = [...bls];
  const handleBlCodeChange = (e) => {
    newArray = [...bls];
    newArray[e.target.name].code = e.target.value;
    setBls(newArray);
  };
  const handleBlQtyChange = (e) => {
    if (e.target.value === "" || regex.test(e.target.value)) {
      newArray = [...bls];
      newArray[e.target.name].qty = parseFloat(e.target.value);
      setBls(newArray);
    }
  };
  const handleBlWareHouseChange = (e) => {
    newArray = [...bls];
    newArray[e.target.name].warehouse = e.target.value;
    setBls(newArray);
  };
  const handleBlDateChange = (e) => {
    newArray = [...bls];
    newArray[e.target.name].date = e.target.value;
    setBls(newArray);
  };

  const [showSecBL, setShowSecBL] = useState(false);
  const [showThdcBL, setShowThecBL] = useState(false);
  const [showFrthBL, setShowFrthBL] = useState(false);
  let choosenCountry = productData.country.toLowerCase();
  let companies = ["None", "Choose Company"];
  switch (choosenCountry) {
    case "china":
      companies = china;
      break;
    case "india":
      companies = india;
      break;
    case "south korea":
      companies = southkorea;
      break;
    case "oman":
      companies = oman;
      break;
    case "veitnam":
      companies = veitnam;
      break;
    case "thailand":
      companies = thailand;
      break;
    default:
      companies = ["None"];
  }
  let choosenCompany = productData.company.toLowerCase();
  let brands = ["None", "Choose Brand"];
  if (choosenCompany) {
    brands = companyBrandCapacity.filter((item) => item.companyName.toLowerCase() === choosenCompany.toLocaleLowerCase())[0]?.brands?.map((i) => i.brandName);
  }
  let choosenBrand = productData.brand.toLowerCase();
  let capacities = ["None", "Choose Brand"];
  if (choosenBrand) {
    let brandsForCap = companyBrandCapacity.filter((item) => item.companyName.toLowerCase() === choosenCompany.toLocaleLowerCase())[0].brands;
    capacities = brandsForCap.filter((item) => item.brandName.toLocaleLowerCase() === choosenBrand.toLowerCase())[0]?.capacities;
  }

  const classes = useStyles();

  const clear = () => {
    setProductData({ category: "", country: "", company: "", code: "", brand: "", price: 0, capacity: "", image: "", description: "", netWeight: 0, grossWeight: 0, palatSize: 0, bl: [] });
  };

  const handleUpload = async () => {
    const data = new FormData();
    data.append("file", image);
    data.append("upload_preset", "ags_product");

    const response = await axios.post("https://api.cloudinary.com/v1_1/dwen6dx2a/image/upload", data);
    console.log(response.data.secure_url);
    setIsUploading(false);
    const image_url = response.data.secure_url;

    setProductData({ ...productData, image: image_url });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(bls);
    console.log(productData);
    try {
      const { data } = await createProduct(productData);
      showToastMessage();
      clear();
    } catch (e) {
      showErrorMessage();
      console.log(e);
    }
  };

  const showToastMessage = () => {
    toast.success("Product added Succesfully ✅", {
      position: "top-center",
      autoClose: 2000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
    });
  };
  const showErrorMessage = () => {
    toast.error("Please complete all mandatory fields or enter a valid image", {
      position: "top-center",
      autoClose: 2000,
      hideProgressBar: true,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
    });
  };

  return (
    <Paper className={classes.paper} elevation={6}>
      <ToastContainer />
      <form autoComplete="off" noValidate className={`${classes.root} ${classes.form}`} onSubmit={handleSubmit}>
        <Typography variant="h3" style={{ backgroundColor: "" }}>
          Adding Product
        </Typography>
        <FormControl fullWidth sx={{ m: 1, minWidth: 120 }}>
          <InputLabel id="demo-simple-select-helper-label">Category</InputLabel>
          <Select required labelId="demo-simple-select-helper-label" id="demo-simple-select-helper" value={productData.category} label="Category" onChange={(e) => setProductData({ ...productData, category: e.target.value })}>
            <MenuItem value="">
              <em>None</em>
            </MenuItem>
            {categories?.map((cat, i) => {
              return (
                <MenuItem value={cat} key={i}>
                  {cat}
                </MenuItem>
              );
            })}
          </Select>
        </FormControl>
        <FormControl fullWidth sx={{ m: 1, minWidth: 120 }}>
          <InputLabel id="demo-simple-select-helper-label">Country</InputLabel>
          <Select required labelId="demo-simple-select-helper-label" id="demo-simple-select-helper" value={productData.country} label="Country" onChange={(e) => setProductData({ ...productData, country: e.target.value })}>
            <MenuItem value="">
              <em>None</em>
            </MenuItem>
            {countries?.map((count, i) => {
              return (
                <MenuItem value={count} key={i}>
                  {count}
                </MenuItem>
              );
            })}
          </Select>
        </FormControl>
        <FormControl fullWidth sx={{ m: 1, minWidth: 120 }}>
          <InputLabel id="demo-simple-select-helper-label">Company</InputLabel>
          <Select required labelId="demo-simple-select-helper-label" id="demo-simple-select-helper" value={productData.company} label="Company" onChange={(e) => setProductData({ ...productData, company: e.target.value })}>
            <MenuItem value="">
              <em>None</em>
            </MenuItem>
            {choosenCountry}
            {companies?.map((comp, i) => {
              return (
                <MenuItem value={comp} key={i}>
                  {comp}
                </MenuItem>
              );
            })}
          </Select>
        </FormControl>
        <FormControl fullWidth sx={{ m: 1, minWidth: 120 }}>
          <InputLabel id="demo-simple-select-helper-label">Brand</InputLabel>
          <Select required labelId="demo-simple-select-helper-label" id="demo-simple-select-helper" value={productData.brand} label="Brand" onChange={(e) => setProductData({ ...productData, brand: e.target.value })}>
            <MenuItem value="">
              <em>None</em>
            </MenuItem>
            {brands?.map((brand, i) => {
              return (
                <MenuItem value={brand} key={i}>
                  {brand}
                </MenuItem>
              );
            })}
          </Select>
        </FormControl>
        <FormControl fullWidth sx={{ m: 1, minWidth: 120 }}>
          <InputLabel id="demo-simple-select-helper-label">Capacity</InputLabel>
          <Select required labelId="demo-simple-select-helper-label" id="demo-simple-select-helper" value={productData.capacity} label="Capacity" onChange={(e) => setProductData({ ...productData, capacity: e.target.value })}>
            <MenuItem value="">
              <em>None</em>
            </MenuItem>
            {capacities?.map((cap, i) => {
              return (
                <MenuItem value={cap} key={i}>
                  {cap}
                </MenuItem>
              );
            })}
          </Select>
        </FormControl>

        <TextField name="code" variant="outlined" label="Product Code" fullWidth value={productData.code} onChange={(e) => setProductData({ ...productData, code: e.target.value })} />
        <TextField
          name="netWeight"
          variant="outlined"
          label="Net Weight"
          fullWidth
          value={productData.netWeight}
          onChange={(e) => {
            if (e.target.value.match(/^([0-9]{1,})?(\.)?([0-9]{1,})?$/)) setProductData({ ...productData, netWeight: e.target.value });
          }}
        />
        <TextField
          name="grossWeight"
          variant="outlined"
          label="Gross Weight"
          fullWidth
          value={productData.grossWeight}
          onChange={(e) => {
            if (e.target.value === "" || regex.test(e.target.value)) setProductData({ ...productData, grossWeight: e.target.value });
          }}
        />
        <TextField
          name="paletSize"
          variant="outlined"
          label="Palet Size"
          fullWidth
          value={productData.palatSize}
          onChange={(e) => {
            if (e.target.value === "" || regex.test(e.target.value)) setProductData({ ...productData, palatSize: e.target.value });
          }}
        />
        <TextField name="description" variant="outlined" label="DESECRIPTION" fullWidth multiline minRows={4} value={productData.description} onChange={(e) => setProductData({ ...productData, description: e.target.value })} />
        <Container>
          <TextField name="0" variant="outlined" label="BL Code" value={productData.bl.code} onChange={handleBlCodeChange} />
          <TextField name="0" variant="outlined" label="BL Quantity" value={productData.bl.qty} onChange={handleBlQtyChange} />
          <TextField name="0" variant="outlined" label="BL Warehouse" value={productData.bl.warehouse} onChange={handleBlWareHouseChange} />
          <TextField name="0" variant="outlined" label="BL Date" value={productData.bl.date} onChange={handleBlDateChange} />
          <Button onClick={() => setShowSecBL(true)} variant="outlined" color="primary">
            <AddIcon />
          </Button>
        </Container>
        {showSecBL && (
          <Container>
            <TextField name="1" variant="outlined" label="BL Code" value={productData.bl.code} onChange={handleBlCodeChange} />
            <TextField name="1" variant="outlined" label="BL Quantity" value={productData.bl.qty} onChange={handleBlQtyChange} />
            <TextField name="1" variant="outlined" label="BL Warehouse" value={productData.bl.warehouse} onChange={handleBlWareHouseChange} />
            <TextField name="1" variant="outlined" label="BL Date" value={productData.bl.date} onChange={handleBlDateChange} />
            <Button onClick={() => setShowThecBL(true)} variant="outlined" color="primary">
              <AddIcon />
            </Button>
          </Container>
        )}
        {showThdcBL && (
          <Container>
            <TextField name="2" variant="outlined" label="BL Code" value={productData.bl.code} onChange={handleBlCodeChange} />
            <TextField name="2" variant="outlined" label="BL Quantity" value={productData.bl.qty} onChange={handleBlQtyChange} />
            <TextField name="2" variant="outlined" label="BL Warehouse" value={productData.bl.warehouse} onChange={handleBlWareHouseChange} />
            <TextField name="2" variant="outlined" label="BL Date" value={productData.bl.date} onChange={handleBlDateChange} />
            <Button onClick={() => setShowFrthBL(true)} variant="outlined" color="primary">
              <AddIcon />
            </Button>
          </Container>
        )}

        {showFrthBL && (
          <Container>
            <TextField name="3" variant="outlined" label="BL Code" value={productData.bl.code} onChange={handleBlCodeChange} />
            <TextField name="3" variant="outlined" label="BL Quantity" value={productData.bl.qty} onChange={handleBlQtyChange} />
            <TextField name="3" variant="outlined" label="BL Warehouse" value={productData.bl.warehouse} onChange={handleBlWareHouseChange} />
            <TextField name="3" variant="outlined" label="BL Date" value={productData.bl.date} onChange={handleBlDateChange} />
            <Button variant="outlined" g color="primary">
              <AddIcon />
            </Button>
          </Container>
        )}

        <div className={classes.fileInput}>
          <input
            style={{ color: "red" }}
            type="file"
            name="img"
            onChange={(e) => {
              setImage(e.target.files[0]);
              setProductData({ ...productData, bl: bls });
              setIsUploading(true);
            }}
          />
          <button type="button" onClick={handleUpload}>
            Upload image
          </button>
        </div>
        <Button className={classes.buttonSubmit} disabled={isUploading} variant="contained" color="primary" size="large" type="submit" fullWidth>
          Submit
        </Button>
        <Button variant="contained" color="secondary" size="small" onClick={clear} fullWidth>
          Clear
        </Button>
      </form>
    </Paper>
  );
};

export default ProductForm;
