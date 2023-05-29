'user client';

import Image from "next/image";

interface avatarProps {
    imageSrc?: string | null;
    height?: number | null;
    width?: number | null;
}

const Avatar: React.FC<avatarProps> = ({ imageSrc, width, height }) => {
    return (
        <Image
            alt="user icon"
            className="rounded-full"
            height={ height ? height : "25" }
            width={ width ? width : "25" }
            src={ imageSrc ? imageSrc : "/images/placeholder.jpg" }
        />
    );
};


export default Avatar;