"use client";
import Image from "next/image";
import Link from "next/link";
import React, { useState } from "react";

import logo from "@/public/assets/svg/logo-mobile.svg";
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa";

const Login = () => {
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const toggleShowPassword = () => setShowPassword((prev) => !prev);

  return (
    <div className="min-h-screen flex items-center justify-center bg-white">
      {/* CARD */}
      <div className="w-[350px] bg-[#f3f2f2] rounded-2xl p-8 shadow-sm flex flex-col gap-6">
        {/* LOGO + TITLE */}
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-full flex items-center justify-center overflow-hidden">
            <Image src={logo} alt="Era Banyu Segara" className="w-10 h-10" />
          </div>
          <h1 className="font-medium text-lg">Era Banyu Segara</h1>
        </div>

        {/* EMAIL */}
        <div className="flex flex-col gap-1">
          <label className="text-sm font-medium">Email</label>
          <input
            type="email"
            placeholder="youremail@example.com"
            className="w-full px-3 py-2 border border-gray-400 rounded-md text-sm outline-none"
          />
        </div>

        {/* PASSWORD */}
        <div className="flex flex-col gap-1">
          <label className="text-sm font-medium">Password</label>

          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="password"
              className="w-full px-3 py-2 border border-gray-400 rounded-md text-sm outline-none pr-10"
            />

            {/* ICON */}
            <button
              type="button"
              onClick={toggleShowPassword}
              className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-700"
            >
              {showPassword ? (
                <FaRegEye className="text-xl" />
              ) : (
                <FaRegEyeSlash className="text-xl" />
              )}
            </button>
          </div>

          {/* Forgot password */}
          <div className="text-right">
            <button className="text-xs text-gray-600 hover:underline">
              forgot password?
            </button>
          </div>
        </div>

        {/* LOGIN BUTTON */}
        <button className="w-full py-2 bg-black text-white rounded-md text-sm">
          <Link href="/dashboard" className="text-center text-xs underline">
            Login
          </Link>
        </button>

        
      </div>
    </div>
  );
};

export default Login;
