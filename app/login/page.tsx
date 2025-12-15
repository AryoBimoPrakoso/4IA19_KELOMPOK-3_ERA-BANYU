"use client";
import Image from "next/image";
import Link from "next/link";
import React, { useState } from "react";
import { useRouter } from "next/navigation";

import logo from "@/public/assets/svg/logo-mobile.svg";
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa";
import { getApi } from "@/lib/apiClient";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const router = useRouter();

  const toggleShowPassword = () => setShowPassword((prev) => !prev);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api/v1'}/admin/auth/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username: email, password }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Login failed');
      }

      // Save token to localStorage
      localStorage.setItem('token', data.token);
      localStorage.setItem('admin', JSON.stringify(data.admin));

      // Redirect to dashboard
      router.push('/dashboard');
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

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

        {error && <div className="text-red-500 text-sm">{error}</div>}

        <form onSubmit={handleSubmit} className="flex flex-col gap-6">
          {/* EMAIL */}
          <div className="flex flex-col gap-1">
            <label className="text-sm font-medium">Username</label>
            <input
              type="text"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="username"
              className="w-full px-3 py-2 border border-gray-400 rounded-md text-sm outline-none"
              required
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
                required
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
          <button
            type="submit"
            disabled={loading}
            className="w-full py-2 bg-black text-white rounded-md text-sm hover:bg-black/70 duration-300 disabled:opacity-50"
          >
            {loading ? 'Logging in...' : 'Login'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
