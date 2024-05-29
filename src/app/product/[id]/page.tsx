"use client";
import { fetchProductData, fetchProductMetrics } from "@/data/fetchProducts";
import { Accordion, AccordionItem, Link } from "@nextui-org/react";
import { Spinner } from "@nextui-org/spinner";
import { useQuery } from "@tanstack/react-query";
import Image from "next/image";

import useDarkMode from "@/hooks/useDarkMode";
import { } from "d3-scale";
import { useEffect, useMemo, useRef, useState } from "react";
import { AxisOptions, Chart } from "react-charts";

export default function ProductView({ params }: { params: { id: string } }) {
  const id = params.id;
  const productChartRef = useRef<HTMLDivElement>(null);
  const [series, setSeries] = useState<any>(null);
  const isDarkMode = useDarkMode();
  const [selectedKeys, setSelectedKeys] = useState<any>(new Set(["1"]));

  const metricsQuery = useQuery<any, any, any>({
    queryKey: ["product-metrics", id],
    queryFn: () => fetchProductMetrics(id, 7),
    refetchInterval: 60 * 1000 * 60 * 12, // 12 hours
  });

  const productQuery = useQuery<any, any, any>({
    queryKey: ["product", id],
    queryFn: () => fetchProductData(id),
    refetchInterval: 60 * 1000 * 60 * 12, // 12 hours
  });

  const primaryAxis = useMemo(
    (): AxisOptions<{ date: Date; price: number }> => ({
      getValue: (datum) => datum.date,
    }),
    []
  );

  const secondaryAxes = useMemo(
    (): AxisOptions<{ date: Date; price: number }>[] => [
      {
        getValue: (datum) => datum.price,
        elementType: "area",
        minDomainLength: 300,
        stacked: false,
        tickCount: 10,
        showDatumElements: true,
      },
    ],
    []
  );

  useEffect(() => {
    if (metricsQuery.data) {
      setSeries([
        {
          label: "Precio de lista diario",
          data: metricsQuery.data.data.map((record: any) => ({
            date: new Date(record.date),
            price: record.price,
          })),
          color: "#333asd",
        },
        {
          label: "Precio promocional",
          data: metricsQuery.data.data.map((record: any) => ({
            date: new Date(record.date),
            price: record.discountPrice,
          })),
        },
      ]);
    }
  }, [metricsQuery.data, isDarkMode]);

  return (
    <main className="container mx-auto flex flex-col gap-4 p-4 light:text-black dark:text-white">
      {productQuery.data && (
        <section className="flex flex-col md:flex-row gap-6">
          <div>
            <h1 className="text-3xl font-bold w-96">
              {productQuery.data.data.title}
            </h1>
          </div>
          <div>
            <Image
              src={productQuery.data.data.imageUrl}
              width={300}
              height={300}
              alt={productQuery.data.data.title}
              className="w-[150px] h-[150px] md:w-[300px] md:h-[300px]"
            />
          </div>
        </section>
      )}
      <section className="rounded-lg bg-[--background-color-graph] text-center aspect-video min-h-[3  00px] max-w-[1200px]">
        {metricsQuery.isPending && <Spinner className="mx-auto" />}
        {!metricsQuery.isPending && metricsQuery.data && series && (
          <Chart
            options={{
              data: series,
              primaryAxis,
              secondaryAxes,
              dark: isDarkMode,
              padding: { bottom: 24, top: 24, left: 24, right: 24 },
            }}
          />
        )}
      </section>
      <div className="text-xs opacity-60">
        <span>Agradecemos a los creadores de este sistema de gráficos: </span>
        Tanstack React Charts
        <br />
        <Link
          size="sm"
          href={"https://react-charts.tanstack.com/"}
          color="warning"
        >
          Visita Tanstack React Charts
        </Link>
      </div>
      <section className="my-10 flex flex-col gap-4">
        <h2 className="text-3xl">Lo que hay que saber del gráfico:</h2>
        <Accordion
          selectedKeys={selectedKeys}
          onSelectionChange={setSelectedKeys}
          itemClasses={{
            base: "text-white",
            title: isDarkMode ? "text-white" : "text-black",
            content: isDarkMode ? "text-white" : "text-black",
          }}
        >
          <AccordionItem
            key="1"
            aria-label="¿ De donde provienen los datos ?"
            title="¿ De donde provienen los datos ?"
          >
            Los datos se recopilan manualmente todos los días, un proceso que
            tarda entre 20 minutos y 3 horas. La información se obtiene de las
            páginas web oficiales de varias cadenas de supermercados donde hay
            productos registrados.
          </AccordionItem>
          <AccordionItem
            key="2"
            aria-label="¿Con qué frecuencia se actualizan los datos?"
            title="¿Con qué frecuencia se actualizan los datos?"
          >
            Los datos se actualizan diariamente. Sin embargo, debido a que el
            proceso es manual, puede haber días en los que la actualización no
            se realice.
          </AccordionItem>
          <AccordionItem
            key="3"
            aria-label="¿Por qué hay días faltantes en la gráfica?"
            title="¿Por qué hay días faltantes en la gráfica?"
          >
            La actualización de la gráfica se hace manualmente por ahora, ya que
            mantener un servidor activo 24/7 con tareas programadas es costoso.
            Esto significa que algunos días la información puede no estar
            disponible debido a problemas para ejecutar el proceso de
            actualización, que pueden ser tanto personales como técnicos.
          </AccordionItem>
          <AccordionItem
            key="4"
            aria-label="¿Qué hacer si encuentro un error en los datos?"
            title="¿Qué hacer si encuentro un error en los datos?"
          >
            Si encuentras un error en los datos, por favor notifícanos a través
            del formulario de contacto en nuestro sitio web. Nos esforzamos por
            corregir cualquier error lo antes posible.
          </AccordionItem>
          <AccordionItem
            key="5"
            aria-label="¿Por qué puede haber diferencias en los precios?"
            title="¿Por qué puede haber diferencias en los precios?"
          >
            Las diferencias en los precios pueden deberse a el momento de
            actualizacion del precio del supermercado, si fue posterior o
            anterior a nuestra actualizacion manual o a errores en el proceso
            manual de recopilación de datos. También pueden influir promociones
            y descuentos temporales.
          </AccordionItem>
          <AccordionItem
            key="6"
            aria-label="¿Cómo se garantiza la precisión de los datos?"
            title="¿Cómo se garantiza la precisión de los datos?"
          >
            Hacemos todo lo posible para garantizar la precisión de los datos
            mediante verificaciones regulares y revisiones manuales. Sin
            embargo, debido a la naturaleza semi-manual del proceso, pueden
            ocurrir errores ocasionales.
          </AccordionItem>
          <AccordionItem
            key="7"
            aria-label="¿Puedo sugerir la inclusión de nuevos productos?"
            title="¿Puedo sugerir la inclusión de nuevos productos?"
          >
            Sí, estamos abiertos a sugerencias. Puedes enviar tus propuestas de
            nuevos productos a través del formulario de contacto en nuestro
            sitio web para tomarlo en consideración.
          </AccordionItem>
          <AccordionItem
            key="8"
            aria-label="¿Hay planes para automatizar el proceso de actualización?"
            title="¿Hay planes para automatizar el proceso de actualización?"
          >
            Sí, la automatización del proceso de actualización es un hecho, solo
            falta la inversion para poder poner un servidor pago que pueda estar
            corriendo tareas de forma automatica. Mientrastanto seguira siendo
            manual.
          </AccordionItem>
          <AccordionItem
            key="9"
            aria-label="¿Cómo se utiliza la información recopilada?"
            title="¿Cómo se utiliza la información recopilada?"
          >
            La información recopilada se utiliza para proporcionar una visión
            general de las variaciones de precios de productos en diferentes
            supermercados, ayudando a los usuarios a tomar decisiones
            informadas.
          </AccordionItem>
        </Accordion>
      </section>
    </main>
  );
}
