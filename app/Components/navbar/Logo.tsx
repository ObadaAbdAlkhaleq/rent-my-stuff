'use client';
import Image from "next/image";
import { useRouter } from "next/navigation";

const Logo = () => {
    const router = useRouter();
    return (
        // <Image
        //     onClick={() => router.push('/')}
        //     alt="logo"
        //     className=" hidden md:block cursor-pointer"
        //     height="100"
        //     width="100"
        //     src="/images/logo.png"
        // />
        <div
            onClick={ () => router.push('/') }
            className="text-xl font-bold text-blue-600  hidden md:block cursor-pointer select-none"
        >
            RentMyStuff
        </div>
    );
};
export default Logo;