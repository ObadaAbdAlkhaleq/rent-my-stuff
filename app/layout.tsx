import { Nunito } from '@next/font/google';

import './globals.css';
import Navbar from './Components/navbar/Navbar';
import RegisterModal from './Components/Modals/RegisterModal';
import LoginModal from './Components/Modals/LoginModal';
import RentModal from './Components/Modals/RentModal';
import ToasterProvider from "./providers/ToasterProvider";
import getCurrentUser from './actions/getCurrentUser';
import ClientOnly from './Components/ClientOnly';
import SearchModal from './Components/Modals/SearchModal';
import Providers from './providers';
import HeroSection from './Components/HeroSection';
import Categories from './Components/navbar/Categories';


export const metadata = {
  title: "RentMyStuff",
  description: "hi",
};

const font = Nunito({
  subsets: [ "latin" ],
});


export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {

  const currentUser = await getCurrentUser();

  return (
    <html lang="en">
      <body className={ font.className }>
        <ClientOnly>
          <ToasterProvider />
          <RegisterModal />
          <LoginModal />
          <RentModal />
          <SearchModal />
          <Navbar currentUser={ currentUser } />
        </ClientOnly>
        <Providers>
          <HeroSection />
          <div className="">
          </div>
          <div className="pb-20">
            <div className="top-[4.525rem] bg-white shadow-lg sticky z-50">
              <Categories />
            </div>
            <div className="">
              { children }
            </div>
          </div>
        </Providers>
      </body>
    </html>
  );
}
