import React from 'react';
import { BarChart3 } from 'lucide-react';

const Header: React.FC = () => {
  return (
    <header className="bg-white border-b border-gray-200 py-4">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-center">
          <BarChart3 className="h-6 w-6 text-blue-600 mr-2" />
          <h1 className="text-xl font-semibold text-gray-800">Marks Distribution Visualizer</h1>
        </div>
      </div>
    </header>
  );
};

export default Header;