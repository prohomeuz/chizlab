import { Inter } from "next/font/google";
import "./globals.css";
import CustomCursor from "@/components/CustomCursor";

const inter = Inter({ subsets: ["latin"], variable: "--inter-font" });

export const metadata = {
  title: "Chizlab",
  description: "Chizmachilikdan ijodga",
};

export default function RootLayout({ children }) {
  return (
    <html
      lang="uz"
      className={`${inter.variable} h-full antialiased`}
      style={{ cursor: 'none' }}
    >
      <body className="min-h-full flex flex-col">
        <CustomCursor />
        {children}
      </body>
    </html>
  );
}
