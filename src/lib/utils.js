import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs) {
  return twMerge(clsx(inputs));
}

export function formatPrice(price) {
  const formatedPrice = Number(price).toFixed(2);

  return `$ ${formatedPrice}`;
}
