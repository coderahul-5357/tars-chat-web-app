import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import { ChatShell } from "@/components/layout/ChatShell";

/**
 * Chat layout — protected route.
 * Renders the main chat shell which contains the sidebar + outlet.
 */
export default async function ChatLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { userId } = await auth();
  if (!userId) redirect("/sign-in");

  return <ChatShell>{children}</ChatShell>;
}
