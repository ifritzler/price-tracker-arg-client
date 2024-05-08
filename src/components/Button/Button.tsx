import Link from "next/link";
import { ButtonHTMLAttributes } from "react";

type Props = {
  text: string;
  typeb: "button" | "submit" | undefined;
  onlyIcon?: boolean;
  icon?: JSX.Element;
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
  const { text, typeb, className, onlyIcon, ...rest } = props;

  const buttonClassName = `rounded-md ${
    onlyIcon ? "p-2" : "px-4 py-2"
  } flex items-center justify-center bg-[--color-primary] text-white shadow-sm ${className} ${
    !onlyIcon && "w-full"
  }`;

  if (typeb === "button-link") {
    const { url, icon, onlyIcon } = props;
    return (
      <button className={buttonClassName} type="button" {...rest}>
        <Link href={url || "/"} className="flex flex-row gap-1">
          {!onlyIcon && <span>{text}</span>}
          {icon && <i>{icon}</i>}
        </Link>
      </button>
    );
  }

  return (
    <button className={buttonClassName} type={typeb} {...rest}>
      {text}
    </button>
  );
}
