import { NextResponse } from "next/server";

import prisma from "@/app/libs/prismadb";
import getCurrentUser from "@/app/actions/getCurrentUser";

export async function POST(req: Request) {

  const currentUser = await getCurrentUser();

  if (!currentUser) return NextResponse.error();

  const body = await req.json();
  const { listingId, comment, rating } = body;

  if (!listingId || !comment || !rating) return NextResponse.error();

  const listingAndReviews = await prisma.listing.update({
    where: { id: listingId },
    data: {
      reviews: {
        create: { userId: currentUser.id, comment, rating: Number(rating) }
      }
    }
  });

  return NextResponse.json(listingAndReviews);
}
