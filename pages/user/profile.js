import { useState } from 'react';
import UserLayout from '../../components/user/UserLayout';
import { useAuth } from '../../contexts/AuthContext';

export default function UserProfile() {
  const { currentUser } = useAuth();
  const [message, setMessage] = useState('');
  const [wishlist, setWishlist] = useState([
    { id: 1, name: 'Summer Dress', price: '$5.99' },
    { id: 2, name: 'Denim Jacket', price: '$6.49' }
  ]);

  const handleSendMessage = (e) => {
    e.preventDefault();
    alert(`Message sent to admin: ${message}`);
    setMessage('');
  };

  return (
    <UserLayout>
      <div className="container mx-auto px-4 py-8">
        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
          <h2 className="text-xl font-semibold mb-4">Your Profile</h2>
          
          <div className="space-y-4">
            <div>
              <p className="text-sm text-gray-500">User ID</p>
              <p className="font-medium">{currentUser?.uid || 'N/A'}</p>
            </div>
            
            <div>
              <p className="text-sm text-gray-500">Email</p>
              <p className="font-medium">{currentUser?.email || 'N/A'}</p>
            </div>
          </div>
        </div>
        
        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
          <h2 className="text-xl font-semibold mb-4">Your Wishlist</h2>
          
          {wishlist.length > 0 ? (
            <ul className="divide-y divide-gray-200">
              {wishlist.map((item) => (
                <li key={item.id} className="py-3 flex justify-between">
                  <span>{item.name}</span>
                  <span className="font-medium">{item.price}</span>
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-gray-500">Your wishlist is empty</p>
          )}
        </div>
        
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-xl font-semibold mb-4">Contact Admin</h2>
          
          <form onSubmit={handleSendMessage}>
            <textarea
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              className="w-full px-3 py-2 border rounded-lg mb-3"
              rows="3"
              placeholder="Type your message here..."
              required
            ></textarea>
            
            <button
              type="submit"
              className="w-full bg-purple-600 text-white py-2 rounded-lg font-medium hover:bg-purple-700 transition-colors"
            >
              Send Message
            </button>
          </form>
        </div>
      </div>
    </UserLayout>
  );
}