import { type ClassValue, clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'

import { customAlphabet } from 'nanoid';
 
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function absoluteUrl(path:string){
  return `${process.env.NEXT_PUBLIC_APP_URL}${path}`
}


export function generateId(){
  const alphabet = '0123456789_abcdefghijklmnopqrstuvwxyz-';
  const nanoid = customAlphabet(alphabet, 13);
  let id = nanoid() //=> "rw98h"
  return id
}

export function formatDateToDdMmWeek(date:Date) {
  const day = String(date.getDate()).padStart(2, '0'); // Ensure two digits
  const month = String(date.getMonth() + 1).padStart(2, '0'); // Months are 0-indexed
  const year = String(date.getFullYear()).slice(-2); // Get the last two digits of the year
  const daysOfWeek = ['dom', 'seg', 'ter', 'qua', 'qui', 'sex', 'sáb'];
  const dayOfWeekAbbr = daysOfWeek[date.getDay()];
  // return `${day}/${month}/${year}`;
  return `${day}/${month} ${dayOfWeekAbbr}`;
}

export function formatDateToDdMmYy(date:Date) {
  const day = String(date.getDate()).padStart(2, '0'); // Ensure two digits
  const month = String(date.getMonth() + 1).padStart(2, '0'); // Months are 0-indexed
  const year = String(date.getFullYear()).slice(-2); // Get the last two digits of the year
  const daysOfWeek = ['dom', 'seg', 'ter', 'qua', 'qui', 'sex', 'sáb'];
  const dayOfWeekAbbr = daysOfWeek[date.getDay()];
  // return `${day}/${month}/${year}`;
  return `${day}/${month}/${year.padEnd(2, '0')}`;
}

export const isOffline = async () => {
  'use client'
  if (!navigator.onLine) {
      window.alert("Você está offline, conecte a internet e tente novamente")
      return true
  }
  return false
}

export function randomElement<T>(array: Array<T>): T {
  return array[Math.floor(Math.random() * array.length)]
}

export * from './cssVar'


