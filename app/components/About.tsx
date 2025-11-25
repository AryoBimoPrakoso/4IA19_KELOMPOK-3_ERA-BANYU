import React from "react";

const About = () => {
  return (
    <section id="tentang-kami" className="bg-primary text-white">
      <div className="p-14 flex flex-col items-center gap-8">
        <div className="w-full">
          <h1 className="font-medium text-6xl">Tentang Kami</h1>
        </div>
        <div className="w-full flex justify-end">
          <p className="w-1/2 text-3xl">
            PT. ERA BANYU SEGARA menyediakan solusi pengemasan yang dirancang
            khusus untuk berbagai bisnis di berbagai industri. Mulai dari
            pengemasan industri hingga pengemasan produk makanan, medis, dan
            elektronik, kami memberikan solusi berkualitas tinggi yang dapat
            disesuaikan, dirancang untuk melindungi dan menyajikan produk Anda
            dengan presisi.
          </p>
        </div>
      </div>
    </section>
  );
};

export default About;
