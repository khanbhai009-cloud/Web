import Link from 'next/link';
import { useRouter } from 'next/router';
import { useAuth } from '../../contexts/AuthContext';

export default function UserLayout({ children }) {
  const router = useRouter();
  const { currentUser } = useAuth();

  const navItems = [
    { path: '/user', icon: 'home', label: 'Home' },
    { path: '/user/search', icon: 'search', label: 'Search' },
    { path: '/user/orders', icon: 'shopping_bag', label: 'Orders' },
    { path: '/user/profile', icon: 'person', label: 'Profile' },
  ];

  return (
    <div className="flex flex-col min-h-screen">
      <main className="flex-grow pb-16">{children}</main>
      
      {/* Bottom Navigation */}
      <nav className="fixed bottom-0 left-0 right-0 bg-white shadow-lg border-t border-gray-200">
        <div className="flex justify-around">
          {navItems.map((item) => (
            <Link key={item.path} href={item.path}>
              <div className={`flex flex-col items-center py-3 px-4 ${router.pathname === item.path ? 'text-purple-600' : 'text-gray-600'}`}>
                <span className="material-icons">{item.icon}</span>
                <span className="text-xs mt-1">{item.label}</span>
              </div>
            </Link>
          ))}
        </div>
      </nav>
    </div>
  );
}