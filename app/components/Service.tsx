import React from "react";
import Image from "next/image";
import layananImg from "@/public/assets/img/service.jpg";

const daftarLayananArray = [
  "Pengemasan industri",
  "Pengemasan otomotif, alat musik, dan peralatan",
  "Pengemasan makanan dan minuman",
  "Pengemasan peralatan medis dan tekstil",
  "Pengemasan panel surya dan suku cadang elektronik",
  "Pengemasan logistik, plastik, kertas, dan perlengkapan kantor",
];

const Service = () => {
  return (
    <section id="layanan">
      <div className="h-full p-[56px] ">
        <div className="flex flex-col w-full">
          <div className="flex flex-col gap-[24px]">
            <div>
              <h1 className="text-6xl font-semibold">
                Kami menyediakan <span className="text-[#0099A5]">kemasan</span>{" "}
                untuk :
              </h1>
            </div>
            <div className="flex flex-row justify-between gap-[56px]">
              <div className="w-full flex flex-col">
                {daftarLayananArray.map((layanan, index) => (
                  <div
                    key={index}
                    className="h-full border-b border-black justify-center text-3xl font-medium cursor-pointer"
                  >
                    <button className="flex items-center h-full justify-between gap-2">
                      {layanan}
                    </button>
                  </div>
                ))}
              </div>
              <div className="w-[600px]">
                <Image
                  src={layananImg}
                  alt="Carton Box"
                  className="w-full h-full object-cover rounded-lg"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Service;
