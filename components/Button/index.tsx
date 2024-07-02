import classNames from "classnames";
import { ButtonHTMLAttributes } from "react";
import { twMerge } from "tailwind-merge";

export function Button({
  className,
  ...rest
}: ButtonHTMLAttributes<HTMLButtonElement>) {
  return (
    <button
      {...rest}
      className={twMerge(
        classNames("p-4 bg-blue-600 text-white hover:bg-blue-500", classNames)
      )}
    />
  );
}
