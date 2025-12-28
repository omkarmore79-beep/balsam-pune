import "./globals.css";
import { Inter } from "next/font/google";
import localFont from "next/font/local";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

const allura = localFont({
  src: "../public/fonts/allura.ttf",
  variable: "--font-allura",
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body
        className={`${inter.variable} ${allura.variable}`}
        style={{ backgroundColor: "#eaeaea" }}
      >
        {/* OUTER BACKGROUND */}
        <div className="min-h-screen w-full flex justify-center">
          {/* FORCED MOBILE VIEW */}
          <div
            className="w-[390px] min-h-screen overflow-hidden"
            style={{ backgroundColor: "#f1eae0", color: "#465966" }}
          >
            {children}
          </div>
        </div>
      </body>
    </html>
  );
}
