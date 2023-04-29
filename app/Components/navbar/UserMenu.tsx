'use client';

import { AiOutlineMenu } from "react-icons/ai";
import Avatar from "../Avatar";
import { useCallback, useState } from "react";
import MenuItem from "./MenuItem";

const UserMenu = () => {

    const [isOpen, setIsOpen] = useState(false);
    const toggleOpen = useCallback(() => {
        setIsOpen((value) => !value);
    }, []);

    return (
        <div className="relative">
            <div className="flex flex-row items-center gap-3">
                <div
                    className="hidden md:block font-semibold text-sm py-2 px-3 rounded-full hover:bg-neutral-100 transition cursor-pointer"
                    onClick={toggleOpen}
                >
                    List your stuff
                </div>
                <div
                    onClick={toggleOpen}
                    className=" flex flex-row border border-neutral-200 p4 md:py-1 md:px-2 rounded-full items-center gap-3 cursor-pointer hover:shadow-md transition"
                >
                    <AiOutlineMenu />
                    <div className="hidden md:block">
                        <Avatar />
                    </div>
                </div>
            </div>

            {isOpen && (
                <div
                    className="absolute rounded-xl shadow-md bg-white w-[40vw] right-0 top-12 overflow-hidden text-sm md:w-3/4"
                >
                    <div className="flex flex-col cursor-pointer">
                        <>
                            <MenuItem
                                onClick={() => { }}
                                label="Login"
                            />
                            <MenuItem
                                onClick={() => { }}
                                label="Signup"
                            />
                        </>
                    </div>
                </div>
            )}
        </div>
    );
}

export default UserMenu;