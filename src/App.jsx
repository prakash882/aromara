import { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import About from "./components/About";
import Categories from "./components/Categories";
import Contact from "./components/Contact";
import Footer from "./components/Footer";
import Header from "./components/Header";
import Hero from "./components/Hero";
import Offers from "./components/Offers";
import Products from "./components/Products";
import BuyNow from "./components/BuyNow";
import CheckOut from "./components/CheckOut";

import product from './assets/product.png';
import product1 from './assets/product1.png';
import product2 from './assets/product2.png';
import product3 from './assets/product3.png';
import product4 from './assets/product4.png';
import product5 from './assets/product5.png';
import product6 from './assets/product6.png';
import product7 from './assets/product7.png';

const App = () => {
  const [wishlistItems, setWishlistItems] = useState(new Set());
  const [cartItems, setCartItems] = useState(new Set());

  const products = [
    { id: 1, name: "Floral", price: 49.99, rating: 4.5, image: product, discount: 20 },
    { id: 2, name: "Oriental", price: 59.99, rating: 4.6, image: product1, discount: 15 },
    { id: 3, name: "Woody", price: 59.99, rating: 4.7, image: product2, discount: 10 },
    { id: 4, name: "Fruity", price: 69.99, rating: 4.8, image: product3, discount: 0 },
    { id: 5, name: "Citrus", price: 69.99, rating: 4.8, image: product4, discount: 0 },
    { id: 6, name: "Aromatic", price: 49.99, rating: 4.4, image: product5, discount: 10 },
    { id: 7, name: "Chypre", price: 59.99, rating: 4.6, image: product6, discount: 20 },
    { id: 8, name: "Leathery", price: 59.99, rating: 4.7, image: product7, discount: 10 },
  ];

  const wishlistProducts = products.filter((p) => wishlistItems.has(p.id));
  const cartProducts = products.filter((p) => cartItems.has(p.id));

  return (
    <Router>
      <Header
        wishlistCount={wishlistItems.size}
        cartCount={cartItems.size}
        wishlistItems={wishlistProducts}
        cartItems={cartProducts}
      />

      <Routes>
        <Route
          path="/"
          element={
            <>
              <Hero />
              <Products
                products={products}
                wishlistItems={wishlistItems}
                setWishlistItems={setWishlistItems}
                cartItems={cartItems}
                setCartItems={setCartItems}
              />
              <Categories />
              <Offers />
              <About />
              <Contact />
              <Footer />
            </>
          }
        />

        <Route
          path="/buy/:id"
          element={<BuyNow />}
        />

        <Route
          path="/checkout"
          element={<CheckOut />}
        />

        <Route
          path="/products"
          element={
            <>
              <Products
                products={products}
                wishlistItems={wishlistItems}
                setWishlistItems={setWishlistItems}
                cartItems={cartItems}
                setCartItems={setCartItems}
              />
              <Footer />
            </>
          }
        />
      </Routes>
    </Router>
  );
};

export default App;