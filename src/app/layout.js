import localFont from "next/font/local";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });

const ppe = localFont({
  src: [
    { path: "../../public/fonts/PPEditorialNew-UltralightItalic.woff2", format: "woff2" },
    { path: "../../public/fonts/PPEditorialNew-UltralightItalic.woff", format: "woff" },
  ],
  variable: "--font-ppe",
  style: "italic",
  weight: "200",
});

const sfPro = localFont({
  src: [
    { path: "../../public/fonts/SFProDisplay-Regular.woff2", format: "woff2" },
    { path: "../../public/fonts/SFProDisplay-Regular.woff", format: "woff" },
  ],
  variable: "--font-sf",
  weight: "400",
});

export const metadata = {
  title: "Chizlab",
  description: "Chizmachilikdan ijodga",
};

export default function RootLayout({ children }) {
  return (
    <html
      lang="uz"
      className={`${ppe.variable} ${sfPro.variable} ${inter.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
