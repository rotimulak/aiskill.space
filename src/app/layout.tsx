import type { Metadata } from "next";
import localFont from "next/font/local";
import Script from "next/script";
import "./globals.css";

const geistSans = localFont({
  src: "../../public/fonts/GeistVF.woff2",
  variable: "--font-geist-sans",
  weight: "100 900",
});

const geistMono = localFont({
  src: "../../public/fonts/GeistMonoVF.woff2",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: "Envise — AI-агенты для автоматизации бизнеса",
  description: "Создавайте AI-воркфлоу без программирования. Исследования, контент, документы — автоматически. GPT, Claude, локальные модели.",
  keywords: ["AI", "автоматизация", "воркфлоу", "AI-агенты", "GPT", "Claude", "no-code", "бизнес-автоматизация"],
  authors: [{ name: "Envise" }],
  openGraph: {
    title: "Envise — AI-агенты для автоматизации бизнеса",
    description: "Создавайте AI-воркфлоу без программирования. Исследования, контент, документы — автоматически.",
    url: "https://envise.space",
    siteName: "Envise",
    locale: "ru_RU",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Envise — AI-агенты для автоматизации бизнеса",
    description: "Создавайте AI-воркфлоу без программирования.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ru">
      <head>
        <Script id="yandex-metrika" strategy="afterInteractive">
          {`
            (function(m,e,t,r,i,k,a){
              m[i]=m[i]||function(){(m[i].a=m[i].a||[]).push(arguments)};
              m[i].l=1*new Date();
              for (var j = 0; j < document.scripts.length; j++) {if (document.scripts[j].src === r) { return; }}
              k=e.createElement(t),a=e.getElementsByTagName(t)[0],k.async=1,k.src=r,a.parentNode.insertBefore(k,a)
            })(window, document,'script','https://mc.yandex.ru/metrika/tag.js?id=105676029', 'ym');
            ym(105676029, 'init', {ssr:true, webvisor:true, clickmap:true, ecommerce:"dataLayer", accurateTrackBounce:true, trackLinks:true});
          `}
        </Script>
        <noscript>
          <div>
            <img src="https://mc.yandex.ru/watch/105676029" style={{position: 'absolute', left: '-9999px'}} alt="" />
          </div>
        </noscript>
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
