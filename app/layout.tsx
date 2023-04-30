import { Nunito } from '@next/font/google';

import './globals.css'
import Navbar from './Components/navbar/Navbar';
import RegisterModal from './Components/RegisterModal';
import ToasterProvider from "./providers/ToasterProvider";

export const metadata  = {
  title: "RentMyStuff", 
  description: "hi",
}

const font = Nunito({ 
  subsets: ["latin"], 
});


export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={font.className}>
        <ToasterProvider />
        <RegisterModal/>
        <Navbar />
        {children}
      </body>
    </html>
  )
}
