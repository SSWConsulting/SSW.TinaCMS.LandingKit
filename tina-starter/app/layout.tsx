import React from "react";
import "ssw-tinacms-landingkit/dist/style.css";
import "../styles.css";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body
        style={{
          margin: "3rem",
        }}
      >
        <main>{children}</main>
      </body>
    </html>
  );
}
