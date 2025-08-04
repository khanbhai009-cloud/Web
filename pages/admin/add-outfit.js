import { useState } from 'react';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { collection, addDoc } from 'firebase/firestore';
import { db, storage } from '../../firebase/config';
import AdminLayout from '../../components/admin/AdminLayout';
import { useAuth } from '../../contexts/AuthContext';
import { useRouter } from 'next/router';

export default function AddOutfit() {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [punchLine, setPunchLine] = useState('');
  const [price, setPrice] = useState('');
  const [image, setImage] = useState(null);
  const [uploading, setUploading] = useState(false);
  const { isAdmin } = useAuth();
  const router = useRouter();

  if (!isAdmin) {
    router.push('/');
    return null;
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    setUploading(true);
    
    try {
      // Upload image to Firebase Storage
      const storageRef = ref(storage, `outfits/${image.name}`);
      await uploadBytes(storageRef, image);
      const imageUrl = await getDownloadURL(storageRef);
      
      // Add outfit to Firestore
      await addDoc(collection(db, 'outfits'), {
        name,
        description,
        punchLine,
        price: parseFloat(price),
        imageUrl,
        createdAt: new Date().toISOString()
      });
      
      // Reset form
      setName('');
      setDescription('');
      setPunchLine('');
      setPrice('');
      setImage(null);
      
      alert('Outfit added successfully!');
    } catch (error) {
      console.error('Error adding outfit:', error);
      alert('Failed to add outfit');
    } finally {
      setUploading(false);
    }
  };

  return (
    <AdminLayout>
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-2xl font-bold mb-6">Add New Outfit</h1>
        
        <form onSubmit={handleSubmit} className="max-w-lg mx-auto">
          <div className="mb-4">
            <label className="block text-gray-700 mb-2">Outfit Name</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full px-3 py-2 border rounded-lg"
              required
            />
          </div>
          
          <div className="mb-4">
            <label className="block text-gray-700 mb-2">Description</label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full px-3 py-2 border rounded-lg"
              rows="3"
              required
            ></textarea>
          </div>
          
          <div className="mb-4">
            <label className="block text-gray-700 mb-2">Punch Line</label>
            <input
              type="text"
              value={punchLine}
              onChange={(e) => setPunchLine(e.target.value)}
              className="w-full px-3 py-2 border rounded-lg"
              required
            />
          </div>
          
          <div className="mb-4">
            <label className="block text-gray-700 mb-2">Price ($)</label>
            <input
              type="number"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              className="w-full px-3 py-2 border rounded-lg"
              step="0.01"
              min="0"
              required
            />
          </div>
          
          <div className="mb-6">
            <label className="block text-gray-700 mb-2">Image</label>
            <input
              type="file"
              onChange={(e) => setImage(e.target.files[0])}
              className="w-full px-3 py-2 border rounded-lg"
              accept="image/*"
              required
            />
          </div>
          
          <button
            type="submit"
            disabled={uploading}
            className="w-full bg-purple-600 text-white py-2 rounded-lg font-medium hover:bg-purple-700 transition-colors disabled:opacity-50"
          >
            {uploading ? 'Uploading...' : 'Add Outfit'}
          </button>
        </form>
      </div>
    </AdminLayout>
  );
}