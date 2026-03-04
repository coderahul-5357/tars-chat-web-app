import type { Metadata } from "next";
import { ClerkProvider } from "@clerk/nextjs";
import { ConvexClientProvider } from "@/components/providers/ConvexClientProvider";
import "./globals.css";

export const metadata: Metadata = {
  title: "TarsChat — Real-Time Messaging",
  description: "Real-time chat built with Next.js, Convex, and Clerk",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="h-full">
      <body className="h-full">
        {/* ClerkProvider wraps everything for auth */}
        <ClerkProvider>
          {/* ConvexClientProvider sets up the Convex React client */}
          <ConvexClientProvider>{children}</ConvexClientProvider>
        </ClerkProvider>
      </body>
    </html>
  );
}
