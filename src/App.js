import logo from "./logo.svg";
import "./App.css";
import { Container } from "@material-ui/core";
import Home from "./pages/Home/Home";
import ProductForm from "./pages/ProductForm/ProductForm";
import PriceList from "./pages/PriceList/PriceList";
import Table from "./Components/Table/Table";
import ProformaInvoice from "./pages/ProformaInvoice/ProformaInvoice";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import CustomerPriceList from "./pages/CustomerPriceList/CustomerPriceList";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route index path="/" element={<PriceList />}></Route>
        <Route path="/table" element={<ProformaInvoice />}></Route>
        <Route path="/customer-price-list" element={<CustomerPriceList />}></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
