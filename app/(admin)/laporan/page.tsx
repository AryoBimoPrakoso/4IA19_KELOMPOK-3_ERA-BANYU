// app/(admin)/laporan/page.tsx
'use client';

import { useState } from 'react';
import MonthFilter from "@/app/components/admin/MonthFilter"; // filter month kamu yang sudah ada
import { Plus, Download } from 'lucide-react';

// Data dummy (nanti ganti dari API berdasarkan month)
const ordersData = [
  {
    no: 1,
    nama: 'Aryo',
    kontak: '081234567899',
    detail: 'Packing Carton Box',
    jumlah: '2000 pcs',
    total: 'Rp 4.000.000',
    tanggalPesan: '20/11/2025',
    tanggalPembayaran: '25/11/2025',
    status: 'Diproses', 
  },
  {
    no: 2,
    nama: 'Ferry',
    kontak: '08123456123',
    detail: 'Paper Pallet',
    jumlah: '100 pcs',
    total: 'Rp 9.000.000',
    tanggalPesan: '15/11/2025',
    tanggalPembayaran: '20/11/2025',
    status: 'Selesai',
  },
  {
    no: 3,
    nama: 'Ariel',
    kontak: '081235555555',
    detail: 'Impra Board Box',
    jumlah: '100 pcs',
    total: 'Rp 12.000.000',
    tanggalPesan: '10/11/2025',
    tanggalPembayaran: '15/11/2025',
    status: 'Batal',
  },
];

export default function LaporanPage() {
  const [selectedMonth] = useState('November, 2025');
  // nanti filter data berdasarkan selectedMonth

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

        <div className="flex items-center gap-3">
          {/* Tombol Tambah Data */}
          <button className="flex items-center gap-2 px-5 py-3 bg-black text-white rounded-xl font-medium hover:bg-gray-800 transition-colors shadow-sm">
            <Plus className="w-5 h-5" />
            Tambah Data
          </button>

          {/* Tombol Ekspor ke Excel */}
          <button className="flex items-center gap-2 px-5 py-3 bg-white border border-gray-300 text-gray-700 rounded-xl font-medium hover:bg-gray-50 transition-colors shadow-sm">
            <Download className="w-5 h-5" />
            Ekspor ke Excel
          </button>

          {/* Filter Bulan */}
          <MonthFilter value={selectedMonth} onChange={() => {}} />
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
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {ordersData.map((order) => (
                <tr key={order.no} className="hover:bg-gray-50 transition-colors">
                  <td className="px-6 py-4 text-sm text-gray-900">{order.no}</td>
                  <td className="px-6 py-4 text-sm text-gray-900 font-medium">{order.nama}</td>
                  <td className="px-6 py-4 text-sm text-gray-600">{order.kontak}</td>
                  <td className="px-6 py-4 text-sm text-gray-900">{order.detail}</td>
                  <td className="px-6 py-4 text-sm text-gray-900">{order.jumlah}</td>
                  <td className="px-6 py-4 text-sm text-gray-900 font-medium">{order.total}</td>
                  <td className="px-6 py-4 text-sm text-gray-600">{order.tanggalPesan}</td>
                  <td className="px-6 py-4 text-sm text-gray-600">{order.tanggalPembayaran}</td>
                  <td className="px-6 py-4 text-center">
                    <span className={`inline-flex px-4 py-2 text-xs font-semibold rounded-full border ${getStatusBadge(order.status)}`}>
                      {order.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}