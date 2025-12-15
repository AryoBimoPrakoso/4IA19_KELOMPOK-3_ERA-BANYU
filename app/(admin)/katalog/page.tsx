"use client";
import { Plus } from "lucide-react";
import Link from "next/link";
import React, { useState, useEffect } from "react";
import { getApi } from "@/lib/apiClient";

interface Product {
  id: string;
  name: string;
  price: number;
  minOrderQuantity: number;
  unit: string;
  category: string;
  specification: string;
  description: string;
  imageUrl?: string;
}

const Katalog = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [deletingId, setDeletingId] = useState<string | null>(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const data = await getApi('admin/products', true); // Require auth
        setProducts(data);
      } catch (err) {
        setError('Gagal memuat produk');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  const handleDelete = async (id: string) => {
    if (!confirm('Apakah Anda yakin ingin menghapus produk ini?')) return;

    setDeletingId(id);
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api/v1'}/admin/products/${id}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
      });

      if (!response.ok) {
        throw new Error('Gagal menghapus produk');
      }

      // Remove from local state
      setProducts(products.filter(p => p.id !== id));
    } catch (err: any) {
      alert('Error: ' + err.message);
    } finally {
      setDeletingId(null);
    }
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;
  return (
    <div className="flex flex-col gap-4">
      <div>
        <Link href="/katalog/edit">
          <button className="flex py-2 px-4 bg-black text-white rounded-xl items-center gap-2 hover:bg-black/80 duration-300 cursor-pointer">
            Tambah Data
            <span>
              <Plus />
            </span>
          </button>
        </Link>
      </div>
      <div className="overflow-x-auto rounded-lg border border-gray-200">
        <table className="w-full table-fixed">
          <thead className="bg-gray-100">
            <tr>
              <th className="w-12 px-4 py-3 text-left">No</th>
              <th className="w-32 px-4 py-3 text-left">Gambar</th>
              <th className="w-64 px-4 py-3 text-left">Nama Barang</th>
              <th className="w-40 px-4 py-3 text-left">Harga</th>
              <th className="w-48 px-4 py-3 text-left">Bahan</th>
              <th className="w-56 px-4 py-3 text-left">Ukuran</th>
              <th className="w-40 px-4 py-3 text-left">Minimum Pesan</th>
              <th className="w-32 px-4 py-3 text-center">Aksi</th>
            </tr>
          </thead>
          <tbody>
            {products.map((product, index) => (
              <tr key={product.id} className="hover:bg-gray-50">
                <td className="px-4 py-3">{index + 1}</td>
                <td className="px-4 py-3">
                  {product.imageUrl ? (
                    <img src={product.imageUrl} alt={product.name} className="w-24 h-24 object-cover rounded-xl" />
                  ) : (
                    <div className="bg-gray-200 border-2 border-dashed rounded-xl w-24 h-24" />
                  )}
                </td>
                <td className="px-4 py-3">{product.name}</td>
                <td className="px-4 py-3">Rp {product.price.toLocaleString()}</td>
                <td className="px-4 py-3">{product.category}</td>
                <td className="px-4 py-3">{product.specification || 'Sesuai Permintaan'}</td>
                <td className="px-4 py-3">{product.minOrderQuantity} {product.unit}</td>
                <td className="px-4 py-3 text-center space-x-2">
                  <Link
                    href={`/katalog/edit?id=${product.id}`}
                    className="text-blue-600 hover:underline cursor-pointer"
                  >
                    Edit
                  </Link>
                  <button
                    onClick={() => handleDelete(product.id)}
                    disabled={deletingId === product.id}
                    className="text-red-600 hover:underline cursor-pointer disabled:opacity-50"
                  >
                    {deletingId === product.id ? 'Menghapus...' : 'Hapus'}
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Katalog;
