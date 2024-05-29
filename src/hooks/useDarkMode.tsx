import { useState, useEffect } from 'react';

const useDarkMode = () => {
  // Estado para almacenar si el esquema de color es dark
  const [isDarkMode, setIsDarkMode] = useState(false);

  useEffect(() => {
    // Función que actualiza el estado según el esquema de color
    const updateDarkMode = (e: any) => {
      setIsDarkMode(e.matches);
    };

    // Media query para detectar el esquema de color
    const darkModeMediaQuery = window.matchMedia('(prefers-color-scheme: dark)');

    // Establecer el estado inicial
    setIsDarkMode(darkModeMediaQuery.matches);

    // Agregar listener para cambios en el esquema de color
    darkModeMediaQuery.addEventListener('change', updateDarkMode);

    // Limpiar el listener al desmontar el componente
    return () => {
      darkModeMediaQuery.removeEventListener('change', updateDarkMode);
    };
  }, []);

  return isDarkMode;
};

export default useDarkMode;