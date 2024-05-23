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
  } flex items-center justify-center bg-[--color-primary] shadow-sm text-white ${className} ${
    !onlyIcon && "w-full"
  }`;

  if (typeb !== "button-link" && onlyIcon) {
    return (
      <button className={buttonClassName} type="button" {...rest}>
        {onlyIcon && props.icon && <i>{props.icon}</i>}
      </button>
    );
  }

  if (typeb === "button-link") {
    const { url, icon, onlyIcon, "aria-label": ariaLabel } = props;
    return (
      <Link
        href={url || "/"}
        className={`${buttonClassName} flex flex-row gap-1`}
        aria-label={ariaLabel}
        target="_blank"
      >
        {onlyIcon && icon && <i>{icon}</i>}
        {!onlyIcon && <span>{text}</span>}
      </Link>
    );
  }

  return (
    <button className={buttonClassName} type={typeb} {...rest}>
      {text}
    </button>
  );
}
