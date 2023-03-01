import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Container, Grow, Paper } from "@material-ui/core";
import { Button, ToggleButton } from "@mui/material";
import Pagination from "./Pagination";
import ExpandCircleDownIcon from "@mui/icons-material/ExpandCircleDown";
import DropdownTreeSelect from "react-dropdown-tree-select";
import "react-dropdown-tree-select/dist/styles.css";
import { useDispatch, useSelector } from "react-redux";
import { china, india, south_korea, oman, veitnam, thailand } from "./data";
import useStyles from "./styles";
import Products from "./Products/Products";
import {
  changeCurrency,
  changeLocation,
  setFiltersState,
  setUsdToAedRate,
} from "../../store/filtersSlice";

import "./style/warranty.css";
import Category from "./Category";
import CountryItem from "./Country";
import { categories, countries } from "../../data";
import { getFilteredProducts } from "../../actions/products";
import { useEffect } from "react";
import SideFilters from "./SideFilters/SideFilters";

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
    dispatch(
      setFiltersState({
        ...filters,
        companies: companies,
        brands: brands,
        capacities: capacities,
      })
    );
    // setFilters({ ...filters, companies: companies, brands: brands, capacities: capacities });

    choosenCompanies = [];
    choosenBrands = [];
  };

  const [chinaTree, setChinaTree] = useState(china);
  //Osama///////////
  const query = useQuery();
  const page = query.get("page") || 1;
  ///////////////////////////
  const dispatch = useDispatch();
  const classes = useStyles();
  const selectedProducts = useSelector((state) => state.products);
  const shows = useSelector((state) => state.show.showPrice);
  const navigate = useNavigate();
  const filters = useSelector((state) => state.filters.filters);

  ///////////////////////////////////////////////////////////////////////
  let arrayOfSelectedNodes = [];

  let allCompanies = [];
  let choosenCompanies = [];

  let choosenBrands = [];
  let choosenCapacities = [];

  const onChange = (currentNode, selectedNodes) => {
    console.log("im the best in the world");
    choosenCompanies = [];
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
    if (showFilters) {
      dispatch(getFilteredProducts(filters));
    }
  }, [dispatch, filters, showFilters]);

  const handleShowFilters = () => {};

  const [checklevel1, setcheck] = useState([]);

  const [checklevel2, setcheck2] = useState([]);

  // console.log(checklevel1);

  const [selectedItems, setSelectedItems] = useState([]);

  const [selectedCategories, setSelectedCategories] = useState([]);

  const handleCountryChange = (item) => {
    const isALL = selectedItems.includes("All");
    const index = selectedItems.indexOf(item);
    if (item === "All") {
      dispatch(setFiltersState({ ...filters, countries: ["All"] }));
      setSelectedItems(["All"]);
      return;
    }
    if (item !== "All") {
      const selectedItems2 = selectedItems;
      if (isALL) selectedItems2.splice(selectedItems.indexOf("All", 1));
      // If the item is not in the array, add it
      if (index === -1) {
        dispatch(
          setFiltersState({ ...filters, countries: [...selectedItems2, item] })
        );
        setSelectedItems([...selectedItems2, item]);
      } else {
        // If the item is already in the array, remove it
        dispatch(
          setFiltersState({
            ...filters,
            countries: selectedItems2.filter((_, i) => i !== index),
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
      dispatch(setFiltersState({ ...filters, categories: ["All"] }));
      setSelectedCategories(["All"]);
      return;
    }
    if (item !== "All") {
      const selectedItems2 = selectedCategories;
      if (isALL) selectedItems2.splice(selectedCategories.indexOf("All", 1));
      // If the item is not in the array, add it
      if (index === -1) {
        dispatch(
          setFiltersState({ ...filters, categories: [...selectedItems2, item] })
        );
        setSelectedCategories([...selectedItems2, item]);
      } else {
        // If the item is already in the array, remove it
        dispatch(
          setFiltersState({
            ...filters,
            categories: selectedItems2.filter((_, i) => i !== index),
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
            <Button onClick={() => setShowFilters(!showFilters)}>
              <ExpandCircleDownIcon />
            </Button>
          </div>

          {showFilters && (
            <>
              <div className='search__list'>
                {/* end of header */}
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
                  {/* end of quiz_card_area */}

                  {/* end of quiz_content_area */}

                  {/* end of col12 */}

                  {/* end of row */}

                  {/* end of container */}

                  {/* end of quiz_section */}

                  {selectedCategories.length !== 0 && (
                    <div className='filter__search'>
                      {countries.map((item, i) => (
                        <>
                          <CountryItem
                            key={i}
                            title={item.label}
                            img={item.img}
                            onClick={handleCountryChange}
                          />
                        </>
                      ))}
                    </div>
                  )}
                  <div className='list__filter'>
                    {selectedItems.length !== 0
                      ? selectedItems.map((item, i) => (
                          <div className='select__list' key={i}>
                            {item === "China" && (
                              <DropdownTreeSelect
                                key={i}
                                texts={{
                                  placeholder: JSON.stringify(String(item)),
                                }}
                                data={chinaTree}
                                onNodeToggle={onNodeToggle}
                                className='mdl-demo'
                              />
                            )}
                            {item === "India" && (
                              <DropdownTreeSelect
                                key={i}
                                texts={{
                                  placeholder: JSON.stringify(String(item)),
                                }}
                                data={india}
                                onNodeToggle={onNodeToggle}
                                className='mdl-demo'
                              />
                            )}
                            {item === "South korea" && (
                              <DropdownTreeSelect
                                key={i}
                                texts={{
                                  placeholder: JSON.stringify(String(item)),
                                }}
                                data={south_korea}
                                onNodeToggle={onNodeToggle}
                                className='mdl-demo'
                              />
                            )}
                            {item === "Veitnam" && (
                              <DropdownTreeSelect
                                key={i}
                                texts={{
                                  placeholder: JSON.stringify(String(item)),
                                }}
                                data={veitnam}
                                onNodeToggle={onNodeToggle}
                                className='mdl-demo'
                              />
                            )}
                            {item === "Thailand" && (
                              <DropdownTreeSelect
                                key={i}
                                texts={{
                                  placeholder: JSON.stringify(String(item)),
                                }}
                                data={thailand}
                                onChange={onChange}
                                onNodeToggle={onNodeToggle}
                                className='mdl-demo'
                              />
                            )}
                            {item === "Oman" && (
                              <DropdownTreeSelect
                                key={i}
                                texts={{
                                  placeholder: JSON.stringify(String(item)),
                                }}
                                data={oman}
                                onChange={onChange}
                                onNodeToggle={onNodeToggle}
                                className='mdl-demo'
                              />
                            )}
                          </div>
                        ))
                      : null}
                  </div>
                </div>
                {/* <div className='right__filters'>
                  <SideFilters />
                </div> */}
              </div>
            </>
          )}
          {!showFilters && (
            <Paper className={classes.pagination} elevation={6}>
              <Pagination page={page} />
            </Paper>
          )}

          <div className='pagination'>
            <div className='prec__pag disable'>
              <img src='/images/left.png' />
            </div>
            <div className='number active'>1</div>
            <div className='number'>2</div>
            <div className='number'>3</div>
            <div className='number'>...</div>
            <div className='number'>5</div>
            <div className='number'>6</div>
            <div className='next__pag'>
              <img src='/images/right.png' />
            </div>
          </div>

          <Products filters={filters} />
        </Container>
      </Grow>
    </>
  );
};

export default Warranty;
