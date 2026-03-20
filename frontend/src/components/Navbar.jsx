import { NavLink } from 'react-router-dom';
import { LineChart, Home, LayoutDashboard, TrendingUp, Info } from 'lucide-react';

const Navbar = () => {
  const navLinks = [
    { name: 'Home', path: '/', icon: <Home className="w-4 h-4" /> },
    { name: 'Dashboard', path: '/dashboard', icon: <LayoutDashboard className="w-4 h-4" /> },
    { name: 'Predict', path: '/predict', icon: <TrendingUp className="w-4 h-4" /> },
    { name: 'About', path: '/about', icon: <Info className="w-4 h-4" /> },
  ];

  return (
    <nav className="fixed w-full top-0 z-50 bg-dark-navy/80 backdrop-blur-md border-b border-white/10 shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex-shrink-0 flex items-center gap-2">
            <LineChart className="h-8 w-8 text-accent-green" />
            <span className="font-bold text-xl tracking-wide">
              Stock<span className="text-accent-green">Sight</span>
            </span>
          </div>
          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-4">
              {navLinks.map((link) => (
                <NavLink
                  key={link.name}
                  to={link.path}
                  className={({ isActive }) =>
                    `flex items-center gap-2 px-3 py-2 rounded-md font-medium transition-all ${
                      isActive
                        ? 'bg-accent-green/10 text-accent-green border border-accent-green/20'
                        : 'text-gray-300 hover:bg-white/5 hover:text-white'
                    }`
                  }
                >
                  {link.icon}
                  {link.name}
                </NavLink>
              ))}
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
