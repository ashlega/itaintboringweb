import "../styles/tailwind.css";
import "../styles/slick.css";

import Head from 'next/head';

export const metadata = {
    title: 'Home',
    description: 'Welcome to Next.js', 
}


export default function RootLayout({
    // Layouts must accept a children prop.
    // This will be populated with nested layouts or pages
    children,
  }) 
  
  {
    return (
      <html lang="en">
        <Head>
        <link rel="preconnect" href="https://fonts.gstatic.com" />
        <link
        href="https://fonts.googleapis.com/css2?family=Rubik:ital,wght@0,400;0,500;0,600;0,700;1,300&display=swap"
        rel="stylesheet"
        />
        </Head>
        <body>{children}</body>
      </html>

    )
  }


  