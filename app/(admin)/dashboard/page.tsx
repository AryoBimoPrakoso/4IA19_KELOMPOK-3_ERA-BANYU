"use client";
import Barchart from "@/app/components/admin/Barchart";
import CardsTotal from "@/app/components/admin/CardsTotal";
import MonthFilter from "@/app/components/admin/MonthFilter";
import React, { useState } from "react";

// Dummy data
const monthlyData: Record<string, any[]> = {
  "Oktober 2025": [
    { range: "1-5", sales: 70 },
    { range: "6-10", sales: 20 },
    { range: "11-14", sales: 40 },
    { range: "15-18", sales: 80 },
    { range: "19-22", sales: 90 },
    { range: "23-26", sales: 100 },
    { range: "27-30", sales: 50 },
  ],
  "November 2025": [
    { range: "1-5", sales: 60 },
    { range: "6-10", sales: 30 },
    { range: "11-14", sales: 50 },
    { range: "15-18", sales: 80 },
    { range: "19-22", sales: 10 },
    { range: "23-26", sales: 76 },
    { range: "27-30", sales: 23 },
  ],
  "Desember 2025": [
    { range: "1-5", sales: 89 },
    { range: "6-10", sales: 56 },
    { range: "11-14", sales: 23 },
    { range: "15-18", sales: 46 },
    { range: "19-22", sales: 21 },
    { range: "23-26", sales: 33 },
    { range: "27-30", sales: 56 },
  ],
  "Januari 2026": [
    { range: "1-5", sales: 13 },
    { range: "6-10", sales: 10 },
    { range: "11-14", sales: 5 },
    { range: "15-18", sales: 9 },
    { range: "19-22", sales: 20 },
    { range: "23-26", sales: 56 },
    { range: "27-30", sales: 65 },
  ],
  "Februari 2026": [
    { range: "1-5", sales: 60 },
    { range: "6-10", sales: 30 },
    { range: "11-14", sales: 50 },
    { range: "15-18", sales: 80 },
    { range: "19-22", sales: 10 },
    { range: "23-26", sales: 200 },
    { range: "27-30", sales: 23 },
  ],
};

const Dashboard = () => {
  // BULAN INI HARUS DIGANTI API BRAY
  const [currentMonth, setCurrentMonth] = useState("November 2025");
  const chartData = monthlyData[currentMonth] ?? [];

  return (
    <>
      <div className="flex h-screen md:hidden items-center justify-center bg-gray-50 px-6 text-center">
        <div className="max-w-md">
          <h1 className="text-lg font-semibold text-gray-900">
            Dashboard Desktop Only
          </h1>
          <p className="mt-2 text-sm text-gray-600">
            Untuk pengalaman terbaik, silakan akses dashboard melalui PC atau
            laptop.
          </p>
        </div>
      </div>

      <div className="hidden md:flex flex-col gap-4">
        <div className="flex justify-end">
          <MonthFilter value={currentMonth} onChange={setCurrentMonth} />
        </div>
        <CardsTotal />
        <Barchart data={chartData} month={currentMonth} />
      </div>
    </>
  );
};

export default Dashboard;
