import product8 from '../assets/product8.png'
import product9 from '../assets/product9.png'
import product10 from '../assets/product10.png'
import product11 from '../assets/product11.png'
import product12 from '../assets/product12.png'
import product13 from '../assets/product13.png'

const categories = [
    {img: product8, alt:"Men's Perfume", title: "Men's Collection", description:"Bold, sophisticated, and unmistakably masculine — crafted for the modern gentleman."},
    {img: product9, alt:"Women's Perfume", title: "Women's Collection", description:"Elegant, radiant, and irresistibly feminine — a celebration of beauty and confidence."},
    {img: product10, alt:"Luxury Perfume", title: "Luxury Collection", description:"Indulge in opulence with our finest, most exquisite fragrances."},
    {img: product11, alt:"Unisex Perfume", title: "Unisex Collection", description:"Balanced and versatile scents that transcend gender — bold individuality in every note."},
    {img: product12, alt:"Arabic Perfume", title: "Arabic Collection", description:"Rich, exotic, and deeply evocative — inspired by the timeless tradition of Arabian perfumery."},
    {img: product13, alt:"Gift Perfume", title: "Gift Packages", description:"Beautifully curated fragrance sets — the perfect gift for any occasion."},
]

const Categories = () => {
  return (
    <section id='categories' className='py-16 scroll-mt-20 bg-white'>
        <div className='container mx-auto px-4'>
            <div className='text-center mb-12'>
                <h2 className='text-3xl font-bold text-amber-950 mb-3'>
                    Explore Our Fragrance Collections
                </h2>
                <p className='text-lg text-gray-800 max-w-2xl mx-auto'>
                    Discover timeless scents crafted to captivate your senses and elevate every moment.
                </p>
            </div>
            <div className='grid grid-cols-1 sm:grid-cols-3 gap-6'>
                {categories.map((category, index)=>(
                    <div key={index} className='relative group overflow-hidden rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300'>
                        <div className='h-64 overflow-hidden'>
                            <img 
                            src={category.img} 
                            alt={category.alt}
                            className='w-full h-full object-cover group-hover:scale-105 transition-transform duration-500'/>
                        </div>
                        <div className='absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent'>
                            <div className='absolute bottom-0 left-0 p-6'>
                                <h3 className='text-xl font-semibold text-white'>{category.title}</h3>
                                <p className='text-gray-200 mt-1'>{category.description}</p>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div> 

    </section>
  );
};

export default Categories