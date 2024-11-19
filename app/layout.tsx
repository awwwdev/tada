import "@unocss/reset/sanitize/sanitize.css";
import "@unocss/reset/tailwind.css";
import "@/styles/reset.css";
import "@/styles/uno.css"; // compiled styles from unocss cli // unocss only create styles for icons (svg-in-css icons with unocss icon preset), other calsses are handled with tailwind
import "@/styles/globals.css";
import "@/public/fonts/nohemi/css/nohemi.css";
import "@/public/fonts/geist/css/geist.css";
import "@/public/fonts/space-mono/css/space-mono.css";
import Providers from "@/components/Provider";
import type { Metadata } from "next";
import MyToaster from "@/components/Toaster";
import { cookies } from "next/headers";
import ReactQueryProvider from "@/components/ReactQueryProvider";
import { Settings } from "@/types";
import 'draft-js/dist/Draft.css';

const title = "Hamid K.";
const description = "A Developer with Design Superpowers";

export const metadata: Metadata = {
  title: {
    template: "%s | Hamid K.",
    default: "Hamid K.",
  },
  alternates: {
    // canonical: '/blog',
  },
  description: description,
  metadataBase: new URL("https://awww.dev"),
  twitter: {
    card: "summary_large_image",
    title: title,
    description: description,
    creator: title,
    images: ["https://awww.dev/opengraph-image.jpg"], // Must be an absolute URL
  },
  openGraph: {
    title: title,
    description: description,
    url: "",
    siteName: "Hamid K.",
    images: [
      {
        url: "https://awww.dev/opengraph-image.jpg", // Must be an absolute URL
        width: 1200,
        height: 630,
      },
    ],
    locale: "en_US",
    type: "website",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const theme = cookies().get("theme")?.value;
  const useSystemTheme = cookies().get("useSystemTheme")?.value === 'true' ? true : false;
  return (
    <html className={`${theme ?? "light"}-theme style-scroll-bar  `} lang="en">
      <head></head>
      <body className={`bg-base3 c-base12 relative isolate  overflow-hidden`}>
        <ReactQueryProvider>
          <Providers theme={theme as Settings["theme"]} useSystemTheme={useSystemTheme}>
            {/* <main className={`  max-w-screen max-h-full`}>{children}</main> */}
            {children}
            <MyToaster />
          </Providers>
        </ReactQueryProvider>
      </body>
    </html>
  );
}
