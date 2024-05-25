"use client";
import { useFilterContext } from "@/contexts/DashBoardFiltersContext";
import { Input } from "@nextui-org/react";
import { useRouter, useSearchParams } from "next/navigation";
import { FormEvent, useRef } from "react";
import { IoIosSearch } from "react-icons/io";

interface SearchProps {
  //   onSubmit: (text: string) => void;
}
export function SearchBar(props: SearchProps) {
  const searchParams = useSearchParams();
  const inputRef = useRef<HTMLInputElement>(null)

  const { setFilters } = useFilterContext()
  const handleSubmit = (e: FormEvent<HTMLFormElement>): void => {
    e.preventDefault();
    e.stopPropagation();

    const stringParams = searchParams.toString();
    const newParams = new URLSearchParams(stringParams);
    newParams.set("q", inputRef.current?.value || "");

    setFilters({searchValue: inputRef.current?.value})
  };

  return (
    <form id="search" onSubmit={handleSubmit}>
      <Input
        classNames={{
          base: "max-w-full sm:max-w-[10rem] h-10",
          mainWrapper: "h-full",
          input: "text-small",
          inputWrapper:
            "h-full font-normal text-default-500 bg-default-400/20 dark:bg-default-500/20",
        }}
        placeholder="Ej: Mostacholes"
        size="sm"
        startContent={<IoIosSearch size={18} />}
        type="search"
        name="search"
        ref={inputRef}
      />
    </form>
  );
}

