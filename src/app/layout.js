import localFont from "next/font/local";
import { Inter } from "next/font/google";
import "./globals.css";
import CustomCursor from "@/components/CustomCursor";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });

const ppe = localFont({
  src: [
    { path: "../../public/fonts/PPEditorialNew-Regular.woff2", format: "woff2", style: "normal", weight: "400" },
    { path: "../../public/fonts/PPEditorialNew-Regular.woff", format: "woff", style: "normal", weight: "400" },
    { path: "../../public/fonts/PPEditorialNew-UltralightItalic.woff2", format: "woff2", style: "normal", weight: "200" },
    { path: "../../public/fonts/PPEditorialNew-UltralightItalic.woff", format: "woff", style: "normal", weight: "200" },
    { path: "../../public/fonts/PPEditorialNew-UltralightItalic.woff2", format: "woff2", style: "italic", weight: "200" },
    { path: "../../public/fonts/PPEditorialNew-UltralightItalic.woff", format: "woff", style: "italic", weight: "200" },
  ],
  variable: "--font-ppe",
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
      style={{ cursor: 'none' }}
    >
      <body className="min-h-full flex flex-col">
        <CustomCursor />
        {children}
      </body>
    </html>
  );
}
