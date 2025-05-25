import { FaEnvelope, FaFacebook, FaInstagram, FaTwitter } from 'react-icons/fa';
import { SiApplepay, SiMastercard, SiPaypal, SiVisa } from "react-icons/si";

const Footer = () => {
  const sections = [
    {
      title: 'Quick Links',
      links: ['Home', 'Shop', 'New Arrivals', 'Best Sellers', 'Gift Sets'],
    },
    {
      title: 'Customer Services',
      links: ['Contact Us', 'FAQs', 'Shipping Policy', 'Returns & Exchange', 'Privacy Policy'],
    },
  ];

  const socialIcons = [FaFacebook, FaTwitter, FaInstagram];
  const paymentIcons = [SiVisa, SiMastercard, SiPaypal, SiApplepay];

  return (
    <footer className='bg-gray-950 text-gray-300 w-full'>
      <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 px-4 sm:px-6 lg:px-8 py-12'>
        <div>
          <h3 className='text-xl font-bold text-white mb-4'>Scent Haven</h3>
          <p className='mb-4 text-sm'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Repudiand</p>
          <div className='flex space-x-4'>
            {socialIcons.map((Icon, i) => (
              <a href="#" key={i} className='text-gray-400 hover:text-white transition'>
                <Icon className='w-5 h-5' />
              </a>
            ))}
          </div>
        </div>
        {sections.map(({ title, links }, i) => (
          <div key={i}>
            <h3 className='text-lg font-semibold text-white mb-4'>{title}</h3>
            <ul className='space-y-2'>
              {links.map((link, j) => (
                <li key={j}>
                  <a href="#" className='hover:text-white transition text-sm'>{link}</a>
                </li>
              ))}
            </ul>
          </div>
        ))}
        <div>
          <p className='mb-4 text-sm'>Lorem ipsum dolor sit amet consectetur, adipisicing</p>
          <form className='flex'>
            <input
              type="email"
              placeholder='Your Email address'
              className='px-4 py-2 w-full rounded-l focus:outline-none text-gray-200 bg-gray-800 border-none'
              required
            />
            <button
              type='submit'
              className='bg-pink-500 hover:bg-pink-600 text-white px-4 py-2 rounded-r transition'
            >
              Subscribe
            </button>
          </form>
          <div className='mt-4 flex items-center'>
            <FaEnvelope className='w-5 h-5 mr-2' />
            <span className='text-sm'>support@scenthaven.com</span>
          </div>
        </div>
      </div>
      <div className='border-t border-gray-800 pt-4 pb-6 px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row justify-between items-center'>
        <p className='text-sm'>© {new Date().getFullYear()} Scent Haven. All rights reserved.</p>
        <div className='flex space-x-4 mt-4 md:mt-0'>
          {paymentIcons.map((Icon, i) => (
            <Icon key={i} className='h-6 w-8 text-gray-400' />
          ))}
        </div>
      </div>
    </footer>
  );
};

export default Footer;