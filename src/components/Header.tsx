import { Link } from 'react-router-dom';
import { Utensils, Settings } from 'lucide-react';

export default function Header() {
  return (
    <header className="sticky top-0 z-50 border-b bg-white">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <Link to="/" className="flex items-center gap-2">
          <Utensils className="h-8 w-8 text-indigo-600" />
          <div>
            <h1 className="text-xl font-bold text-gray-900">NOPO</h1>
            <p className="text-xs text-gray-500">Heritage Eateries</p>
          </div>
        </Link>
        
        <nav className="flex items-center gap-6">
          <Link to="/" className="text-sm font-medium text-gray-700 hover:text-indigo-600">
            Home
          </Link>
          <Link to="/about" className="text-sm font-medium text-gray-700 hover:text-indigo-600">
            About
          </Link>
          <Link to="/trending" className="text-sm font-medium text-gray-700 hover:text-indigo-600">
            Trending
          </Link>
          <Link to="/neighborhoods" className="text-sm font-medium text-gray-700 hover:text-indigo-600">
            Neighborhoods
          </Link>
          <Link 
            to="/admin" 
            className="flex items-center gap-1 rounded-full bg-gray-100 px-3 py-1 text-sm font-medium text-gray-700 hover:bg-gray-200"
          >
            <Settings className="h-4 w-4" />
            Admin
          </Link>
        </nav>
      </div>
    </header>
  );
}