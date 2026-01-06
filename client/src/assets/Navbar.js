import React from 'react';
import { Link } from 'react-router-dom';
import { Menu } from 'lucide-react';
import { Button } from '../@/components/ui/button';
import TechnovateLogo from './TechWizard.png'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '../@/components/ui/dropdown-menu';

const Navbar = () => {
  const navItems = [
    { name: 'Home', path: '/' },
    { name: 'EcoCenter', path: '/eco-center' },
    { name: 'Calculator', path: '/calculator' },
    { name: 'Map', path: '/map' },
    { name: 'Carpool', path: '/carpool' },
    { name: 'Community', path: '/community' },
    { name: 'Shopping', path: '/shopping' },
  ];

  return (
    <nav className="sticky top-0 z-50 w-full bg-white/95 backdrop-blur-md border-b border-blue-100 shadow-sm">
      <div className="container mx-auto px-4 flex h-16 items-center justify-between">
        <Link to="/" className="flex items-center space-x-2">
          <img
            src={TechnovateLogo}
            alt="Carbon Track AI"
            className="h-10 w-auto"
          />
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden md:flex md:items-center md:space-x-8">
          {navItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              className="text-sm font-medium text-gray-700 hover:text-blue-600 transition-colors relative group py-2"
            >
              {item.name}
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-blue-600 transition-all duration-300 group-hover:w-full"></span>
            </Link>
          ))}
        </div>

        {/* Mobile Navigation */}
        <div className="md:hidden">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon" className="hover:bg-blue-50">
                <Menu className="h-5 w-5 text-gray-700" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="bg-white border border-blue-100 shadow-lg">
              {navItems.map((item) => (
                <DropdownMenuItem key={item.path} className="hover:bg-blue-50">
                  <Link to={item.path} className="w-full text-gray-700 hover:text-blue-600">
                    {item.name}
                  </Link>
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;