// app/(admin)/laporan/page.tsx
'use client';

import { useState, useEffect, useMemo } from 'react';
import MonthFilter from "@/app/components/admin/MonthFilter";
import { Plus, Download, Edit, Trash2, Search } from 'lucide-react';
import { getApi } from '@/lib/apiClient';
import Link from 'next/link';

interface Order {
  id: string;
  nama: string;
  kontak: string;
  detail: string;
  jumlah: string;
  total: number;
  tanggalPesan: string;
  tanggalPembayaran?: string;
  status: string;
}

export default function LaporanPage() {
  const [selectedMonth, setSelectedMonth] = useState('Semua');
  const [searchQuery, setSearchQuery] = useState('');
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [deletingId, setDeletingId] = useState<string | null>(null);

  useEffect(() => {
    fetchOrders();
  }, [selectedMonth]);

  const fetchOrders = async () => {
    try {
      const data = await getApi('admin/orders', true);
      setOrders(data);
    } catch (err) {
      setError('Gagal memuat laporan');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  // Optimized filtering with useMemo
  const filteredOrders = useMemo(() => {
    let filtered = orders;

    // Filter by month
    if (selectedMonth !== 'Semua') {
      const [monthName, year] = selectedMonth.split(' ');
      const monthMap: { [key: string]: number } = {
        'Januari': 0, 'Februari': 1, 'Maret': 2, 'April': 3, 'Mei': 4, 'Juni': 5,
        'Juli': 6, 'Agustus': 7, 'September': 8, 'Oktober': 9, 'November': 10, 'Desember': 11
      };

      const targetMonth = monthMap[monthName];
      const targetYear = parseInt(year);

      filtered = filtered.filter((order: Order) => {
        if (!order.tanggalPesan) return false;
        const orderDate = new Date(order.tanggalPesan);
        return orderDate.getMonth() === targetMonth && orderDate.getFullYear() === targetYear;
      });
    }

    // Filter by search query (nama or kontak)
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase().trim();
      filtered = filtered.filter((order: Order) =>
        order.nama.toLowerCase().includes(query) ||
        order.kontak.toLowerCase().includes(query)
      );
    }

    return filtered;
  }, [orders, selectedMonth, searchQuery]);

  const handleDelete = async (id: string) => {
    if (!confirm('Apakah Anda yakin ingin menghapus order ini?')) return;

    setDeletingId(id);
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api/v1'}/admin/orders/${id}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
      });

      if (!response.ok) {
        throw new Error('Gagal menghapus order');
      }

      setOrders(orders.filter(o => o.id !== id));
    } catch (err: any) {
      alert('Error: ' + err.message);
    } finally {
      setDeletingId(null);
    }
  };

  const handleExportExcel = async () => {
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api/v1'}/admin/orders/export/excel`, {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
      });

      if (!response.ok) {
        throw new Error('Gagal export Excel');
      }

      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `laporan-pesanan-${new Date().toISOString().split('T')[0]}.xlsx`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      window.URL.revokeObjectURL(url);
    } catch (err: any) {
      alert('Error: ' + err.message);
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'Selesai':
        return 'bg-green-100 text-green-800 border-green-200';
      case 'Diproses':
        return 'bg-gray-100 text-gray-800 border-gray-200';
      case 'Batal':
        return 'bg-red-100 text-red-800 border-red-200';
      default:
        return 'bg-yellow-100 text-yellow-800 border-yellow-200';
    }
  };

  return (
    <div className="p-6 lg:p-10 space-y-8 bg-gray-50 min-h-screen">
      {/* Header + Actions */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <h1 className="text-2xl font-bold text-gray-900">Laporan Pesanan</h1>

        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
          <div className="flex items-center gap-3">
            {/* Tombol Tambah Data */}
            <Link href="/laporan/edit">
              <button className="flex items-center gap-2 px-5 py-3 bg-black text-white rounded-xl font-medium hover:bg-gray-800 transition-colors shadow-sm">
                <Plus className="w-5 h-5" />
                Tambah Data
              </button>
            </Link>

            {/* Tombol Ekspor ke Excel */}
            <button
              onClick={handleExportExcel}
              className="flex items-center gap-2 px-5 py-3 bg-white border border-gray-300 text-gray-700 rounded-xl font-medium hover:bg-gray-50 transition-colors shadow-sm"
            >
              <Download className="w-5 h-5" />
              Ekspor ke Excel
            </button>
          </div>

          <div className="flex items-center gap-3 w-full sm:w-auto">
            {/* Search Input */}
            <div className="relative flex-1 sm:flex-initial">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Cari berdasarkan nama atau kontak..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full sm:w-80 pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
              />
            </div>

            {/* Filter Bulan */}
            <MonthFilter value={selectedMonth} onChange={setSelectedMonth} />
          </div>
        </div>
      </div>

      {/* Table */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full table-auto">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">No</th>
                <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Nama</th>
                <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Kontak</th>
                <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Detail Produk</th>
                <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Jumlah Pesanan</th>
                <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Total</th>
                <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Tanggal Pesanan</th>
                <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Tanggal Pembayaran</th>
                <th className="px-6 py-4 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                <th className="px-6 py-4 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">Aksi</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {loading ? (
                <tr>
                  <td colSpan={11} className="px-6 py-4 text-center text-gray-500">Loading...</td>
                </tr>
              ) : error ? (
                <tr>
                  <td colSpan={11} className="px-6 py-4 text-center text-red-500">{error}</td>
                </tr>
              ) : filteredOrders.length === 0 ? (
                <tr>
                  <td colSpan={11} className="px-6 py-4 text-center text-gray-500">
                    {orders.length === 0 ? 'Tidak ada data laporan' : 'Tidak ada data yang cocok dengan filter'}
                  </td>
                </tr>
              ) : (
                filteredOrders.map((order, index) => (
                  <tr key={order.id} className="hover:bg-gray-50 transition-colors">
                    <td className="px-6 py-4 text-sm text-gray-900">{index + 1}</td>
                    <td className="px-6 py-4 text-sm text-gray-900 font-medium">{order.nama}</td>
                    <td className="px-6 py-4 text-sm text-gray-600">{order.kontak}</td>
                    <td className="px-6 py-4 text-sm text-gray-900">{order.detail}</td>
                    <td className="px-6 py-4 text-sm text-gray-900">{order.jumlah}</td>
                    <td className="px-6 py-4 text-sm text-gray-900 font-medium">Rp {order.total.toLocaleString()}</td>
                    <td className="px-6 py-4 text-sm text-gray-600">{order.tanggalPesan}</td>
                    <td className="px-6 py-4 text-sm text-gray-600">{order.tanggalPembayaran || '-'}</td>
                    <td className="px-6 py-4 text-center">
                      <span className={`inline-flex px-4 py-2 text-xs font-semibold rounded-full border ${getStatusBadge(order.status)}`}>
                        {order.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-center space-x-2">
                      <Link href={`/laporan/edit?id=${order.id}`}>
                        <button className="text-blue-600 hover:underline">
                          <Edit className="w-4 h-4" />
                        </button>
                      </Link>
                      <button
                        onClick={() => handleDelete(order.id)}
                        disabled={deletingId === order.id}
                        className="text-red-600 hover:underline disabled:opacity-50"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}