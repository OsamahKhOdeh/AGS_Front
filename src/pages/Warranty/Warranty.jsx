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
import {setFiltersState } from "../../store/filtersSlice";

import "./style/warranty.css";
import Category from "./Category";
import CountryItem from "./Country";
import { categories, countries } from "../../data";
import { getFilteredProducts } from "../../actions/products";
import { useEffect } from "react";
import SideFilters from "./SideFilters/SideFilters";
import DropDown from "./DropDown";

let choosenCompanies = [];
let choosenBrands = [];
let choosenCapacities = [];

function useQuery() {
  return new URLSearchParams(useLocation().search);
}

const Warranty = () => {

   const handleSearch = () => {
    let companies = [...new Set(choosenCompanies)];
    let brands = [...new Set(choosenBrands)];
    var capacities = choosenCapacities.reduce((unique, o) => {
      if (!unique.some((obj) => obj.father === o.father && obj.cap === o.cap)) {
        unique.push(o);
      }
      return unique;
    }, []);
    dispatch(setFiltersState({ ...filters, companies: companies, brands: brands, capacities: capacities }));

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
  const filters = useSelector((state) => state.filters.filters)
 
  ///////////////////////////////////////////////////////////////////////
  let arrayOfSelectedNodes = [];
 
let choosenCompanies = [];

let choosenBrands = [];
let choosenCapacities = [];


  const onChange = (currentNode, selectedNodes) => {
     choosenCompanies =[];
     choosenBrands = [];
     choosenCapacities = [];

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

  const handleNext = () => {
    navigate("/warranty-check");
  };

  const navigateToChekCustomer = () => {
    navigate("/checkCustomer");
  };

  //Hid & Show Filters //////////////////////////////////////////////////////////////
  const [showFilters, setShowFilters] = useState(true);
  

  
  useEffect(() => {
   if(showFilters) {
   dispatch(getFilteredProducts(filters));
  }
  }, [dispatch, filters, showFilters]);

  const [selectedItems, setSelectedItems] = useState([]);

  const [selectedCategories, setSelectedCategories] = useState([]);

  const handleCountryChange = (item) => {
    const isALL  =selectedItems.includes("All")
    const index = selectedItems.indexOf(item);
    if(item === "All"){
       dispatch(setFiltersState({ ...filters, countries: ["All"]}));
      setSelectedItems( ["All"]);
      return
    }
    if(item !== "All")
    {
      const selectedItems2 = selectedItems;
      if(isALL) selectedItems2.splice(selectedItems.indexOf("All",1))
      // If the item is not in the array, add it
    if (index === -1) {
      
      dispatch(setFiltersState({ ...filters, countries: [...selectedItems2, item]}));
      setSelectedItems([...selectedItems2, item]);
    } else {
      // If the item is already in the array, remove it
       dispatch(setFiltersState({ ...filters, countries: selectedItems2.filter((_, i) => i !== index)}));
      setSelectedItems(selectedItems2.filter((_, i) => i !== index));
    }
  }
  };
  
  const handleCategoryChange = (item) => {
    const isALL  =selectedCategories.includes("All")
    const index = selectedCategories.indexOf(item);
    if(item === "All"){
       dispatch(setFiltersState({ ...filters, categories: ["All"]}));
      setSelectedCategories( ["All"]);
      return
    }
    if(item !== "All")
    {
      const selectedItems2 = selectedCategories;
      if(isALL) selectedItems2.splice(selectedCategories.indexOf("All",1))
      // If the item is not in the array, add it
    if (index === -1) {
      
      dispatch(setFiltersState({ ...filters, categories: [...selectedItems2, item]}));
      setSelectedCategories([...selectedItems2, item]);
    } else {
      // If the item is already in the array, remove it
       dispatch(setFiltersState({ ...filters, categories: selectedItems2.filter((_, i) => i !== index)}));
      setSelectedCategories(selectedItems2.filter((_, i) => i !== index));
    }
  }
  }; 

  return (
    <>
      <Grow in>
        <Container maxWidth='xl'>
          <div>
            <Button onClick={() => setShowFilters(!showFilters)}>
              <ExpandCircleDownIcon />
            </Button>
            
          </div>
          {showFilters && (
            <>
            <div>
              <SideFilters/>
            </div>
            <div className=''>
              <div className='allWrapper'>
                {/* end of header */}
                <section className='quiz_section' id='quizeSection'>
                  <div className='container'>
                    <div className='row'>
                      <div className='col-sm-12'>
                        <div className='quiz_content_area'>
                          <h1 className='quiz_title'>Search Items</h1>
                          <div className='row'>
                            { categories.map((item ,i) => (
                              <Category
                                title={item}
                                onClick = {handleCategoryChange}
                                key = {i}
                              //  checklevel1={checklevel1}
                               // setcheck={setcheck}
                              />
                            ))}
                          </div>
                          {/* end of quiz_card_area */}
                        </div>
                        {/* end of quiz_content_area */}
                      </div>
                      {/* end of col12 */}
                    </div>
                    {/* end of row */}
                  </div>
                  {/* end of container */}
                </section>
                {/* end of quiz_section */}
              </div>
              {selectedCategories.length !== 0 && (
                <div className='filter__search'>
                  {countries.map((item , i) => (
                    <>
                      <CountryItem key={i} title={item} onClick={handleCountryChange} />
                    </>
                  ))}
                </div>
              )}
              <div className='list__filter'>
                {selectedItems.length !== 0
                  ? selectedItems.map((item , i) => (
                      <div className='select__list'>
                        <DropDown
                            item={item}
                            onChange={onChange}
                            onNodeToggle={onNodeToggle}
                          />
                      </div>
                    ))
                  : null}
              </div>
                                      <Button onClick={handleSearch}>Show</Button>

            </div>
            </>
                     )}
                     { !showFilters &&
            <Paper className={classes.pagination} elevation={6}>
              <Pagination page={page} />
            </Paper>
}

          <Products filters={filters} />
        </Container>
      </Grow>
    </>
  );
};

export default Warranty;
