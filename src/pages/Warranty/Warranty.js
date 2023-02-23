import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";
import { AppBar, Checkbox, Container, FormControlLabel, Grid, Grow, Paper, TextField, Toolbar, Typography } from "@material-ui/core";
import { Button, ToggleButton } from "@mui/material";
import ExpandCircleDownIcon from "@mui/icons-material/ExpandCircleDown";
import ArrowCircleUpIcon from "@mui/icons-material/ArrowCircleUp";
import DropdownTreeSelect from "react-dropdown-tree-select";
//import "./priceList.css";
import "react-dropdown-tree-select/dist/styles.css";
import { useDispatch, useSelector } from "react-redux";

import { china, india, south_korea, oman, veitnam, thailand } from "./data";
/*import india from "./india.json";
import south_korea from "./south_korea.json";
import oman from "./oman.json";
import veitnam from "./veitnam.json";
import thailand from "./thailand.json";
*/
import useStyles from "./styles";
import { categories, countries } from "../../data";
import Select from "react-select";
import Products from "./Products/Products";
import { changeCurrency, changeLocation, setFiltersState, setUsdToAedRate } from "../../store/filtersSlice";
let choosenCompanies = [];
let choosenBrands = [];
let choosenCapacities = [];
const Warranty = () => {
  const dispatch = useDispatch();
  const classes = useStyles();
  const selectedProducts = useSelector((state) => state.products);
  const shows = useSelector((state) => state.show.showPrice);
  // console.log(shows);
  // console.log(selectedProducts);
  const navigate = useNavigate();
  const [filters, setFilters] = useState({});
  const [choosenCategories, setCategories] = useState(useSelector((state) => state.filters.filters.categories));
  const [choosenCountries, setCountries] = useState(useSelector((state) => state.filters.filters.countries));

  ///////////////////////////////////////////////////////////////////////
  let arrayOfSelectedNodes = [];

  const onChange = (currentNode, selectedNodes) => {
    let choosenCapacitiesr = [];
    Object.keys(selectedNodes).forEach((k) => {
      const node = selectedNodes[k];
      if (node._depth === 0) {
        choosenCompanies.push(node.label);
        // console.log(choosenCompanies);
      }
      if (node._depth === 1) {
        choosenBrands.push(node.label);
        // console.log(choosenBrands);
      }
      if (node._depth === 2) {
        let father = findFateher(node);
        // let grandFather = findFateher(father);
        // console.log("FATHER :" + father + "GRAND Father " + grandFather);
        const cap = node.label;
        choosenCapacities.push({ cap, father });
      }
    });
    //console.log(choosenCapacities);

    arrayOfSelectedNodes = selectedNodes.map((node) => {
      let str = JSON.stringify(node);
      return str;
    });
  };

  let toggled = [];

  const onNodeToggle = (currentNode) => {
    toggled.push(currentNode);
  };

  const findFateher = (child) => {
    let found = "";
    Object.keys(toggled).forEach((k) => {
      const node = toggled[k];
      if (child._parent === node._id) {
        found = node.label;
      }
    });
    return found;
  };

  const assignObjectPaths = (obj, stack) => {
    Object.keys(obj).forEach((k) => {
      const node = obj[k];
      if (typeof node === "object") {
        node.path = stack ? `${stack}.${k}` : k;
        assignObjectPaths(node, node.path);
      }
    });
  };

  assignObjectPaths(china);
  assignObjectPaths(india);
  assignObjectPaths(south_korea);
  assignObjectPaths(oman);
  assignObjectPaths(veitnam);
  assignObjectPaths(thailand);

  const handleCategoryChange = (e) => {
    let cat = e.target.value;

    //console.log(cat);
    let cats = [...choosenCategories];

    if (cat === "All" || choosenCategories.includes("All")) {
      cats.splice(cats.indexOf("All"), 1);
    }
    if (!choosenCategories.includes(cat)) {
      cats.push(cat);
    } else {
      cats.splice(cats.indexOf(cat), 1);
    }
    setCategories(cats);
    dispatch(setFiltersState({ ...filters, categories: cats }));
    setFilters({ ...filters, categories: cats });
  };
  const handleCountryChange = (e) => {
    let count = e.target.value;
    //console.log(count);
    let counts = [...choosenCountries];
    if (count === "All" || choosenCountries.includes("All")) {
      counts.splice(counts.indexOf("All"), 1);
    }
    if (!choosenCountries.includes(count)) {
      counts.push(count);
    } else {
      counts.splice(counts.indexOf(count), 1);
    }

    setCountries(counts);
    dispatch(setFiltersState({ ...filters, countries: counts }));

    setFilters({ ...filters, countries: counts });
  };
  //console.log(filters);

  const handleSearch = () => {
    // console.log("clicked search");
    let companies = [...new Set(choosenCompanies)];
    let brands = [...new Set(choosenBrands)];
    // let capacities = [...new Set(choosenCapacities)];
    var capacities = choosenCapacities.reduce((unique, o) => {
      if (!unique.some((obj) => obj.father === o.father && obj.cap === o.cap)) {
        unique.push(o);
      }
      return unique;
    }, []);
    dispatch(setFiltersState({ ...filters, companies: companies, brands: brands, capacities: capacities }));

    setFilters({ ...filters, companies: companies, brands: brands, capacities: capacities });

    choosenCompanies = [];
    choosenBrands = [];
  };

  const handleNext = () => {
    navigate("/warranty-check");
  };

  //Hid & Show Filters //////////////////////////////////////////////////////////////
  const [showFilters, setShowFilters] = useState(true);
  const handleShowFilters = () => {
    setShowFilters(!showFilters);
  };

  return (
    <>
      <Grow in>
        <Container maxWidth="xl">
          <div>
            <Button onClick={handleShowFilters}>
              <ExpandCircleDownIcon />
            </Button>
          </div>
          {showFilters && (
            <Grid container justifyContent="space-between" alignitems="stretch" spacing={3} className={classes.gridContainer}>
              <Grid item xs={12} sm={12} md={12}>
                <Container>
                  <ToggleButtonGroup fullWidth value={choosenCategories} onChange={handleCategoryChange} aria-label="text formatting">
                    {categories.map((cat, i) => {
                      return (
                        <ToggleButton style={{ fontSize: "22px", fontWeight: "bold", color: "#44435B" }} key={i} value={cat} aria-label={cat}>
                          {cat}
                        </ToggleButton>
                      );
                    })}
                  </ToggleButtonGroup>

                  <ToggleButtonGroup fullWidth value={choosenCountries} onChange={handleCountryChange} aria-label="text formatting">
                    {countries.map((country, i) => {
                      return (
                        <ToggleButton style={{ fontSize: "20px", fontWeight: "bold" }} key={i} value={country} aria-label={country}>
                          {country}
                        </ToggleButton>
                      );
                    })}
                  </ToggleButtonGroup>
                  <div className={classes.gridContainer}>
                    <div className="dropdowns">
                      <DropdownTreeSelect texts={{ placeholder: "CHINA" }} data={china} onChange={onChange} onNodeToggle={onNodeToggle} className="mdl-demo" />
                      <DropdownTreeSelect texts={{ placeholder: "INDIA" }} data={india} onChange={onChange} onNodeToggle={onNodeToggle} className="mdl-demo" />
                      <DropdownTreeSelect texts={{ placeholder: "SOUTH KOREA" }} data={south_korea} onChange={onChange} onNodeToggle={onNodeToggle} className="mdl-demo" />
                      <DropdownTreeSelect texts={{ placeholder: "OMAN" }} data={oman} onChange={onChange} onNodeToggle={onNodeToggle} className="mdl-demo" />
                      <DropdownTreeSelect texts={{ placeholder: "VIETNAM" }} data={veitnam} onChange={onChange} onNodeToggle={onNodeToggle} className="mdl-demo" />
                      <DropdownTreeSelect texts={{ placeholder: "THAILAND" }} data={thailand} onChange={onChange} onNodeToggle={onNodeToggle} className="mdl-demo" />
                    </div>
                  </div>
                  <div className={classes.buttons}>
                    <Button className={classes.button} variant="contained" color="primary" onClick={handleNext}>
                      Next{" "}
                    </Button>
                  </div>
                </Container>
              </Grid>
            </Grid>
          )}

          <Products filters={filters} />
        </Container>
      </Grow>
    </>
  );
};

export default Warranty;
