import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "comcom",
  description: "real-time collaboration tool.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        {children}
      </body>
    </html>
  );
}
