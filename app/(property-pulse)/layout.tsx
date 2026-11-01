import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "@/modules/property-pulse/assets/style/globals.css";
import Navbar from "@/modules/property-pulse/components/Navbar";
import Footer from "@/modules/property-pulse/components/Footer";
import AuthProvider from "@/modules/property-pulse/components/AuthProvider";
import { ToastContainer } from "react-toastify";
import "react-toastify/ReactToastify.css";
import { GlobalContextProvider } from "@/modules/property-pulse/context/GlobalContext";
import "photoswipe/dist/photoswipe.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Property Pulse",
  description: "Find the perfect rental property.",
  robots: { index: false, follow: false },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <AuthProvider>
      <GlobalContextProvider>
        <html
          lang="en"
          className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
        >
          <body className="min-h-full flex flex-col">
            <Navbar />
            <main>{children}</main>
            <Footer />
            <ToastContainer />
          </body>
        </html>{" "}
      </GlobalContextProvider>
    </AuthProvider>
  );
}
