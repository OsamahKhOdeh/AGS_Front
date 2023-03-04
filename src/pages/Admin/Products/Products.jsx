import React, { useEffect, useState } from "react";
import {
  Grid,
  CircularProgress,
  Container,
  Typography,
} from "@material-ui/core";
import { AiFillCloseCircle, AiTwotoneDelete } from "react-icons/ai";
import Product from "./Product/Product";
import useStyles from "./styles";
import { staticProducts } from "../../../data";
import { useDispatch, useSelector } from "react-redux";
import {
  addProducttocart,
  deletProductformCart,
  deleteAll,
} from "../../../store/cartSlice";
import { useNavigate } from "react-router-dom";
import { FaCarBattery } from "react-icons/fa";
import FilteredPagination from "../FilteredPagination";
import ReactPaginate from "react-paginate";
const Products = () => {

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const products = useSelector((state) => state.products.products);

  const isLoading = useSelector((state) => state.show.isLoading);
  const cart = useSelector((state) => state.cart.cart);

  const spliceCart = (item) => {
     (deletProductformCart(item));
  };

  const deleteALl = () => {
    dispatch(deleteAll());
  };

  // const navigate = () => {
  //   navigate("/table");
  // };

  const cartLength = useSelector((state) => state.cart.cart);


  

  const closeside = () => {
    document.querySelector(".sidebar").style.display = "none";
    document.querySelector(".modal").style.display = "none";
  };

  const showList = () => {
    document.querySelector(".sidebar").style.display = "block";
    document.querySelector(".modal").style.display = "block";
  };

  const classes = useStyles();
  let productsCount = products.length;




//Pagination//////////////////////////////

const showFilters = useSelector((state)=>state.show.showFilters)

const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [displayData, setDisplayData] = useState([]);
useEffect(() => {
    const totalPages = Math.ceil(products.length / 12);
    setTotalPages(totalPages);
    const startIndex = (currentPage - 1) * 12;
    const endIndex = startIndex + 12;
    const displayData = products.slice(startIndex, endIndex);
    setDisplayData(displayData);
  }, [currentPage, products]);

  const handlePrevClick = () => {
    setCurrentPage((currentPage) => Math.max(currentPage - 1, 1));
  };

  const handleNextClick = () => {
    setCurrentPage((currentPage) => Math.min(currentPage + 1, totalPages));
  };





//End Pagination ////////////////

function Items({ currentItems }) {
  return (
    <>
      {
      currentItems?.map((product, index) => (
            <Grid item key={product._id} xs={12} sm={12} md={6} lg={3}>
              <Product product={product} index={index} />
            </Grid>
          )) 
        }
    </>
  );
}function PaginatedItems({ itemsPerPage }) {
  const [itemOffset, setItemOffset] = useState(0);
  const endOffset = itemOffset + itemsPerPage;
  console.log(`Loading items from ${itemOffset} to ${endOffset}`);
  const currentItems = products.slice(itemOffset, endOffset);
  const pageCount = Math.ceil(products.length / itemsPerPage);
  const handlePageClick = (event) => {
    const newOffset = (event.selected * itemsPerPage) % products.length;
    console.log(
      `User requested page number ${event.selected}, which is offset ${newOffset}`
    );
    setItemOffset(newOffset);
  };

  return (
    <>
      <Items currentItems={currentItems} />
      <ReactPaginate
        nextLabel="next >"
        onPageChange={handlePageClick}
        pageRangeDisplayed={3}
        marginPagesDisplayed={2}
        pageCount={pageCount}
        previousLabel="< previous"
        pageClassName="page-item"
        pageLinkClassName="page-link"
        previousClassName="page-item"
        previousLinkClassName="page-link"
        nextClassName="page-item"
        nextLinkClassName="page-link"
        breakLabel="..."
        breakClassName="page-item"
        breakLinkClassName="page-link"
        containerClassName="pagination"
        activeClassName="active"
        renderOnZeroPageCount={null}
      />
    </>
  );
}









//New Pagination ////////////////




  console.log((totalPages));



  return isLoading ? (
    <Container
      alignitems='center'
      style={{ alignItems: "center", width: "100%" }}>
      <CircularProgress
        style={{ alignSelf: "auto", marginLeft: "50%", marginTop: "10%" }}
      />
    </Container>
  ) : (
    <div className="app__container">  
     
        

      {showFilters && 


<div className="search__">
  
  {products.length < 1 && !isLoading
          ? "No products Found" 
          : <p> There are <b>  {`${productsCount}`} </b> products found </p>}
 </div>

     /* <div>
      
      <button onClick={handlePrevClick} disabled={currentPage === 1}>
        Prev
      </button>
      <button onClick={handleNextClick} disabled={currentPage === totalPages}>
        Next
      </button>
    </div>
*/
      }

      <Grid
        container
        className={classes.mainContainer}
        alignitems='stretch'
        spacing={3}>
        {products ? 
        
        showFilters ?
        (

          <PaginatedItems itemsPerPage={16} />
          
        )

:       
 (products?.map((product, index) => (
            <Grid item key={product._id} xs={12} sm={12} md={6} lg={3}>
              <Product product={product} index={index} />
            </Grid>
          ))) 
          
        : (
          <h1>Loading</h1>
        )}
      </Grid>

      <div className='battery__bottom' onClick={showList}>
        <div className='bottom'>
          <img src='/images/battery.png' width={80} height={80} />
          <div className='battery__coutn'>{cart.length}</div>
        </div>
      </div>

      {cartLength.length > 0 ? (  
        <div className='modal'>
          <div className='sidebar'>
            <div className='list__'>
              <span>List of Items : {cart.length} </span>
              <div className='close__' onClick={() => closeside()}>
                <AiFillCloseCircle color='' size={40} />
              </div>
            </div>
            <ul className='list__ofItems'>
              {cart.map((item, index) => (
                <div className='card__item' key={index}>
                  <div>{item.code}</div>
                  <div
                    style={{ cursor: "pointer" }}
                    onClick={() => {
                      spliceCart(item);
                    }}>
                    <AiTwotoneDelete color='#E34A44' size={20} />
                  </div>
                </div>
              ))}
            </ul>

            <div className='sidebar__buttons'>
              <div
                className='next'
                onClick={() => {
                  navigate("/checkCustomer");
                }}>
                <span> Next </span>
              </div>
              <div className='delete' onClick={() => deleteALl()}>
                <span> Delete all </span>
              </div>
            </div>
          </div>
        </div>
      ) : null}
    </div>
  );
};

export default Products;
