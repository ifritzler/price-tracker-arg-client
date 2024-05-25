"use client";

import Image from "next/image";
import Link from "next/link";
import { MdDone } from "react-icons/md";

export default function HeroHeader() {
  return (
    <section className="flex flex-col lg:flex-row gap-2 items-center text-lg justify-center dark:text-white light:text-black">
      <article className="flex flex-col gap-2 w-full lg:w-2/3 p-6 max-w-[600px]">
        <header>
          <h1 className="text-4xl font-bold">Explora Góndolas</h1>
          <div className="max-w-[350px] max-h-[350px] mx-auto">
            <Image
              src={"/robot.webp"}
              height={400}
              width={400}
              alt="Persona buscando precios en un catálogo"
              className="w-auto h-auto"
            />
          </div>
        </header>
        <p className="text-pretty">
          Con Explora Góndolas, estarás siempre informado sobre los productos que compras. Porque los precios <span className="font-bold">sí importan</span>.
        </p>
        <Link
          href={"/busqueda"}
          className="py-2 px-4 mt-4 bg-[--color-primary] text-white rounded-3xl w-fit font-medium"
        >
          ¡Empieza ahora!
        </Link>
      </article>
      <article className="flex flex-col py-8 gap-2 px-8 dark:bg-gray-700 w-full rounded-xl text-base max-w-[600px]">
        <h2 className="text-xl font-bold uppercase">Lo que hacemos</h2>
        <div className="flex gap-2">
          <MdDone fill="green" size={24}/>
          <p className="w-fit text-pretty">Rastreamos precios diariamente</p>
        </div>
        <div className="flex gap-2">
          <MdDone fill="green" size={24}/>
          <p className="w-fit text-pretty">Acumulamos datos históricos para mantenerte bien informado.</p>
        </div>
        <div className="flex gap-2">
          <MdDone fill="green" size={24}/>
          <p className="w-fit text-pretty">Decimos adiós a los falsos descuentos</p>
        </div>
        <div className="flex gap-2">
          <MdDone fill="green" size={24}/>
          <p className="w-fit text-pretty">¡Hola a los descuentos reales!</p>
        </div>
      </article>
    </section>
  );
}
