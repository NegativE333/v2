import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
    variable: "--font-geist-sans",
    subsets: ["latin"],
});

const geistMono = Geist_Mono({
    variable: "--font-geist-mono",
    subsets: ["latin"],
});

export const metadata: Metadata = {
    title: "Oh Unde! Anthem (ft. Rushi Unde)",
    description: "A musical tribute to the man who prioritizes Vada Pav over Deadlines. Watch the premiere now.",
    keywords: ["Oh Unde!", "Marine Drive", "Rushi Unde", "Vada Pav", "Deadline", "Lazy Sunday"],
    openGraph: {
        title: "Oh Unde! Anthem (ft. Rushi Unde)",
        description: "A musical tribute to the man who prioritizes Vada Pav over Deadlines. Watch the premiere now.",
        type: "website",
        images: [
            {
                url: "/unde-og.png",
                width: 1200,
                height: 630,
                alt: "Oh Unde! Anthem (ft. Rushi Unde)",
            },
        ],
    },
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en">
            <body className={`${geistSans.variable} ${geistMono.variable}`}>
                {children}
            </body>
        </html>
    );
}
