"use client";
import { useFilterStore } from "@/store/useFilter.store";
import { Input } from "@nextui-org/react";
import { usePathname, useRouter } from "next/navigation";
import { FormEvent, useRef } from "react";
import { IoIosSearch } from "react-icons/io";

export function SearchBar() {
  const inputRef = useRef<HTMLInputElement>(null)
  const pathname = usePathname()
  const router = useRouter()

  const setSearchValue = useFilterStore.use.setSearchValue()
  const handleSubmit = (e: FormEvent<HTMLFormElement>): void => {
    e.preventDefault();
    e.stopPropagation();
    if(pathname !== '/busqueda') {
      router.push('/busqueda')
    }
    setSearchValue(inputRef.current?.value || "")
    if(inputRef.current) {
      inputRef.current.value = ''
    }
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

