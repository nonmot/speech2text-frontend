import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="bg-gray-100 text-gray-600 mt-10">
      <div className="container mx-auto py-6 flex flex-col md:flex-row justify-between items-center">
        <p className="text-sm">&copy; {new Date().getFullYear()} MyApp. All rights reserved.</p>
        <div className="space-x-4 mt-2 md:mt-0">
          <Link to="#" className="hover:text-blue-500">Privacy</Link>
          <Link to="#" className="hover:text-blue-500">Terms</Link>
          <Link to="#" className="hover:text-blue-500">Contact</Link>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
