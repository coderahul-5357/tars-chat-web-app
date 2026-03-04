import { Webhook } from "svix";
import { headers } from "next/headers";
import { NextResponse } from "next/server";
import { ConvexHttpClient } from "convex/browser";
import { api } from "@/convex/_generated/api";

/**
 * POST /api/webhooks/clerk
 *
 * Receives Clerk user.created / user.updated events and syncs
 * the user profile to Convex.
 *
 * Configure in Clerk Dashboard → Webhooks:
 *   URL: https://<your-domain>/api/webhooks/clerk
 *   Events: user.created, user.updated
 */
export async function POST(req: Request) {
  const webhookSecret = process.env.CLERK_WEBHOOK_SECRET;
  if (!webhookSecret) {
    return NextResponse.json({ error: "Webhook secret not configured" }, { status: 500 });
  }

  const headerPayload = await headers();
  const svix_id = headerPayload.get("svix-id");
  const svix_timestamp = headerPayload.get("svix-timestamp");
  const svix_signature = headerPayload.get("svix-signature");

  if (!svix_id || !svix_timestamp || !svix_signature) {
    return NextResponse.json({ error: "Missing svix headers" }, { status: 400 });
  }

  const body = await req.text();
  const wh = new Webhook(webhookSecret);

  let event: {
    type: string;
    data: {
      id: string;
      email_addresses: Array<{ email_address: string }>;
      first_name: string | null;
      last_name: string | null;
      image_url: string;
    };
  };

  try {
    event = wh.verify(body, {
      "svix-id": svix_id,
      "svix-timestamp": svix_timestamp,
      "svix-signature": svix_signature,
    }) as typeof event;
  } catch {
    return NextResponse.json({ error: "Webhook verification failed" }, { status: 400 });
  }

  if (event.type === "user.created" || event.type === "user.updated") {
    const { data } = event;
    const name =
      [data.first_name, data.last_name].filter(Boolean).join(" ") ||
      data.email_addresses[0]?.email_address.split("@")[0] ||
      "Anonymous";

    // Use Convex HTTP client to call mutation from server
    const convex = new ConvexHttpClient(process.env.NEXT_PUBLIC_CONVEX_URL!);
    await convex.mutation(api.users.syncUser, {
      clerkId: data.id,
      email: data.email_addresses[0]?.email_address ?? "",
      name,
      imageUrl: data.image_url,
    });
  }

  return NextResponse.json({ success: true });
}
