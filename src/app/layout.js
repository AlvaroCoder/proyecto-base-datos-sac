"use client"
import { Inter } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";



export default function RootLayout({ children }) {
  return (
    <html lang="es">
      <body>
        {children}
        
        <Toaster/>
      </body>
      
    </html>
  );
}
