import React, { useState } from "react";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";
import { Container } from "@material-ui/core";
import { ToggleButton } from "@mui/material";
import useStyles from "./styles";
import { categories, countries } from "../../data";
//import DropDown from "./DropDown";
import Select from "react-select";

const PriceList = () => {
  const allfruits = [
    { label: "Mango", value: "mg" },
    { label: "Guava", value: "gv" },
    { label: "Peach", value: "pc" },
    { label: "Apple", value: "ap" },
  ];

  const [fruits, setFruits] = useState(null);
  const handleChange = (value) => {
    setFruits(value);
  };
  const classes = useStyles();
  const [choosenCategories, setCategories] = useState(["all"]);
  const [choosenCountries, setCountries] = useState(["all"]);

  console.log(choosenCategories);
  const handleCategoryChange = (e) => {
    let cat = e.target.value;
    console.log(cat);
    let cats = [...choosenCategories];

    if (cat === "all" || choosenCategories.includes("all")) {
      cats.splice(cats.indexOf("all"), 1);
    }
    if (!choosenCategories.includes(cat)) {
      cats.push(cat);
    } else {
      cats.splice(cats.indexOf(cat), 1);
    }

    setCategories(cats);
    // console.log(choosenCategories);
    // console.log(categories);
  };
  const handleCountryChange = (e) => {
    let count = e.target.value;
    console.log(count);
    let counts = [...choosenCountries];
    if (count === "all") {
      setCountries(["all"]);
      return;
    }
    if (!choosenCountries.includes(count)) {
      counts.push(count);
    } else {
      counts.splice(counts.indexOf(count), 1);
    }

    setCountries(counts);
    //  console.log(choosenCountries);
    // console.log(categories);
  };
  return (
    <Container>
      <ToggleButtonGroup fullWidth value={choosenCategories} onChange={handleCategoryChange} aria-label="text formatting">
        {categories.map((cat, i) => {
          return (
            <ToggleButton key={i} value={cat.toLocaleLowerCase()} aria-label={cat}>
              {cat}
            </ToggleButton>
          );
        })}
      </ToggleButtonGroup>
      <ToggleButtonGroup fullWidth value={choosenCountries} onChange={handleCountryChange} aria-label="text formatting">
        {countries.map((country, i) => {
          return (
            <ToggleButton key={i} value={country.toLocaleLowerCase()} aria-label={country}>
              {country}
            </ToggleButton>
          );
        })}
      </ToggleButtonGroup>
      <div>
        <Select defaultValue={[fruits[2], fruits[3]]} isMulti name="fruits" options={allfruits} className="basic-multi-select" classNamePrefix="select" />
        {fruits && <p>{JSON.stringify(fruits)}</p>}
      </div>
    </Container>
  );
};

export default PriceList;
