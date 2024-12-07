import "./globals.css";
import { Toaster } from "@/components/ui/toaster";

export const metadata = {
  title: "Laboratorio de SAC",
  description: "Página de gestión interna del laboratorio de SAC",
};

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
