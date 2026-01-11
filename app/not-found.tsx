import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50">
      <h1 className="text-6xl font-bold text-gray-900">404</h1>
      <h2 className="text-2xl font-medium text-gray-600 mt-4">Halaman Tidak Ditemukan</h2>
      <p className="text-gray-500 mt-2">Maaf, rute yang Anda tuju tidak tersedia.</p>
      <Link href="/">
        <button className="mt-6 px-6 py-2 bg-black text-white rounded-md hover:bg-black/70 duration-300">
          Kembali ke Beranda
        </button>
      </Link>
    </div>
  );
}