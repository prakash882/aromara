import React, { useEffect, useState } from 'react'
import product from '../assets/product.png'
import product1 from '../assets/product1.png'
import product2 from '../assets/product2.png'
import product3 from '../assets/product3.png'
import product4 from '../assets/product4.png'
import product5 from '../assets/product5.png'
import product6 from '../assets/product6.png'
import product7 from '../assets/product7.png'
import { FiChevronLeft, FiChevronRight, FiHeart, FiShoppingCart, FiStar } from 'react-icons/fi'

const Products = () => {
    const [ currentSlide, setCurrentSlide] = useState(0);
    const [ productsPerPage, setProductsPerPage ] = useState(4);

    const products = [
        {id: 1, name:'Floral', price: 49.99, rating: 4.5, image: product, discount:20},
        {id: 1, name:'Orirental', price: 59.99, rating: 4.6, image: product1, discount:15},
        {id: 1, name:'Woody', price: 59.99, rating: 4.7, image: product2, discount:10},
        {id: 1, name:'Fruity', price: 69.99, rating: 4.8, image: product3, discount:0},
        {id: 1, name:'Citrus', price: 69.99, rating: 4.8, image: product4, discount:0},
        {id: 1, name:'Aromatic', price: 49.99, rating: 4.4, image: product5, discount:10},
        {id: 1, name:'Chypre', price: 59.99, rating: 4.6, image: product6, discount:20},
        {id: 1, name:'Leathery', price: 59.99, rating: 4.7, image: product7, discount:10},
    ];
    useEffect(() => {
        const handleResize = () => {
            if(window.innerWidth < 640){
                setProductsPerPage(1);
            }else if (window.innerWidth < 768){
                setProductsPerPage(2);
            }else if (window.innerWidth < 1024){
                setProductsPerPage(3);
            }else {
                setProductsPerPage(4);
            }
        };
        handleResize();
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    const totalSlides = Math.ceil(products.length / productsPerPage);
    
    const nextSlide = () => {
        setCurrentSlide((prev) => (prev === totalSlides - 1 ? 0 : prev + 1));
    };
    const prevSlide = () => {
        setCurrentSlide((prev) => (prev === 0? totalSlides -1 : prev -1));
    };

    const visibleProducts = products.slice(
        currentSlide * productsPerPage,
        (currentSlide + 1) * productsPerPage
    );


  return (
    <section id='products' className='py-12 scroll-mt-20 bg-gray-50'>
        <div className='container mx-auto px-4'>
            <div className='flex justify-between items-center mb-8'>
                <h2 className='md:text-3xl text-2xl font-bold text-amber-900'>Featured Products</h2>
                <div className='flex space-x-4'>
                    <button
                    onClick={prevSlide}
                    className='p-2 rounded-full bg-white shadow-md hover:bg-pink-100 text-pink-600 transition-colors'
                    aria-label='Previous slide'>
                        <FiChevronLeft size = {24} />
                    </button>
                    <button
                    onClick={nextSlide}
                    className='p-2 rounded-full bg-white shadow-md hover:bg-pink-100 text-pink-600 transition-colors'
                    aria-label='Next slide'>
                        <FiChevronRight size = {24} />
                    </button>
                </div>
            </div>
            <div className='realtive overflow-hidden'>
                <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6'>
                    {
                        visibleProducts.map((product) => (
                            <div key={product.id}
                            className='bg-white rounded-lg shadow-md overflow-hidden transition-all duration-300 hover:scale-105'>
                                <div className='relative'>
                                    <img src={product.image} alt={product.name} 
                                    className='w-full h-64 object-cover'/>
                                    {
                                        product.discount > 0 && (
                                            <span className='absolute top-3 right-3 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded-full'>
                                                -{product.discount}%
                                            </span>
                                        )
                                    }
                                    <button className='absolute top-3 left-3 p-2 bg-white rounded-full shadow-md hover:bg-pink-100 text-gray-700'>
                                        <FiHeart size={18} />
                                    </button>
                                </div>
                                <div className='p-4'>
                                    <div className='flex items-center mb-2'>
                                        {
                                            [...Array(5)].map((_, i) => (
                                                <FiStar key={i} size={16}
                                                className={i < Math.floor(product.rating)
                                                    ? 'text-yellow-400 fill-current'
                                                    : 'text-gray-300'
                                                }/>))
                                        }
                                        <span className='text-sm text-gray-500 ml-1'>
                                            ({product.rating})
                                        </span>
                                    </div>
                                    <h3 className='text-lg font-semibold text-gray-800 mb-1'>
                                        {product.name}
                                    </h3>
                                    <div className='flex items-center justify-between mb-2'>
                                    <div>
                                        <span className='text-lg font-bold text-pink-600'>
                                            Rs.{(product.price * 133 * (1 - product.discount / 100)).toFixed(0)}
                                        </span>
                                        {product.discount > 0 && (
                                            <span className='text-sm text-gray-500 line-through ml-2'>
                                                Rs.{(product.price * 133).toFixed(0)}
                                            </span>
                                        )}

                                    </div>
                                    <button className='p-2 bg-pink-950 rounded-full text-white hover:bg-pink-700 transition-colors'>
                                        <FiShoppingCart size={18} />
                                    </button>
                                </div>
                                <button className='w-full mt-2 py-2 text-sm font-medium text-white bg-pink-950 hover:bg-pink-700 rounded-lg transition-colors'>
                                    Buy Now
                                </button>

                                </div>
                            </div>
                        ))}

                </div>
            </div>
            <div className='flex justify-center mt-6 space-x-2'>
                {[...Array(totalSlides)].map((_, index) => (
                    <button key= {index} onClick={() => setCurrentSlide(index)}
                    className={`w-3 h-3 rounded-full ${currentSlide === index ? 'bg-pink-950':'bg-gray-400'}`}
                    aria-label={`Go to slide ${index +1}`}>

                    </button>
                ))}
            </div>
        </div>
    </section>
  )
}

export default Products