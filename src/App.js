import logo from "./logo.svg";
import "./App.css";
import { Container } from "@material-ui/core";
import Home from "./pages/Home/Home";
import ProductForm from "./pages/ProductForm/ProductForm";
import PriceList from "./pages/PriceList/PriceList";

function App() {
  return (
    <Container maxWidth="xl">
      <ProductForm />
    </Container>
  );
}

export default App;
