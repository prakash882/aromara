import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Products from './Products';
import Footer from './Footer';
import product from '../assets/product.png';
import product1 from '../assets/product1.png';
import product2 from '../assets/product2.png';
import product3 from '../assets/product3.png';
import product4 from '../assets/product4.png';
import product5 from '../assets/product5.png';
import product6 from '../assets/product6.png';
import product7 from '../assets/product7.png';
import { FiStar } from 'react-icons/fi';

const products = [
  { id: 1, name: 'Floral', price: 49.99, rating: 4.5, image: product, discount: 20, description: 'Lorem ipsum dolor sit amet...' },
  { id: 2, name: 'Oriental', price: 59.99, rating: 4.6, image: product1, discount: 15, description: 'Lorem ipsum dolor sit amet...' },
  { id: 3, name: 'Woody', price: 59.99, rating: 4.7, image: product2, discount: 10, description: 'Lorem ipsum dolor sit amet...' },
  { id: 4, name: 'Fruity', price: 69.99, rating: 4.8, image: product3, discount: 0, description: 'Lorem ipsum dolor sit amet...' },
  { id: 5, name: 'Citrus', price: 69.99, rating: 4.8, image: product4, discount: 0, description: 'Lorem ipsum dolor sit amet...' },
  { id: 6, name: 'Aromatic', price: 49.99, rating: 4.4, image: product5, discount: 10, description: 'Lorem ipsum dolor sit amet...' },
  { id: 7, name: 'Chypre', price: 59.99, rating: 4.6, image: product6, discount: 20, description: 'Lorem ipsum dolor sit amet...' },
  { id: 8, name: 'Leathery', price: 59.99, rating: 4.7, image: product7, discount: 10, description: 'Lorem ipsum dolor sit amet...' },
];

const BuyNow = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const product = products.find((p) => p.id === parseInt(id));

  const [wishlistItems, setWishlistItems] = useState(new Set());
  const [cartItems, setCartItems] = useState(new Set());
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [id]);

  if (!product) return <div className="p-8 text-center text-red-500">Product not found</div>;

  const discountedPrice = (product.price * 133 * (1 - product.discount / 100)).toFixed(0);
  const originalPrice = (product.price * 133).toFixed(0);

  const relatedProducts = products.filter((p) => p.id !== product.id);

  const increaseQuantity = () => setQuantity((prev) => prev + 1);
  const decreaseQuantity = () => setQuantity((prev) => (prev > 1 ? prev - 1 : 1));

  return (
    <>
      <div className="h-screen w-full bg-gray-100 flex items-center justify-center p-0">
        <div className="bg-white w-full h-screen flex flex-col lg:flex-row overflow-hidden">
          <div className="lg:w-1/2 w-full h-full">
            <img
              src={product.image}
              alt={product.name}
              className="w-3/4 h-auto mx-auto my-12 object-contain rounded-2xl shadow-lg"
            />
          </div>
          <div className="lg:w-1/2 w-full p-12 flex flex-col justify-center">
            <h2 className="text-5xl font-bold text-pink-900 mb-6">{product.name}</h2>

            <div className="flex items-center mb-4">
              {[...Array(5)].map((_, i) => (
                <FiStar
                  key={i}
                  size={28}
                  className={i < Math.floor(product.rating) ? 'text-yellow-400 fill-current' : 'text-gray-300'}
                />
              ))}
              <span className="text-lg text-gray-500 ml-3">({product.rating})</span>
            </div>

            <div className="mb-6">
              <span className="text-4xl font-bold text-pink-600">Rs.{discountedPrice}</span>
              {product.discount > 0 && (
                <span className="text-2xl text-gray-500 line-through ml-4">Rs.{originalPrice}</span>
              )}
            </div>

            <p className="text-gray-700 mb-6 text-xl">{product.description}</p>

            <div className="flex items-center mb-6 space-x-4">
              <span className="text-xl font-semibold">Quantity:</span>
              <div className="flex items-center border border-gray-300 rounded-md">
                <button
                  onClick={decreaseQuantity}
                  className="px-3 py-1 text-xl font-bold text-pink-700 hover:text-pink-900"
                >
                  -
                </button>
                <span className="px-4 py-1 text-lg">{quantity}</span>
                <button
                  onClick={increaseQuantity}
                  className="px-3 py-1 text-xl font-bold text-pink-700 hover:text-pink-900"
                >
                  +
                </button>
              </div>
            </div>

            <div className="flex space-x-6">
              <button
                onClick={() => navigate('/checkout', { state: { product, quantity } })}
                className="bg-pink-700 hover:bg-pink-900 text-white px-8 py-3 rounded-md font-semibold text-lg"
              >
                Buy
              </button>
              <button
                onClick={() => navigate(-1)}
                className="text-gray-600 hover:underline self-center text-lg"
              >
                Go Back
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="my-12">
        <h2 className="text-3xl font-bold text-pink-900 text-center mb-6">You May Also Like</h2>
        <Products
          products={relatedProducts}
          wishlistItems={wishlistItems}
          setWishlistItems={setWishlistItems}
          cartItems={cartItems}
          setCartItems={setCartItems}
        />
      </div>

      <Footer />
    </>
  );
};

export default BuyNow;
