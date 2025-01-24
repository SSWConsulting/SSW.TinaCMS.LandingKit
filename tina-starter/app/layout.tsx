import React from "react";
import "ssw-tinacms-landingkit/dist/style.css";
import "../styles.css";

import { Inter } from "next/font/google";

const inter = Inter({
  variable: "--inter-font",
  subsets: ["latin"],
  display: "swap",
  weight: ["200", "300", "400", "500", "600", "700"],
});


export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${inter.className}`}>
      <body
        className="bg-black"
        style={{
          margin: "3rem",
        }}
      >
        <main>{children}</main>
      </body>
    </html>
  );
}
