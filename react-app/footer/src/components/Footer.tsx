import {
    FaPhone, FaEnvelope, FaMapMarkerAlt,
    FaFacebookF, FaInstagram, FaYoutube, FaLinkedinIn
  } from 'react-icons/fa';
  import logo from '../assets/certasystems_1.png';
  
  const quickLinks = [
    { text: "Home", url: "/" },
    { text: "Service", url: "/services" },
    { text: "Blog", url: "/blog" },
    { text: "About Us", url: "/about" },
    { text: "Contact Us", url: "/contact" }
  ];
  
  const services = [
    { text: "Security & Collaboration", url: "/solar-solution" },
    { text: "Data Storage & Integration", url: "/cable-services" },
    { text: "Virtualization & Cloud", url: "/deals" },
    { text: "Consulting & Managed", url: "/support" }
  ];
  
  const Footer = () => {
    return (
      <footer className="bg-blue-gradient text-normal-white py-10 w-full inset-x-0 bottom-0">
        <div className="container mx-auto px-5 md:px-20">
          <div className="grid grid-cols-2 md:grid-cols-9 gap-8 border-b border-neutral-300 pb-6">
            {/* Deskripsi */}
            <div className="col-span-2 md:col-span-3 flex flex-col items-center md:items-start">
              <img src={logo} alt="Certa Systems Logo" className="w-32" />
              <p className="mt-4 text-center md:text-left">
                PT. Certa Systems Indonesia is a technology service provider that focuses on open-source solutions,
                particularly in the development, implementation, management, and support of Linux-based systems.
              </p>
            </div>
  
            {/* Quick Links */}
            <div className="col-span-1 md:col-span-1 text-left md:border-l md:border-white pl-5">
              <h3 className="text-md md:text-lg font-semibold">Quick Links</h3>
              <ul>
                {quickLinks.map((link) => (
                  <li key={link.text} className="mt-2 transform transition duration-300 hover:scale-105">
                    <a href={link.url} className="hover:underline">{link.text}</a>
                  </li>
                ))}
              </ul>
            </div>
  
            {/* Services */}
            <div className="col-span-1 md:col-span-2 text-center md:text-left md:border-l border-white pl-6">
              <h3 className="text-md md:text-lg font-semibold">Services</h3>
              <ul>
                {services.map((service) => (
                  <li key={service.text} className="mt-2 transform transition duration-300 hover:scale-105">
                    <a href={service.url} className="hover:underline">{service.text}</a>
                  </li>
                ))}
              </ul>
            </div>
  
            {/* Kontak */}
            <div className="col-span-2 md:col-span-3 text-center md:text-left md:border-l border-white pl-6">
              <h3 className="text-md md:text-lg font-semibold mb-2">Contact</h3>
              <div className="space-y-3">
                <div className="flex items-center gap-2">
                  <FaPhone className="text-lg" />
                  <p>+62 21 2270 8920</p>
                </div>
                <div className="flex items-center gap-2">
                  <FaEnvelope className="text-lg" />
                  <p>info_at_certa.co.id</p>
                </div>
                <div className="flex items-start gap-2">
                  <FaMapMarkerAlt className="text-lg mt-1" />
                  <p>
                    AD Premier Office Park 19th Floor, Jl. T.B. Simatupang No.5, Jakarta 12550, Indonesia
                  </p>
                </div>
              </div>
  
              {/* Media Sosial */}
              <div className="flex justify-center md:justify-start gap-3 mt-4">
                <a href="#" className="group transition duration-300 hover:text-blue-500">
                  <FaFacebookF />
                </a>
                <a href="#" className="group transition duration-300 hover:text-blue-500">
                  <FaInstagram />
                </a>
                <a href="#" className="group transition duration-300 hover:text-blue-500">
                  <FaYoutube />
                </a>
                <a href="#" className="group transition duration-300 hover:text-blue-500">
                  <FaLinkedinIn />
                </a>
              </div>
            </div>
          </div>
  
          <p className="text-center mt-4">
            © Certa Systems Indonesia 2025
          </p>
        </div>
      </footer>
    );
  };
  
  export default Footer;