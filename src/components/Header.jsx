import { useEffect, useState } from "react";
import { FiMenu, FiUser, FiSearch, FiHeart, FiShoppingCart } from "react-icons/fi";

const Header = ({ wishlistCount, cartCount, wishlistItems, cartItems }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isWishlistOpen, setIsWishlistOpen] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

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
      <div className={`w-full ${isScrolled ? "bg-gray-100/95 backdrop:blur shadow-md py-2" : "bg-gray-100 py-4"}`}>
        <div className="max-w-full mx-auto px-2 sm:px-4 lg:px-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-3 md:gap-6">
            <div className="flex justify-between items-center w-full md:w-auto">
              <a href="/" className="text-2xl font-bold text-pink-600">
                Aromara
              </a>
              <button
                className="md:hidden text-gray-700 hover:text-indigo-600"
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                aria-label="Toggle mobile menu"
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
                <button className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-500 hover:text-indigo-600" aria-label="Search">
                  <FiSearch size={16} />
                </button>
              </div>
            </div>
            <div className="flex items-center justify-end space-x-4 w-full md:w-auto relative">
              {/* Wishlist Button with dropdown */}
              <div className="relative">
                <button
                  className="relative p-2 text-gray-700 hover:text-pink-600"
                  aria-label="Wishlist"
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

                {/* Wishlist dropdown */}
                {isWishlistOpen && (
                  <div className="absolute right-0 mt-2 w-64 bg-white rounded-md shadow-lg p-3 z-50 max-h-64 overflow-auto text-amber-950">
                    <h4 className="font-semibold mb-2">Wishlist Items</h4>
                    {wishlistItems.length === 0 ? (
                      <p className="text-sm text-gray-500">No items in wishlist</p>
                    ) : (
                      <ul>
                        {wishlistItems.map((item) => (
                          <li key={item.id} className="mb-2 border-b border-gray-200 pb-1">
                            <div className="flex items-center space-x-3">
                              <img src={item.image} alt={item.name} className="w-10 h-10 object-cover rounded" />
                              <div>
                                <p className="font-medium">{item.name}</p>
                                <p className="text-sm text-gray-500">
                                  Rs.{(item.price * 133 * (1 - item.discount / 100)).toFixed(0)}
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

              {/* Cart Button with dropdown */}
              <div className="relative">
                <button
                  className="relative p-2 text-gray-700 hover:text-pink-600"
                  aria-label="Cart"
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

                {/* Cart dropdown */}
                {isCartOpen && (
                  <div className="absolute right-0 mt-2 w-64 bg-white rounded-md shadow-lg p-3 z-50 max-h-64 overflow-auto text-amber-950">
                    <h4 className="font-semibold mb-2">Cart Items</h4>
                    {cartItems.length === 0 ? (
                      <p className="text-sm text-gray-500">No items in cart</p>
                    ) : (
                      <ul>
                        {cartItems.map((item) => (
                          <li key={item.id} className="mb-2 border-b border-gray-200 pb-1">
                            <div className="flex items-center space-x-3">
                              <img src={item.image} alt={item.name} className="w-10 h-10 object-cover rounded" />
                              <div>
                                <p className="font-medium">{item.name}</p>
                                <p className="text-sm text-gray-500">
                                  Rs.{(item.price * 133 * (1 - item.discount / 100)).toFixed(0)}
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

              <button className="p-2 text-gray-700 hover:text-pink-600" aria-label="User">
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
                  <a href={item.link} className="hover:text-pink-300 transition-colors">
                    {item.name}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
          {isMobileMenuOpen && (
            <div className="md:hidden mt-2 bg-white rounded-lg shadow-md p-4 space-y-3 text-amber-950 text-center">
              {navItems.map((item) => (
                <a key={item.id} href={item.link} className="block hover:text-amber-600 text-sm font-medium">
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


