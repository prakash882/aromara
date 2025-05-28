import { useEffect, useState } from "react";
import { FiMenu, FiUser, FiSearch, FiHeart, FiShoppingCart } from "react-icons/fi";
import { useNavigate } from "react-router-dom";

const Header = ({ wishlistCount = 0, cartCount = 0, wishlistItems = [], cartItems = [] }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isWishlistOpen, setIsWishlistOpen] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [localCartItems, setLocalCartItems] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const updated = Array.isArray(cartItems)
      ? cartItems.map((item) => ({
          ...item,
          quantity: item.quantity || 1,
        }))
      : [];
    setLocalCartItems(updated);
  }, [cartItems]);

  const handleQuantityChange = (id, delta) => {
  const updated = localCartItems
    .map((item) =>
      item.id === id
        ? { ...item, quantity: item.quantity + delta }
        : item
    )
    .filter((item) => item.quantity > 0); // remove items with quantity 0
  setLocalCartItems(updated);
};


  const calculateItemTotal = (item) => {
    return (item.quantity * item.price * 133 * (1 - item.discount / 100)).toFixed(0);
  };

  const calculateGrandTotal = () => {
    return localCartItems
      .reduce(
        (sum, item) => sum + item.quantity * item.price * 133 * (1 - item.discount / 100),
        0
      )
      .toFixed(0);
  };

  const handleCheckout = () => {
    if (localCartItems.length === 0) {
      alert("Your cart is empty! Please add items to proceed.");
      navigate('/products');
      return;
    }
    navigate('/checkout', { state: { cartItems: localCartItems } });
    setIsCartOpen(false);
  };

  const navItems = [
    { id: 1, name: "Home", link: "#home" },
    { id: 2, name: "Products", link: "#products" },
    { id: 3, name: "Categories", link: "#categories" },
    { id: 4, name: "Offers", link: "#offers" },
    { id: 5, name: "About", link: "#about" },
    { id: 6, name: "Contact", link: "#contact" },
  ];

  return (
    <header className="sticky top-0 z-50 transition-all duration-300">
      <div
        className={`w-full ${
          isScrolled ? "bg-gray-100/95 backdrop-blur shadow-md py-2" : "bg-gray-100 py-4"
        }`}
      >
        <div className="mx-auto px-2 sm:px-4 lg:px-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-3 md:gap-6">
            <div className="flex justify-between items-center w-full md:w-auto">
              <a href="/" className="text-2xl font-bold text-pink-600">
                Aromara
              </a>
              <button
                className="md:hidden text-gray-700 hover:text-indigo-600"
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                aria-label="Toggle mobile menu"
                aria-expanded={isMobileMenuOpen}
              >
                <FiMenu size={24} />
              </button>
            </div>

            <div className="w-full md:flex-1 max-w-sm">
              <div className="relative w-full">
                <input
                  type="text"
                  placeholder="Search..."
                  className="w-full px-3 py-2 text-xs border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
                <button
                  className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-500 hover:text-indigo-600"
                  aria-label="Search"
                >
                  <FiSearch size={18} />
                </button>
              </div>
            </div>

            <div className="flex items-center justify-end space-x-4 w-full md:w-auto relative">
              <div className="relative">
                <button
                  className="relative p-2 text-gray-700 hover:text-pink-600"
                  aria-label="Wishlist"
                  aria-expanded={isWishlistOpen}
                  onClick={() => {
                    setIsWishlistOpen(!isWishlistOpen);
                    setIsCartOpen(false);
                  }}
                >
                  <FiHeart size={20} />
                  {wishlistCount > 0 && (
                    <span className="absolute -top-1 -right-1 bg-pink-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                      {wishlistCount}
                    </span>
                  )}
                </button>
                {isWishlistOpen && (
                  <div className="absolute right-0 mt-2 w-64 bg-white rounded-md shadow-lg p-3 z-50 max-h-64 overflow-auto text-amber-950">
                    <h4 className="font-semibold mb-2">Wishlist</h4>
                    {Array.isArray(wishlistItems) && wishlistItems.length === 0 ? (
                      <p className="text-sm text-gray-500">No items in wishlist</p>
                    ) : (
                      <ul>
                        {Array.isArray(wishlistItems) &&
                          wishlistItems.map((item) => (
                            <li key={item.id} className="mb-2 border-b border-gray-200 pb-1">
                              <div className="flex items-center space-x-3">
                                <img
                                  src={item.image}
                                  alt={item.name}
                                  className="w-10 h-10 object-cover rounded"
                                />
                                <div>
                                  <p className="font-medium">{item.name}</p>
                                  <p className="text-sm text-gray-500">
                                    Rs.
                                    {(
                                      item.price * 133 * (1 - item.discount / 100)
                                    ).toFixed(0)}
                                  </p>
                                </div>
                              </div>
                            </li>
                          ))}
                      </ul>
                    )}
                  </div>
                )}
              </div>

              <div className="relative">
                <button
                  className="relative p-2 text-gray-700 hover:text-pink-600"
                  aria-label="Cart"
                  aria-expanded={isCartOpen}
                  onClick={() => {
                    setIsCartOpen(!isCartOpen);
                    setIsWishlistOpen(false);
                  }}
                >
                  <FiShoppingCart size={20} />
                  {cartCount > 0 && (
                    <span className="absolute -top-1 -right-1 bg-pink-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                      {cartCount}
                    </span>
                  )}
                </button>

                {isCartOpen && (
                  <div className="absolute right-0 mt-2 w-72 bg-white rounded-md shadow-lg p-3 z-50 max-h-80 overflow-auto text-amber-950">
                    <h4 className="font-semibold mb-2">Cart</h4>
                    {localCartItems.length === 0 ? (
                      <p className="text-sm text-gray-500">No items in cart</p>
                    ) : (
                      <>
                        <ul>
                          {localCartItems.map((item) => (
                            <li key={item.id} className="mb-3 border-b border-gray-200 pb-2">
                              <div className="flex items-center space-x-3">
                                <img
                                  src={item.image}
                                  alt={item.name}
                                  className="w-10 h-10 object-cover rounded"
                                />
                                <div className="flex-1">
                                  <p className="font-medium">{item.name}</p>
                                  <p className="text-sm text-gray-500">
                                    Rs.
                                    {(
                                      item.price * 133 * (1 - item.discount / 100)
                                    ).toFixed(0)}{" "}
                                    × {item.quantity}
                                  </p>
                                  <p className="text-sm font-semibold">
                                    Total: Rs.{calculateItemTotal(item)}
                                  </p>
                                  <div className="flex items-center mt-1 space-x-2">
                                    <button
                                      className="px-2 py-1 text-sm bg-gray-200 rounded hover:bg-gray-300"
                                      onClick={() => handleQuantityChange(item.id, -1)}
                                    >
                                      -
                                    </button>
                                    <span>{item.quantity}</span>
                                    <button
                                      className="px-2 py-1 text-sm bg-gray-200 rounded hover:bg-gray-300"
                                      onClick={() => handleQuantityChange(item.id, 1)}
                                    >
                                      +
                                    </button>
                                  </div>
                                </div>
                              </div>
                            </li>
                          ))}
                        </ul>
                        <div className="mt-3 pt-2 border-t border-gray-200">
                          <p className="font-semibold mb-2">
                            Grand Total: Rs.{calculateGrandTotal()}
                          </p>
                          <button
                            onClick={handleCheckout}
                            className="w-full bg-pink-600 text-white py-2 rounded hover:bg-pink-700 transition"
                          >
                            Checkout
                          </button>
                        </div>
                      </>
                    )}
                  </div>
                )}
              </div>

              <button
                className="p-2 text-gray-700 hover:text-pink-600"
                aria-label="User profile"
              >
                <FiUser size={20} />
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-pink-950">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <nav className="hidden md:flex justify-center py-3">
            <ul className="flex flex-wrap gap-x-6 text-sm font-medium text-white">
              {navItems.map((item) => (
                <li key={item.id}>
                  <a
                    href={item.link}
                    className="hover:text-pink-300 transition-colors"
                    aria-label={`Navigate to ${item.name}`}
                  >
                    {item.name}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
          {isMobileMenuOpen && (
            <div className="md:hidden mt-2 bg-white rounded-lg shadow-md p-4 space-y-3 text-amber-950 text-center">
              {navItems.map((item) => (
                <a
                  key={item.id}
                  href={item.link}
                  className="block hover:text-amber-600 text-sm font-medium"
                  aria-label={`Navigate to ${item.name}`}
                >
                  {item.name}
                </a>
              ))}
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;