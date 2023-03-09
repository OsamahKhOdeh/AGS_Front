import logo from "./logo.svg";
import "./App.css";
import { Container } from "@material-ui/core";
import Home from "./pages/Home/Home";
import ProductForm from "./pages/ProductForm/ProductForm";
import PriceList from "./pages/PriceList/PriceList";
import Table from "./Components/Table/Table";
//import ProformaInvoice from "./pages/ProformaInvoice/ProformaInvoice";
import ProformaInvoice from "./Components/PoformaInvoice/ProformaInvoice";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import CustomerPriceList from "./pages/CustomerPriceList/CustomerPriceList";
import MakiPi from "./pages/MakePi/MakePi";
import PiStepper from "./pages/MakePi/PiStepper";
import Warranty from "./pages/Warranty/Warranty";
import WarrantyCheck from "./pages/Warranty/WarrantyCheck/WarrantyCheck";
import CheckCustomer from "./pages/Invoice/CheckCustomer";
import AdminPage from "./pages/Admin/AdminPage";
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route index path="/" element={<Home />}></Route>
        <Route path="/pricelist" element={<PriceList />}></Route>
        <Route path="/pdf" element={<ProformaInvoice />}></Route>

        <Route path="/addproduct" element={<ProductForm />}></Route>
        <Route path="/makepi" element={<PiStepper />}></Route>
        <Route path="/table" element={<ProformaInvoice />}></Route>
        <Route path="/warranty" element={<Warranty />}></Route>
        <Route path="/admin" element={<AdminPage />}></Route>
        <Route path="/warranty-check" element={<WarrantyCheck />}></Route>
        <Route path="/customer-price-list" element={<CustomerPriceList />}></Route>
        <Route path="/checkCustomer" element={<CheckCustomer />}></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
