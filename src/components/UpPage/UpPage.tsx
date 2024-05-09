"use client";
import { useWindowScroll } from "@/hooks/useWindowScroll";
import { useEffect, useState } from "react";
import { FaChevronUp } from "react-icons/fa";

interface WindowScrollState {
  x: number | null;
  y: number | null;
}

export function UpPage() {
  const [state] = useWindowScroll();
  const { y }: WindowScrollState = state as WindowScrollState;
  const [isVisible, setIsVisible] = useState<boolean>(false);

  useEffect(() => {
    if (y !== null) {
      setIsVisible(y > 200);
    }
  }, [y]);

  return (
    <button
    onClick={(e) => {
        e.preventDefault();
        window.scroll({behavior: 'smooth', top: 0})
    }}
      className={`rounded-full w-16 h-16 flex justify-center items-center bg-[--color-primary] fixed right-10 bottom-10 z-10 ${
        isVisible ? "visible" : "invisible"
      }`}
    >
      <FaChevronUp fill="white" />
    </button>
  );
}
