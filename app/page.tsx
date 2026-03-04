import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";

/**
 * Root page: redirect authenticated users to /chat,
 * otherwise to the sign-in page.
 */
export default async function HomePage() {
  const { userId } = await auth();
  if (userId) {
    redirect("/chat");
  } else {
    redirect("/sign-in");
  }
}
