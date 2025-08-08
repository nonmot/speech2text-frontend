import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-gray-100 text-gray-600 mt-10">
      <div className="container mx-auto py-6 flex flex-col md:flex-row justify-between items-center">
        <p className="text-sm">&copy; {new Date().getFullYear()} MyApp. All rights reserved.</p>
        <div className="space-x-4 mt-2 md:mt-0">
          <a href="#" className="hover:text-blue-500">Privacy</a>
          <a href="#" className="hover:text-blue-500">Terms</a>
          <a href="#" className="hover:text-blue-500">Contact</a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
