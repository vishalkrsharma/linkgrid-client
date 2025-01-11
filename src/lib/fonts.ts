import localFont from 'next/font/local';

export const notoSans = localFont({
  src: [
    { path: '../fonts/noto-sans.woff2', weight: '100 900', style: 'normal' },
    { path: '../fonts/noto-sans.woff', weight: '100 900', style: 'normal' },
  ],
  display: 'swap',
  variable: '--font-noto-sans',
});
