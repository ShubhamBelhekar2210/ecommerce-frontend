import { Routes, Route } from "react-router-dom";

import ProductList from "./components/ProductList";
import AddProduct from "./components/AddProduct";
import Navbar from "./components/Navbar";
import Cart from "./components/Cart";
import Checkout from "./components/Checkout";
import Receipt from "./components/Receipt";
import { ToastContainer } from "react-toastify";
import { useState } from "react";
import 'react-toastify/dist/ReactToastify.css';

function App() {

  const [selectedProduct, setSelectedProduct] = useState(null);

  return (

    <div>
      <Navbar />
      <ToastContainer />
      <Routes>

        <Route path="/" element={<ProductList
          setSelectedProduct={setSelectedProduct}
        />} />

        <Route path="/add-product" element={<AddProduct
          selectedProduct={selectedProduct}
          clearEdit={() => setSelectedProduct(null)}
        />} />

        <Route path="/cart" element={<Cart />} />

        <Route path="/checkout" element={<Checkout />} />

        <Route path="/receipt" element={<Receipt />} />

      </Routes>

    </div>

  );
}

export default App;