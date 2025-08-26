import React from 'react';
import { Link } from 'react-router-dom';

const Header = () => {
  return (
    <header className="bg-white shadow-md">
      <div className="container mx-auto py-4 flex justify-between items-center">
        <h1 className="text-xl font-bold text-gray-800">Speech to Text</h1>
      </div>
    </header>
  );
};

export default Header;
