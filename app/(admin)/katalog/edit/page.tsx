"use client";
import React, { useState, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { getApi } from '@/lib/apiClient';

const EditKatalog = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const id = searchParams.get('id');

  const [form, setForm] = useState({
    name: '',
    sku: '',
    minOrderQuantity: '',
    unit: '',
    price: '',
    category: '',
    currentStock: '',
    minStockLevel: '',
    specification: '',
    description: '',
    imageUrl: ''
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    if (id) {
      // Load existing product for edit
      const fetchProduct = async () => {
        try {
          const data = await getApi(`admin/products/${id}`, true);
          setForm({
            name: data.name || '',
            sku: data.sku || '',
            minOrderQuantity: data.minOrderQuantity?.toString() || '',
            unit: data.unit || '',
            price: data.price?.toString() || '',
            category: data.category || '',
            currentStock: data.currentStock?.toString() || '',
            minStockLevel: data.minStockLevel?.toString() || '',
            specification: data.specification || '',
            description: data.description || '',
            imageUrl: data.imageUrl || ''
          });
        } catch (err) {
          setError('Gagal memuat data produk');
        }
      };
      fetchProduct();
    }
  }, [id]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const payload = {
        ...form,
        minOrderQuantity: Number(form.minOrderQuantity),
        price: Number(form.price),
        currentStock: Number(form.currentStock) || 0,
        minStockLevel: Number(form.minStockLevel) || 0
      };

      console.log('Payload:', payload);
      console.log('Token:', localStorage.getItem('token'));

      const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api/v1';
      const endpoint = id ? `/admin/products/${id}` : '/admin/products';
      const method = id ? 'PUT' : 'POST';

      console.log('API Call:', `${apiUrl}${endpoint}`, method);

      const response = await fetch(`${apiUrl}${endpoint}`, {
        method,
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        },
        body: JSON.stringify(payload)
      });

      console.log('Response status:', response.status);

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || `HTTP ${response.status}`);
      }

      const result = await response.json();
      console.log('Success:', result);

      router.push('/katalog');
    } catch (err: any) {
      console.error('Error:', err);
      setError(err.message || 'Gagal menyimpan produk');
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  return (
    <div className="max-w-2xl mx-auto">
      <h1 className="text-2xl font-bold mb-6">{id ? 'Edit Produk' : 'Tambah Produk'}</h1>

      {error && <div className="bg-red-100 text-red-700 p-4 rounded mb-4">{error}</div>}

      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium mb-1">Nama Produk</label>
            <input type="text" name="name" value={form.name} onChange={handleChange} className="w-full p-2 border rounded" required />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">SKU</label>
            <input type="text" name="sku" value={form.sku} onChange={handleChange} className="w-full p-2 border rounded" required disabled={!!id} />
          </div>
        </div>

        <div className="grid grid-cols-3 gap-4">
          <div>
            <label className="block text-sm font-medium mb-1">Min Order Quantity</label>
            <input type="number" name="minOrderQuantity" value={form.minOrderQuantity} onChange={handleChange} className="w-full p-2 border rounded" required />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Unit</label>
            <input type="text" name="unit" value={form.unit} onChange={handleChange} className="w-full p-2 border rounded" required />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Harga</label>
            <input type="number" name="price" value={form.price} onChange={handleChange} className="w-full p-2 border rounded" required />
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium mb-1">Kategori</label>
            <input type="text" name="category" value={form.category} onChange={handleChange} className="w-full p-2 border rounded" />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Current Stock</label>
            <input type="number" name="currentStock" value={form.currentStock} onChange={handleChange} className="w-full p-2 border rounded" />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Spesifikasi</label>
          <textarea name="specification" value={form.specification} onChange={handleChange} className="w-full p-2 border rounded" rows={3} />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Deskripsi</label>
          <textarea name="description" value={form.description} onChange={handleChange} className="w-full p-2 border rounded" rows={3} />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Upload Gambar</label>
          <input
            type="file"
            accept="image/*"
            onChange={async (e) => {
              const file = e.target.files?.[0];
              if (file) {
                // Convert to base64
                const reader = new FileReader();
                reader.onload = () => {
                  const base64 = reader.result as string;
                  setForm({ ...form, imageUrl: base64 });
                };
                reader.readAsDataURL(file);
              }
            }}
            className="w-full p-2 border rounded"
          />
          {form.imageUrl && <img src={form.imageUrl} alt="Preview" className="mt-2 w-32 h-32 object-cover" />}
        </div>

        <div className="flex gap-4">
          <button type="submit" disabled={loading} className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 disabled:opacity-50">
            {loading ? 'Menyimpan...' : 'Simpan'}
          </button>
          <button type="button" onClick={() => router.push('/katalog')} className="bg-gray-600 text-white px-4 py-2 rounded hover:bg-gray-700">
            Batal
          </button>
        </div>
      </form>
    </div>
  );
};

export default EditKatalog;
