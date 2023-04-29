'user client';

import Image from "next/image";

const Avatar = () => {
    return (
        <Image
            alt="user icon"
            className="rounded-full"
            height="25"
            width="25"
            src="/images/placeholder.jpg"
        />
    );
}


export default Avatar;