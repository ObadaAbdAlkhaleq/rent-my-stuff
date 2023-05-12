import { Nunito } from '@next/font/google';

import './globals.css';
import Navbar from './Components/navbar/Navbar';
import RegisterModal from './Components/Modals/RegisterModal';
import LoginModal from './Components/Modals/LoginModal';
import RentModal from './Components/Modals/RentModal';
import ToasterProvider from "./providers/ToasterProvider";
import getCurrentUser from './actions/getCurrentUser';

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
        <ToasterProvider />
        <RegisterModal />
        <LoginModal />
        <RentModal />
        <Navbar currentUser={ currentUser } />
        <div className="pb-20 pt-24">
          { children }
        </div>
      </body>
    </html>
  );
}
