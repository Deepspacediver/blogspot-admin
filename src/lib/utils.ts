import { clsx, type ClassValue } from "clsx";
import { format } from "date-fns";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const formatDateToAppConvention = (data: Date | string | number) => {
  return format(new Date(data), "MMMM d, yyyy");
};

export const formatDateToDateTimeAttribute = (data: Date | string | number) => {
  return format(new Date(data), "yyyy-MM-dd kk:mm:ss");
};

export const getFormattedDateWithAttribute = (data: Date | string | number) => {
  const attributeDate = formatDateToDateTimeAttribute(data);
  const formattedDate = formatDateToAppConvention(data);
  return {
    attributeDate,
    formattedDate,
  };
};