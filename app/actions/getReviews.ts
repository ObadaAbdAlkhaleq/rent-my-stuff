import prisma from "@/app/libs/prismadb";

interface IParams {
  authorId?: string;
  listingId?: string;
  userId?: string;
}

export default async function getReviews(params: IParams) {
  try {

    const { listingId, userId, authorId } = params;
    const query: any = {};
    // reviews of listing
    if (listingId) {
      query.listingId = listingId;
    }
    // reviews of a user in the future users would be able to rate and make reviews of other users
    if (userId) {
      query.userId = userId;
    }
    // reviews made by a user in the future, users will be able to check out the reviews of other users
    if (authorId) {
      query.listing = { userId: authorId };
    }

    const reviews = await prisma.review.findMany({ where: query, include: { listing: true }, orderBy: { rating: "desc" } });

    const safeReviews = reviews.map((review) => ({
      ...review,
      createdAt: review.createdAt.toISOString(),
      // comment: review.comment,
      // rating: review.rating,
      listing: {
        ...review.listing,
        createdAt: review.listing.createdAt.toISOString(),
      }
    })
    );

    return safeReviews;

  } catch (error: any) {
    throw new Error(error);
  }
}