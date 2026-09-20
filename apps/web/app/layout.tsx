import type { Metadata, Viewport } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: {
    default: "Tech Tutor — বাংলায় প্রোগ্রামিং শেখা",
    template: "%s — Tech Tutor",
  },
  description:
    "Tech Tutor: বাংলায় প্রযুক্তি ও প্রোগ্রামিং শেখার সহজ গাইড। HTML, CSS, JavaScript, React, Next.js আরও অনেক কিছু।",
};

export const viewport: Viewport = {
  themeColor: "#0a0f0d",
};

const themeInitScript = `(function(){try{var t=localStorage.getItem("tech-tutor-theme");if(t==="dark"||(!t&&window.matchMedia("(prefers-color-scheme: dark)").matches)){document.documentElement.classList.add("dark")}}catch(e){}})();`;

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="bn" suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeInitScript }} />
      </head>
      <body>{children}</body>
    </html>
  );
}