import React from "react";

export function Button({ children, className = "", variant, ...props }: any) {
  const base =
    "inline-flex items-center justify-center rounded px-3 py-2 text-sm";
  const ghost = variant === "ghost" ? "bg-transparent" : "";
  const chat =
    variant === "chat"
      ? "w-full bg-amber-400 text-stone-900 font-semibold rounded-lg shadow-md hover:bg-amber-500 transition-all"
      : "";
  const send =
    variant === "send"
      ? "bg-amber-500 text-stone-900 font-semibold rounded-md px-4 py-2 shadow hover:bg-amber-600 transition-all"
      : "";

  return (
    <button
      className={`${base} ${ghost} ${chat} ${send} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
}

export default Button;
