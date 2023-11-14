import localFont from 'next/font/local';

export const gillSans = localFont({
  src: [
    {
      path: './gill-sans/Gill Sans Light.otf',
      weight: '100',
      style: 'normal',
    },
    {
      path: './gill-sans/Gill Sans Light Italic.otf',
      weight: '100',
      style: 'italic',
    },
    {
      path: './gill-sans/Gill Sans.otf',
      weight: '400',
      style: 'normal',
    },
    {
      path: './gill-sans/Gill Sans Italic.otf',
      weight: '400',
      style: 'italic',
    },
    {
      path: './gill-sans/Gill Sans Medium.otf',
      weight: '700',
      style: 'normal',
    },
    {
      path: './gill-sans/Gill Sans Medium Italic.otf',
      weight: '700',
      style: 'italic',
    },
    {
      path: './gill-sans/Gill Sans Bold.otf',
      weight: '900',
      style: 'normal',
    },
    {
      path: './gill-sans/Gill Sans Bold Italic.otf',
      weight: '900',
      style: 'italic',
    },
  ],
  variable: '--font-gillSans',
});
