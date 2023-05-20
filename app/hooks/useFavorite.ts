import axios from "axios";
import { useRouter } from "next/navigation";
import { useCallback, useMemo } from "react";
import { safeUser } from "../types";
import useLoginModal from "./useLoginModal";
import { toast } from "react-hot-toast";


interface IUseFavorite {
  listingId: string;
  currentUser?: safeUser | null;
}

const useFavorite = ({ listingId, currentUser }: IUseFavorite) => {
  const router = useRouter();
  const loginModal = useLoginModal();

  const hasFavorited = useMemo(() => {
    const list = currentUser?.favoriteIds || [];
    return list.includes(listingId);
  }, [ currentUser, listingId ]);

  const toggleFavorite = useCallback(async (e: React.MouseEvent<HTMLDivElement>) => {
    e.stopPropagation();

    if (!currentUser) return loginModal.onOpen();

    try {
      let request;

      if (hasFavorited) {
        request = () => axios.delete(`/api/favorites/${listingId}`);
      } else {
        request = () => axios.post(`/api/favorites/${listingId}`);
      }

      await request();
      router.refresh();
      toast.success('Success');

    } catch {
      toast.error('something went wrong');
    }
  }, [ currentUser, hasFavorited, listingId, loginModal, router ]);

  return {
    hasFavorited, toggleFavorite
  };
};

export default useFavorite;