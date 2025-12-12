import React from "react";
import Image from "next/image";

// SVG
import logo from "@/public/assets/svg/logo.svg";

const NavbarAdmin = () => {
  return (
    <div className="w-full sticky top-0 z-[999]">
      <div className="flex justify-between items-center px-4 py-2 drop-shadow-md bg-white">
        <Image src={logo} alt="Era Banyu Segara" className="w-64" />
        <h1 className="font-medium">Admin1</h1>
      </div>
    </div>
  );
};

export default NavbarAdmin;
