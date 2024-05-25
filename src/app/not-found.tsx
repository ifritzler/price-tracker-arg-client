import Image from 'next/image'
import Link from 'next/link'
 
export default function NotFound() {
  return (
    <section className='light:text-black dark:text-white flex gap-10 justify-center items-center min-h-screen'>
      <div>
        <Image src={'/f1.webp'} width={400} height={400} alt='Imagen de un megáfono en tono de advertencia o anuncio'/>
      </div>
      <div className='flex flex-col gap-4'>
        <h2 className='text-3xl'>Parece que esta página no existe</h2>
        <p>Hemos tomado nota de ello.</p>
        <p>Mientras tanto, te invitamos a explorar los precios de productos en el mercado.</p>
        <Link href={'/busqueda'} className='py-2 px-4 bg-[--color-primary] text-white rounded-3xl w-fit font-bold'>
            ¡Comenzar a buscar!
        </Link>
      </div>
    </section>
  )
}
