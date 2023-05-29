import { Listing, Reservation, Review, User } from "@prisma/client";

export type SafeListing = Omit<Listing, "createdAt"> & {
  createdAt: string;
};

export type SafeReservation = Omit<Reservation, "createdAt" | "startDate" | "endDate" | "listing"> & {
  createdAt: string;
  startDate: string;
  endDate: string;
  listing: SafeListing;
};

export type SafeReviews = Omit<Review, "createdAt" | "comment" | "rating" | "listing"> & {
  createdAt: string;
  comment: string;
  rating: number;
  listing: SafeListing;
};

export type SafeUser = Omit<User, "createdAt" | "updatedAt" | "emailVerified"> & {
  createdAt: string;
  updatedAt: string;
  emailVerified: string | null;
};

