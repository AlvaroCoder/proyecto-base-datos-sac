import { FormularioUsuario } from "@/components";
import Image from "next/image";

export default function Home() {
  return (
    <main className="w-full min-h-screen bg-guinda flex flex-col items-center ">
      <div className="w-full h-20 bg-white flex flex-row justify-between">

      </div>
      <div  className="w-full py-4 flex flex-col justify-center items-center mt-6">
        <h1 className="text-white font-bold text-3xl mb-4">Base de Datos</h1>
        <FormularioUsuario/>
        <p className="text-white mt-2 hover:underline">Olvidaste la contraseña?</p>
      </div>
    </main>
  );
}
