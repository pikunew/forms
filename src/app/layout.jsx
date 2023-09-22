import "./globals.css";
import { Inter } from "next/font/google";
import Head from "next/head";
const inter = Inter({ subsets: ["latin"] });

export const metadata = {
    title: "Forms",
    description: "Forms task",
};

export default function RootLayout({ children }) {
    return (
        <html lang="en">
            <Head>
                <meta
                    http-equiv="Content-type"
                    content="text/html; charset=UTF-8"
                />
            </Head>
            <body className={inter.className}>{children}</body>
        </html>
    );
}
