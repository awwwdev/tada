import Providers from "@/components/Provider";
import ReactQueryProvider from "@/components/ReactQueryProvider";
import MyToaster from "@/components/Toaster";
import "@/public/fonts/geist/css/geist.css";
import "@/public/fonts/nohemi/css/nohemi.css";
import "@/public/fonts/space-mono/css/space-mono.css";
import "@/styles/globals.css";
import "@/styles/reset.css";
import "@/styles/uno.css"; // compiled styles from unocss cli // unocss only create styles for icons (svg-in-css icons with unocss icon preset), other calsses are handled with tailwind
import "@unocss/reset/sanitize/sanitize.css";
import "@unocss/reset/tailwind.css";
import type { Metadata } from "next";
import { cookies } from "next/headers";
// import { Settings } from "@/types";
import TaskDetailsPanel from "@/components/DetailsPanel/DetailsPanel";
import SettingsDrawer from "@/components/SettingsDrawer";
import SideMenu from "@/components/SideMenu";
import { getQueryClient } from "@/react-query/getQueryClient";
import { createClientForServer } from "@/utils/supabase/server";
import "draft-js/dist/Draft.css";

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

const queryClient = getQueryClient();

queryClient.prefetchQuery({
  queryKey: ['userMe'],
  queryFn: async () => {
    const supabase = createClientForServer();
    const { data, error } = await supabase.auth.getUser();
    if (error) throw error;
    if (!data.user) return null;
    const { data: userView, error: userViewError } = await supabase.from("user_view").select().eq("id", data.user.id).single();
    if (userViewError) throw userViewError;
    return userView;  
  }
})

  const theme = cookies().get("theme")?.value;
  const useSystemTheme = cookies().get("useSystemTheme")?.value === "true" ? true : false;

  return (
    <html className={`${theme ?? "light"}-theme style-scroll-bar`} lang="en">
      <head></head>
      <body className={`bg-base3 c-base12 relative isolate  overflow-hidden`}>
        <ReactQueryProvider>
          <Providers theme={theme} useSystemTheme={useSystemTheme}>
            {/* <main className={`  max-w-screen max-h-full`}>{children}</main> */}
            <div className="grid gap-6 h-[100vh] w-[100vw]" style={{ gridTemplateRows: "1fr" }}>
              <main
                className={`grid  overflow-hidden 
        grid-cols-[1fr]
        sm:grid-cols-[min(20%,15rem)_3fr_3fr]`}
              >
                <SideMenu />
                <div className="grid gap-0 py-6 overflow-hidden " style={{ gridTemplateRows: "1fr auto" }}>
                  {/* <UserOrSmartList /> */}
                  {children}
                  {/* <TaskInput /> */}
                </div>
                <TaskDetailsPanel />
              </main>
              <SettingsDrawer />
            </div>
            <MyToaster />
          </Providers>
        </ReactQueryProvider>
      </body>
    </html>
  );
}
