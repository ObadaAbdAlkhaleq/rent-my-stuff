'use client';

import Container from "../Container";
import Logo from "./Logo";
import Search from "./Search";
import UserMenu from "./UserMenu";
import Categories from "./Categories";
import { SafeUser } from "@/app/types";
// import { useState } from "react";
// import { useRouter } from "next/router";

interface NavbarProps {
    currentUser?: SafeUser | null;
}

const Navbar: React.FC<NavbarProps> = ({ currentUser }) => {
    // const [ narrowNavbar, setNarrowNavbar ] = useState(false);
    // const router = useRouter();
    //  max-w-screen-lg mx-auto 

    return (
        <div className="fixed w-full bg-white z-50 shadow-sm">
            <div className=" py-4 border-b-[1px]">
                <Container>
                    <div className="flex flex-row items-center justify-between gap-3 md:gap-0">
                        <Logo />
                        <Search />
                        <UserMenu currentUser={ currentUser } />
                    </div>
                </Container>
            </div>
            <Categories />
        </div>
    );
};

export default Navbar;