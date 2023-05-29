import getCurrentUser from "@/app/actions/getCurrentUser";
import { NextResponse } from "next/server";
import prisma from "@/app/libs/prismadb";
import { UserRole } from "@prisma/client";

interface IParams {
  reservationId?: string;
}

export async function DELETE(request: Request, { params }: { params: IParams; }) {
  const currentUser = await getCurrentUser();
  if (!currentUser) return NextResponse.error();

  const { reservationId } = params;

  if (!reservationId || typeof reservationId !== 'string') {
    throw new Error('Invalid ID');
  }

  const reservation = await prisma.reservation.deleteMany({
    where: {
      id: reservationId, OR: [
        // {role: currentUser.role === UserRole.ADMIN},
        { userId: currentUser.id },
        { listing: { userId: currentUser.id } }
      ]
    }
  });
  return NextResponse.json(reservation);
}