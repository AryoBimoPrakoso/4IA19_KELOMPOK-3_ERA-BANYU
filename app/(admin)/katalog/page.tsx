import { Plus } from "lucide-react";
import Link from "next/link";
import React from "react";

const Katalog = () => {
  return (
    <div className="flex flex-col gap-4">
      <div>
        <button className="flex py-2 px-4 bg-black text-white rounded-xl items-center gap-2 hover:bg-black/80 duration-300 cursor-pointer">
          Tambah Data
          <span>
            <Plus />
          </span>
        </button>
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
            <tr className="hover:bg-gray-50">
              <td className="px-4 py-3">1</td>
              <td className="px-4 py-3">
                <div className="bg-gray-200 border-2 border-dashed rounded-xl w-24 h-24" />
              </td>
              <td className="px-4 py-3">Packing Carton Box</td>
              <td className="px-4 py-3">Rp 1.000.000</td>
              <td className="px-4 py-3">Kertas Kraft</td>
              <td className="px-4 py-3">Sesuai Permintaan</td>
              <td className="px-4 py-3">1000pcs</td>
              <td className="px-4 py-3 text-center">
                <button className="text-blue-600 hover:underline">Edit</button>
              </td>
            </tr>
            <tr className="hover:bg-gray-50">
              <td className="px-4 py-3">1</td>
              <td className="px-4 py-3">
                <div className="bg-gray-200 border-2 border-dashed rounded-xl w-24 h-24" />
              </td>
              <td className="px-4 py-3">Packing Carton Box</td>
              <td className="px-4 py-3">Rp 1.000.000</td>
              <td className="px-4 py-3">Kertas Kraft</td>
              <td className="px-4 py-3">Sesuai Permintaan</td>
              <td className="px-4 py-3">1000pcs</td>
              <td className="px-4 py-3 text-center">
                <button className="text-blue-600 hover:underline">Edit</button>
              </td>
            </tr>
            <tr className="hover:bg-gray-50">
              <td className="px-4 py-3">1</td>
              <td className="px-4 py-3">
                <div className="bg-gray-200 border-2 border-dashed rounded-xl w-24 h-24" />
              </td>
              <td className="px-4 py-3">Packing Carton Box</td>
              <td className="px-4 py-3">Rp 1.000.000</td>
              <td className="px-4 py-3">Kertas Kraft</td>
              <td className="px-4 py-3">Sesuai Permintaan</td>
              <td className="px-4 py-3">1000pcs</td>
              <td className="px-4 py-3 text-center">
                <button className="text-blue-600 hover:underline">Edit</button>
              </td>
            </tr>
            <tr className="hover:bg-gray-50">
              <td className="px-4 py-3">1</td>
              <td className="px-4 py-3">
                {/* <Image ... /> atau placeholder */}
                <div className="bg-gray-200 border-2 border-dashed rounded-xl w-24 h-24" />
              </td>
              <td className="px-4 py-3">Packing Carton Box</td>
              <td className="px-4 py-3">Rp 1.000.000</td>
              <td className="px-4 py-3">Kertas Kraft</td>
              <td className="px-4 py-3">Sesuai Permintaan</td>
              <td className="px-4 py-3">1000pcs</td>
              <td className="px-4 py-3 text-center">
                <button className="text-blue-600 hover:underline">Edit</button>
              </td>
            </tr>
            <tr className="hover:bg-gray-50">
              <td className="px-4 py-3">1</td>
              <td className="px-4 py-3">
                <div className="bg-gray-200 border-2 border-dashed rounded-xl w-24 h-24" />
              </td>
              <td className="px-4 py-3">Packing Carton Box</td>
              <td className="px-4 py-3">Rp 1.000.000</td>
              <td className="px-4 py-3">Kertas Kraft</td>
              <td className="px-4 py-3">Sesuai Permintaan</td>
              <td className="px-4 py-3">1000pcs</td>
              <td className="px-4 py-3 text-center">
                <Link
                  href='/katalog/edit'
                  className="text-blue-600 hover:underline cursor-pointer"
                >
                  Edit
                </Link>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Katalog;
