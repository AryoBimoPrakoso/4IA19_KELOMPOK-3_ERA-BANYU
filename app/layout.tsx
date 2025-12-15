import type { Metadata } from "next";
import localFont from "next/font/local"; 
import "./global.css";

const helveticaNow = localFont({
  src:[
    {
      path: '../public/font/HelveticaNowDisplay-Light.ttf',
      weight: '300',
      style: 'normal',
    },
    {
      path: '../public/font/HelveticaNowDisplay-Regular.ttf',
      weight: '400',
      style: 'normal',
    },
    {
      path: '../public/font/HelveticaNowDisplay-Medium.ttf',
      weight: '500',
      style: 'normal',
    },
    {
      path: '../public/font/HelveticaNowDisplay-Bold.ttf',
      weight: '700',
      style: 'normal',
    },
  ],
  variable: '--font-helvetica-now'
})

export const metadata: Metadata = {
  title: "Era Banyu Segara",
  description: "Pt. Era Banyu Segara",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${helveticaNow.className}`}
      >
        {children}
      </body>
    </html>
  );
}