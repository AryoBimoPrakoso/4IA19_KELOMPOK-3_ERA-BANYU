import type { Metadata } from "next";

// Komponen
import Navbar from "../components/client/Navbar";
import Chatbot from "../components/client/Chatbot";
import Footer from "../components/client/Footer";

export const metadata: Metadata = {
  title: "Era Banyu Segara",
  description: "Pt. Era Banyu Segara",
};

export default function ClientLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <Navbar />
      {children}
      <Chatbot />
      <Footer />
    </>
  );
}
