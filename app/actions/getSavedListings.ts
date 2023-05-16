import prisma from "@/app/libs/prismadb";
import getCurrentUser from "./getCurrentUser";

export default async function getSavedListings() {
  try {

    const currentUser = await getCurrentUser();
    if (!currentUser) return [];

    const saved = await prisma.listing.findMany({
      where: {
        id: { in: [ ...(currentUser.favoriteIds || []) ] }
      }
    });

    const safeSaved = saved.map((saved) => ({
      ...saved,
      createdAt: saved.createdAt.toISOString()
    }));

    return safeSaved;
  } catch (error: any) {
    throw new Error(error);
  }
}