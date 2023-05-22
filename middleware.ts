export { default } from "next-auth/middleware";

export const config = {
  matcher: [
    "/reserved",
    "/reservations",
    "/items",
    "/saved"
  ]
};
