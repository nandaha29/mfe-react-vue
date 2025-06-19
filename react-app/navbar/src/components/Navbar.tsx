import { useEffect, useState } from 'react';
import logoDark from '../assets/certasystems_1.png';
import logoLight from '../assets/certasystems_white.png';

const menuItems = [
  { path: '/', label: 'Home' },
  { path: '/service', label: 'Service' },
  { path: '/blog', label: 'Blog' }, // Remove /* for navigation
  { path: '/about', label: 'About' },
];

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [hoveredItem, setHoveredItem] = useState<string | null>(null);
  const [currentPath, setCurrentPath] = useState(window.location.pathname); // Track current path

  // Function untuk mendapatkan active item berdasarkan URL
  const getActiveItemFromPath = (pathname: string) => {
    // Handle blog routes specially
    if (pathname.startsWith('/blog')) {
      return 'Blog';
    }
    
    const currentItem = menuItems.find(item => item.path === pathname);
    return currentItem ? currentItem.label : 'Home';
  };

  const activeItem = getActiveItemFromPath(currentPath);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    // Polling untuk cek perubahan URL (untuk microapp)
    const checkUrlChange = () => {
      if (window.location.pathname !== currentPath) {
        console.log('URL changed from', currentPath, 'to', window.location.pathname);
        setCurrentPath(window.location.pathname);
      }
    };

    // Check URL setiap 100ms
    const urlCheckInterval = setInterval(checkUrlChange, 100);

    // Listen untuk event dari microapp (jika ada)
    const handleRouteChange = (event: any) => {
      console.log('Route change event:', event);
      setCurrentPath(window.location.pathname);
    };

    // Event listeners
    window.addEventListener('scroll', handleScroll);
    window.addEventListener('popstate', handleRouteChange);
    
    // Custom event untuk microapp (jika host app mengirim event)
    window.addEventListener('route-change', handleRouteChange);
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('popstate', handleRouteChange);
      window.removeEventListener('route-change', handleRouteChange);
      clearInterval(urlCheckInterval);
    };
  }, [currentPath]);

  return (
    <nav
      className={`fixed top-0 left-0 w-full z-50 h-20 transition-all duration-300 ${
        !isScrolled ? 'bg-[#002B46] text-white' : 'bg-white text-black shadow-lg'
      }`}
      // bg-[#00334C]s
    >
      <div className="max-w-screen-xl mx-auto flex justify-between items-center px-6 lg:px-20 py-4 h-20 font-lato">
        {/* Logo */}
        <div>
          <img
            src={!isScrolled ? logoLight : logoDark}
            alt="Certasystems Logo"
            className="h-6 transition-all duration-300"
          />
        </div>

        {/* Desktop Menu & Contact Button */}
        <div className="md:flex items-center space-x-8">
          {/* Menu Items */}
          <ul className="flex space-x-8">
            {menuItems.map((item) => (
              <li key={item.path}>
                <a
                  href={item.path}
                  onMouseEnter={() => setHoveredItem(item.label)}
                  onMouseLeave={() => setHoveredItem(null)}
                  className={`relative py-2 px-1 transition-all duration-300 text-sm font-medium ${
                    activeItem === item.label
                      ? !isScrolled 
                        ? 'text-blue-300' 
                        : 'text-blue-600'
                      : !isScrolled 
                        ? 'text-white hover:text-blue-200' 
                        : 'text-gray-700 hover:text-blue-600'
                  }`}
                >
                  {item.label}
                  
                  {/* Border indicator */}
                  <span className={`absolute bottom-0 left-0 h-0.5 transition-all duration-300 ${
                    activeItem === item.label || hoveredItem === item.label
                      ? 'w-full opacity-100'
                      : 'w-0 opacity-0'
                  } ${
                    !isScrolled ? 'bg-blue-300' : 'bg-blue-600'
                  }`} />
                </a>
              </li>
            ))}
          </ul>

          {/* Contact Button */}
          <a
            href="/contact"
            className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-2.5 rounded-full text-sm font-medium transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl"
          >
            Contact Us
          </a>
        </div>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className={`md:hidden focus:outline-none transition-colors duration-300 ${
            !isScrolled ? 'text-white' : 'text-black'
          }`}
        >
          <svg 
            className={`w-6 h-6 transition-transform duration-300 ${isOpen ? 'rotate-90' : ''}`} 
            fill="none" 
            stroke="currentColor" 
            viewBox="0 0 24 24"
          >
            {isOpen ? (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            ) : (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16m-7 6h7" />
            )}
          </svg>
        </button>
      </div>

      {/* Mobile Menu */}
      <div className={`md:hidden bg-white border-t transition-all duration-300 ${
        isOpen ? 'opacity-100 max-h-96 py-4' : 'opacity-0 max-h-0 overflow-hidden'
      }`}>
        <div className="px-6">
          <ul className="space-y-3">
            {menuItems.map((item) => (
              <li key={item.path}>
                <a
                  href={item.path}
                  onClick={() => setIsOpen(false)}
                  className={`block py-2 px-4 rounded-lg transition-all duration-300 text-sm font-medium ${
                    activeItem === item.label
                      ? 'bg-blue-50 text-blue-600 border-l-4 border-blue-600'
                      : 'text-gray-700 hover:bg-gray-50 hover:text-blue-600'
                  }`}
                >
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
          
          {/* Mobile Contact Button */}
          <div className="mt-4 pt-4 border-t border-gray-200">
            <a
              href="/contact"
              onClick={() => setIsOpen(false)}
              className="block w-full bg-blue-500 hover:bg-blue-600 text-white text-center px-6 py-3 rounded-full text-sm font-medium transition-all duration-300 shadow-lg"
            >
              Contact Us
            </a>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;