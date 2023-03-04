import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Container, Grow, Paper } from "@material-ui/core";
import { Button } from "@mui/material";
import Pagination from "./Pagination";
import ExpandCircleDownIcon from "@mui/icons-material/ExpandCircleDown";
import "react-dropdown-tree-select/dist/styles.css";
import { useDispatch, useSelector } from "react-redux";
import { china, india, south_korea, oman, veitnam, thailand } from "./data";
import useStyles from "./styles";
import Products from "./Products/Products";
import { setFiltersState } from "../../store/filtersSlice";

import "./style/warranty.css";
import Category from "./Category";
import CountryItem from "./Country";
import { categories } from "../../data";
import { getFilteredProducts } from "../../actions/products";
import { useEffect } from "react";
import SideFilters from "./SideFilters/SideFilters";
import DropDown from "./DropDown";
import { setShowFilters } from "../../store/showingSlice";
import Brands from "./Brands/Brands";

let choosenCompanies = [];
let choosenBrands = [];
let choosenCapacities = [];

function useQuery() {
  return new URLSearchParams(useLocation().search);
}

const Warranty = () => {

  const countriesProducts = useSelector((state)=>state.products.productsForCountries)
  let countries = [];
    countriesProducts.map((product)=> {
        if(!countries.includes(product.country)){
          countries.push(product.country)
        }
    })
    console.log(countries);
 


  const handleSearch = () => {
    let companies = [...new Set(choosenCompanies)];
    let brands = [...new Set(choosenBrands)];
    var capacities = choosenCapacities.reduce((unique, o) => {
      if (!unique.some((obj) => obj.father === o.father && obj.cap === o.cap)) {
        unique.push(o);
      }
      return unique;
    }, []);
    dispatch(
      setFiltersState({
        ...filters,
        companies: companies,
        brands: brands,
        capacities: capacities,
      })
    );
    choosenCompanies = [];
    choosenBrands = [];
  };

  //Osama///////////
  const query = useQuery();
  const page = query.get("page") || 1;
  ///////////////////////////
  const dispatch = useDispatch();
  const classes = useStyles();
  const shows = useSelector((state) => state.show.showPrice);
  const navigate = useNavigate();
  const filters = useSelector((state) => state.filters.filters);

  ///////////////////////////////////////////////////////////////////////
  let arrayOfSelectedNodes = [];

  let choosenCompanies = [];
  const [chosenCompanies, setChosenCompanies] = useState([]);

  let allCompanies = [];

  let choosenBrands = [];
  let choosenCapacities = [];

  function onAction(node, action) {
    console.log("onAction::", action, node);
  }
  const onChange = (currentNode, selectedNodes) => {
    console.log("im the best in the world");
    //choosenCompanies = [];
    // choosenBrands = [];
    // choosenCapacities = [];

    Object.keys(selectedNodes).forEach((k) => {
      const node = selectedNodes[k];
      if (node._depth === 0) {
        choosenCompanies.push(node.label);
      }
      if (node._depth === 1) {
        choosenBrands.push(node.label);
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
    handleSearch();
  };

  useEffect(() => {}, []);

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

  const handleNext = () => {
    navigate("/warranty-check");
  };

  const navigateToChekCustomer = () => {
    navigate("/checkCustomer");
  };

  //Hid & Show Filters //////////////////////////////////////////////////////////////
  // const [showFilters, setShowFilters] = useState(true);
  const showFilters = useSelector((state) => state.show.showFilters);
  useEffect(() => {
    if (showFilters) {
      dispatch(getFilteredProducts(filters));
    }
  }, [dispatch, filters, showFilters]);

  const [selectedItems, setSelectedItems] = useState([]);

  const [selectedCategories, setSelectedCategories] = useState([]);

  const handleCountryChange = (item) => {
    const isALL = selectedItems.includes("All");
    const index = selectedItems.indexOf(item);
    if (item === "All") {
      dispatch(setFiltersState({ ...filters, countries: ["All"], brands :[""] }));
      setSelectedItems(["All"]);
      return;
    }
    if (item !== "All") {
      const selectedItems2 = selectedItems;
      if (isALL) selectedItems2.splice(selectedItems.indexOf("All", 1));
      // If the item is not in the array, add it
      if (index === -1) {
        dispatch(
          setFiltersState({ ...filters, countries: [...selectedItems2, item] ,brands : [""] })
        );
        setSelectedItems([...selectedItems2, item]);
      } else {
        // If the item is already in the array, remove it
        dispatch(
          setFiltersState({
            ...filters,
            countries: selectedItems2.filter((_, i) => i !== index),
            brands :[""]
          })
        );
        setSelectedItems(selectedItems2.filter((_, i) => i !== index));
      }
    }
  };

  const handleCategoryChange = (item) => {
    const isALL = selectedCategories.includes("All");
    const index = selectedCategories.indexOf(item);
    if (item === "All") {
      dispatch(setFiltersState({ ...filters, categories: ["All"], brands :[""] }));
      setSelectedCategories(["All"]);
      return;
    }
    if (item !== "All") {
      const selectedItems2 = selectedCategories;
      if (isALL) selectedItems2.splice(selectedCategories.indexOf("All", 1));
      // If the item is not in the array, add it
      if (index === -1) {
        dispatch(
          setFiltersState({ ...filters, categories: [...selectedItems2, item], brands :[""] })
        );
        setSelectedCategories([...selectedItems2, item]);
      } else {
        // If the item is already in the array, remove it
        dispatch(
          setFiltersState({
            ...filters,
            categories: selectedItems2.filter((_, i) => i !== index), brands :[""]
          })
        );
        setSelectedCategories(selectedItems2.filter((_, i) => i !== index));
      }
    }
  };

  return (
    <>
      <Grow in>
        <Container maxWidth='xl'>
          <div>
            <Button
              onClick={() => {
                dispatch(setShowFilters(!showFilters));
                //setShowFilters(!showFilters)
              }}>
              <ExpandCircleDownIcon />
            </Button>
          </div>

          {showFilters && (
            <>
              <div className='search__list'>
                <div className='change__'>
                  {/* end of header */}

                  <div>
                    <div className='search__withfilters'>
                      <div style={{ display: "flex", gap: 20 }}>
                        {categories.map((item, i) => (
                          <Category
                            title={item.label}
                            img={item.img}
                            onClick={handleCategoryChange}
                            key={i}
                            //  checklevel1={checklevel1}
                            // setcheck={setcheck}
                          />
                        ))}
                      </div>
                      {/* end of container */}

                      {/* end of quiz_section */}
                    </div>
                    {selectedCategories.length !== 0 && (
                      <div className='filter__search'>
                        {countries.map((item, i) => (
                          <>
                            <CountryItem
                              key={i}
                              title={item}
                              img={item.img}
                              onClick={handleCountryChange}
                            />
                          </>
                        ))}
                      </div>
                    )}

                    <div className='list__filter'>
                      {(selectedItems.length !== 0 && !selectedItems.includes("All"))
                        ? 
                        <Brands/>
                        : null}
                       
                        {/*selectedItems.map((item, i) => (
                            <div className='select__list'>
                              <DropDown
                                item={item}
                                onChange={onChange}
                                onNodeToggle={onNodeToggle}
                                onAction={onAction}
                              />
                            </div>
                        )) */}

                        
                    </div>
                  </div>

                  <SideFilters />
                </div>
              </div>
            </>
          )}
          {!showFilters && (
            <Paper className={classes.pagination} elevation={6}>
              <Pagination page={page} />
            </Paper>
          )}

          <Products filters={filters} />
        </Container>
      </Grow>
    </>
  );
};

export default Warranty;
