
import React from 'react';
import { ArrowLeftIcon, AnonymousIcon } from './icons';

const Header: React.FC = () => {
  return (
    <div className="flex items-center justify-between p-4 bg-[#212121] border-b border-gray-700/50 rounded-t-3xl">
      <div className="flex items-center space-x-4">
        <button className="text-gray-300 hover:text-white">
          <ArrowLeftIcon />
        </button>
        <img 
          src="https://picsum.photos/id/23/200/200" 
          alt="Group Icon" 
          className="w-10 h-10 rounded-full object-cover"
        />
        <h1 className="text-lg font-semibold" style={{ color: '#A94442' }}>Fun Friday Group</h1>
      </div>
      <button className="text-gray-300 hover:text-white p-2 rounded-full" style={{ backgroundColor: '#A94442' }}>
        <AnonymousIcon className="w-6 h-6 text-white"/>
      </button>
    </div>
  );
};

export default Header;
