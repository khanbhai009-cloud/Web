import { useEffect, useState } from 'react';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../../firebase/config';
import UserLayout from '../../components/user/UserLayout';
import ProductCard from '../../components/user/ProductCard';
import { motion } from 'framer-motion';

export default function UserHome() {
  const [outfits, setOutfits] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchOutfits = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, 'outfits'));
        const outfitsData = querySnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        }));
        setOutfits(outfitsData);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching outfits:', error);
        setLoading(false);
      }
    };

    fetchOutfits();
  }, []);

  return (
    <UserLayout>
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold text-center mb-8">Trending Outfits</h1>
        
        {loading ? (
          <div className="flex justify-center">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-purple-500"></div>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {outfits.map((outfit, index) => (
              <motion.div
                key={outfit.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <ProductCard outfit={outfit} />
              </motion.div>
            ))}
          </div>
        )}
        
        <div className="mt-12 p-6 bg-purple-50 rounded-lg">
          <h2 className="text-xl font-semibold mb-4">Our Guarantee</h2>
          <p className="mb-4">100% satisfaction guarantee on all purchases! Love it or your money back.</p>
          <p className="text-sm text-gray-600">*Disclaimer: Prices are randomly generated for demonstration purposes. Actual prices may vary on affiliate sites.</p>
        </div>
      </div>
    </UserLayout>
  );
}