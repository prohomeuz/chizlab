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
      <head>
        <link
          rel="preload"
          as="image"
          imageSizes="(max-width: 430px) 220px, 600px"
          imageSrcSet="/_next/image?url=%2Floader.png&w=220&q=75 220w, /_next/image?url=%2Floader.png&w=430&q=75 430w, /_next/image?url=%2Floader.png&w=640&q=75 640w"
          fetchPriority="high"
        />
      </head>
      <body className="min-h-full flex flex-col">
        <CustomCursor />
        {children}
      </body>
    </html>
  );
}
