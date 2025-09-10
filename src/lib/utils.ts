import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function roundIfNumber(value: number | string | undefined | null): string {
  if (typeof value === 'number') {
    return value.toFixed(1);
  } else if (typeof value === 'string' && !isNaN(Number(value))) {
    return parseFloat(value).toFixed(1);
  }
  return '0.00';
}

export function convertDate(date:Date):string{
  const converteddate = new Date(date);
  const day = converteddate.getDate()
  const month = converteddate.getMonth()+1
  const year = converteddate.getFullYear()

  const formattedDate = `${year}/${month}/${day}`
  return formattedDate;
}

export const PRICE_ID:string = 'price_1RrfJSGD6YmpEp4R06bzw7MC'