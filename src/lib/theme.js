import { writable } from 'svelte/store';

let storedTheme = 'light';

if (typeof window !== 'undefined') {
  storedTheme = localStorage.getItem('theme') || 'light';
}

export const theme = writable(storedTheme);

if (typeof window !== 'undefined') {
  theme.subscribe(value => {
    localStorage.setItem('theme', value);
    if (value === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  });
}
