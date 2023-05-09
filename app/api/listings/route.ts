import { NextResponse } from "next/server";

import prisma from "@/app/libs/prismadb";
import getCurrentUser from "@/app/actions/getCurrentUser";

export async function POST(req: Request){
  const currentUser = await getCurrentUser();
  if (!currentUser) return NextResponse.error();

  const body = await req.json();
  const {
    category,
    location,
    condition,
    usage,
    imageSrc,
    title,
    description,
    price
  } = body;

  const listing = await prisma.listing.create({
    data: { 
      category, 
      locationValue: location.value, 
      conditionValue: condition.value, 
      usage, 
      imageSrc, 
      title, 
      description, 
      price: parseInt(price, 10), 
      userId: currentUser.id
    }
  });

  return NextResponse.json(listing);
}
