import Link from "next/link";
import { ButtonHTMLAttributes } from "react";

type Props = {
  text: string;
  typeb: "button" | "submit" | undefined;
};

type PropsLink = {
  text: string;
  typeb: "button-link";
  url: string;
  icon?: JSX.Element;
  onlyIcon?: boolean;
};

export default function Button(
  props: (PropsLink | Props) & ButtonHTMLAttributes<HTMLButtonElement>
) {
  const { text, typeb, className, ...rest } = props;

  if (typeb === "button-link") {
    const { url, icon, onlyIcon = false, ...rest } = props;

    return (
      <button
        className={`rounded-md ${onlyIcon ? "p-2" : "px-4 py-2"} flex items-center justify-center bg-[--color-primary] text-white w-full shadow-sm ${className}`}
        type={"button"}
      >
        <Link href={url || "/"} className="flex flex-row gap-1">
          {!onlyIcon && <span>{text}</span>}
          {icon && <i>{icon}</i>}
        </Link>
      </button>
    );
  }

  return (
    <button
      className={`rounded-[20px] px-4 py-2 flex place-content-center bg-[--color-primary] shadow-sm w-full text-white ${className}`}
      type={typeb}
      {...rest}
    >
      {text}
    </button>
  );
}
