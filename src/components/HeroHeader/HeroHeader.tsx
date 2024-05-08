"use client";

import { Accordion, AccordionItem } from "@nextui-org/accordion";

export default function HeroHeader() {
    return <Accordion>
    <AccordionItem
      key="1"
      aria-label="Accordion 1"
      subtitle="Toca para saber más"
      title={
        <div className="text-3xl flex flex-col gap-4">
            <h1 className="text-4xl font-bold text-white light:text-black">Explora Góndolas 1.0</h1>
            <span className="text-white light:text-black">Te cuento de que trata este proyecto!</span>
        </div>
      }
    >
      <section className="flex flex-col gap-6">
        
        <article className="text-lg text-pretty max-w-5xl flex flex-col gap-4">
          <p>
            Este proyecto educativo de "price tracking" simplifica tu
            experiencia en el supermercado al rastrear diariamente los
            precios y promociones en distintas cadenas.
          </p>
          <p>
            Olvídate de las promociones falsas y los aumentos encubiertos.{" "}
            <br />
            Esta aplicación te ofrece información actualizada para que tomes
            decisiones de compra informadas.
          </p>
          <p>
            Si eres un consumidor astuto en busca de comodidad y ahorro,
            ¡estás en el lugar indicado!
          </p>
        </article>
      </section>
    </AccordionItem>
  </Accordion>
}