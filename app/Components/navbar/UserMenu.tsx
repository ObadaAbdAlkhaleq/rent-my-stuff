'use client';

import Avatar from "../Avatar";
import MenuItem from "./MenuItem";
import useRegisterModal from "@/app/hooks/useRegisterModal";
import useLoginModal from "@/app/hooks/useLoginModal";
import useRentModal from "@/app/hooks/useRentModal";

import { AiOutlineMenu } from "react-icons/ai";
import { useCallback, useEffect, useRef, useState } from "react";
import { SafeUser } from "@/app/types";
import { signOut } from "next-auth/react";
import { useRouter } from "next/navigation";

interface UserMenuProps {
    currentUser?: SafeUser | null;
}

const UserMenu: React.FC<UserMenuProps> = ({ currentUser }) => {
    const router = useRouter();
    const registerModal = useRegisterModal();
    const loginModal = useLoginModal();
    const rentModal = useRentModal();
    const [ isOpen, setIsOpen ] = useState(false);
    const menuRef = useRef<HTMLDivElement>(null);

    const handleClickOutsideMenu = useCallback(
        (event: MouseEvent) => {
            if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
                setIsOpen(false);
            }
        },
        []
    );

    const toggleOpen = useCallback(() => {
        setIsOpen((value) => !value);

    }, []);
    useEffect(() => {
        document.body.addEventListener('click', handleClickOutsideMenu);

        return () => {
            document.body.removeEventListener('click', handleClickOutsideMenu);
        };
    }, [ handleClickOutsideMenu ]);

    const onRent = useCallback(() => {
        // if user isnt logged in, prompt up login modal
        if (!currentUser) {
            return loginModal.onOpen();
        }

        // else prompt the list item modal
        rentModal.onOpen();
        // console.log("rent modal opened");

    }, [ loginModal, currentUser ]);

    const handleClickInsideMenu = useCallback(() => {
        setIsOpen(false);
    }, []);

    return (
        <div className="relative" ref={ menuRef }>
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
                    onClick={ handleClickInsideMenu }
                >
                    <div className="flex flex-col cursor-pointer">
                        { currentUser ? (
                            <>
                                <MenuItem
                                    onClick={ () => router.push('/') }
                                    label="Home"
                                />
                                <hr />
                                <MenuItem
                                    onClick={ () => router.push('/reserved') }
                                    label="Reserved Items"
                                />
                                <MenuItem
                                    onClick={ () => router.push('/saved') }
                                    label="Saved"
                                />
                                <MenuItem
                                    onClick={ () => router.push('/reservations') }
                                    label="Reservation"
                                />
                                <MenuItem
                                    onClick={ () => router.push('/items') }
                                    label="My Items"
                                />
                                <MenuItem
                                    onClick={ onRent }
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