'use client';

import Avatar from "../Avatar";
import MenuItem from "./MenuItem";
import useRegisterModal from "@/app/hooks/useRegisterModal";
import useLoginModal from "@/app/hooks/useLoginModal";
import useRentModal from "@/app/hooks/useRentModal";

import { AiOutlineMenu } from "react-icons/ai";
import { useCallback, useState } from "react";
import { User } from "@prisma/client";
import { signOut } from "next-auth/react";

interface UserMenuProps {
    currentUser?: User | null;
}

const UserMenu: React.FC<UserMenuProps> = ({ currentUser }) => {
    const registerModal = useRegisterModal();
    const loginModal = useLoginModal();
    const rentModal = useRentModal();
    const [ isOpen, setIsOpen ] = useState(false);
    const toggleOpen = useCallback(() => {
        setIsOpen((value) => !value);
    }, []);

    const onRent = useCallback(() => {
        // if user isnt logged in, prompt up login modal
        if (!currentUser) {
            return loginModal.onOpen();
        }

        // else prompt the list item modal
        rentModal.onOpen();
        console.log("rent modal opened");

    }, [ loginModal, currentUser ]);

    return (
        <div className="relative">
            <div className="flex flex-row items-center gap-3">
                <div
                    className="hidden md:block font-semibold text-sm py-2 px-3 rounded-full hover:bg-neutral-100 transition cursor-pointer"
                    onClick={ onRent }
                >
                    List your stuff
                </div>
                <div
                    onClick={ toggleOpen }
                    className=" flex flex-row border border-neutral-200 p4 md:py-1 md:px-2 rounded-full items-center gap-3 cursor-pointer hover:shadow-md transition"
                >
                    <AiOutlineMenu />
                    <div className="hidden md:block">
                        <Avatar />
                    </div>
                </div>
            </div>

            { isOpen && (
                <div
                    className="absolute rounded-xl shadow-md bg-white w-[40vw] right-0 top-12 overflow-hidden text-sm md:w-3/4"
                >
                    <div className="flex flex-col cursor-pointer">
                        { currentUser ? (
                            <>
                                <MenuItem
                                    onClick={ () => { } }
                                    label="Rented"
                                />
                                <MenuItem
                                    onClick={ () => { } }
                                    label="Favorites"
                                />
                                <MenuItem
                                    onClick={ () => { } }
                                    label="Reservation"
                                />
                                <MenuItem
                                    onClick={ () => { } }
                                    label="My Items"
                                />
                                <MenuItem
                                    onClick={ () => { } }
                                    label="List your stuff"
                                />
                                <div className="flex-grow border-t "></div>
                                <MenuItem
                                    onClick={ () => signOut() }
                                    label="Sign Out"
                                />
                            </>
                        ) : (
                            <>
                                <MenuItem
                                    onClick={ loginModal.onOpen }
                                    label="Login"
                                />
                                <MenuItem
                                    onClick={ registerModal.onOpen }
                                    label="Signup"
                                />
                            </>
                        ) }
                    </div>
                </div>
            ) }
        </div>
    );
};

export default UserMenu;