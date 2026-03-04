import { ConversationView } from "@/components/chat/ConversationView";

interface Props {
  params: Promise<{ conversationId: string }>;
}

/**
 * Dynamic route: /chat/[conversationId]
 * Renders the full conversation view.
 */
export default async function ConversationPage({ params }: Props) {
  const { conversationId } = await params;
  return <ConversationView conversationId={conversationId} />;
}
