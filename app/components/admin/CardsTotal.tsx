import React from "react";
import { ShoppingCart, DollarSign, Package } from "lucide-react";



const CardsTotal = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {/* Card 1 */}
      <div className="bg-white rounded-2xl shadow-sm p-6 border border-gray-100 hover:shadow-md transition-shadow">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm text-gray-600">Total Penjualan</p>
            <p className="text-2xl font-bold mt-1">600 produk</p>
          </div>
          <div className="p-3 bg-blue-100 rounded-xl">
            <ShoppingCart className="w-8 h-8 text-blue-600" />
          </div>
        </div>
      </div>
      {/* Card 1 */}
      <div className="bg-white rounded-2xl shadow-sm p-6 border border-gray-100 hover:shadow-md transition-shadow">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm text-gray-600">Total Pendapatan</p>
            <p className="text-2xl font-bold mt-1">Rp. 80.000.000</p>
          </div>
          <div className="p-3 bg-blue-100 rounded-xl">
            <DollarSign className="w-8 h-8 text-blue-600" />
          </div>
        </div>
      </div>
      {/* Card 3 */}
      <div className="bg-white rounded-2xl shadow-sm p-6 border border-gray-100 hover:shadow-md transition-shadow">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm text-gray-600">Produk Terlaris</p>
            <p className="text-2xl font-bold mt-1">Packing Carton Box</p>
          </div>
          <div className="p-3 bg-blue-100 rounded-xl">
            <Package className="w-8 h-8 text-blue-600" />
          </div>
        </div>
      </div>


    </div>
  );
};

export default CardsTotal;
