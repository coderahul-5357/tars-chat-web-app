# 💬 TarsChat

> Real-time messaging web app built with **Next.js 15**, **TypeScript**, **Convex**, and **Clerk**

![Next.js](https://img.shields.io/badge/Next.js-15-black?style=flat-square&logo=next.js)
![TypeScript](https://img.shields.io/badge/TypeScript-5-blue?style=flat-square&logo=typescript)
![Convex](https://img.shields.io/badge/Convex-Backend-orange?style=flat-square)
![Clerk](https://img.shields.io/badge/Clerk-Auth-purple?style=flat-square)
![Tailwind CSS](https://img.shields.io/badge/Tailwind-CSS-38bdf8?style=flat-square&logo=tailwindcss)

---

## 🚀 Live Demo

🔗 **[tarschat.vercel.app](https://tars-chat-web-app.vercel.app)** ← *(update with your Vercel URL)*

---

## ✨ Features

### Core (Required)
| # | Feature | Description |
|---|---------|-------------|
| 1 | 🔐 **Authentication** | Email + Google login via Clerk. User profiles synced to Convex |
| 2 | 👥 **User List & Search** | Browse all users, search by name in real time |
| 3 | 💬 **Direct Messages** | Private 1-on-1 conversations with real-time delivery |
| 4 | 🕐 **Smart Timestamps** | Today → `2:34 PM` · This year → `Feb 15, 2:34 PM` · Older → includes year |
| 5 | 🌑 **Empty States** | Friendly messages on every empty screen — no blank pages |
| 6 | 📱 **Responsive Layout** | Sidebar + chat on desktop · Full-screen chat with back button on mobile |
| 7 | 🟢 **Online/Offline Status** | Green dot shows who's live. Updates via Visibility API |
| 8 | ✍️ **Typing Indicator** | Animated dots + name when someone is typing. Clears after 2s |
| 9 | 🔴 **Unread Badges** | Per-conversation unread count. Cleared when you open the chat |
| 10 | ⬇️ **Smart Auto-Scroll** | Auto-scrolls to new messages. Shows "↓ New messages" if you've scrolled up |

### Bonus (Optional — all implemented)
| # | Feature | Description |
|---|---------|-------------|
| 11 | 🗑️ **Delete Messages** | Soft-delete your own messages. Shows *"This message was deleted"* |
| 12 | 😊 **Emoji Reactions** | React with 👍 ❤️ 😂 😮 😢. Click again to remove |
| 13 | ⏳ **Loading & Error States** | Skeleton loaders while fetching. Error banner with retry on failed send |
| 14 | 👨‍👩‍👧 **Group Chat** | Create groups with a name + multiple members. Real-time for all |

---

## 🛠 Tech Stack

| Layer | Technology |
|-------|-----------|
| **Framework** | [Next.js 15](https://nextjs.org) — App Router, Server Components |
| **Language** | [TypeScript](https://typescriptlang.org) — fully typed end-to-end |
| **Backend / DB / Realtime** | [Convex](https://convex.dev) — subscriptions, mutations, queries |
| **Authentication** | [Clerk](https://clerk.com) — email + social login |
| **Styling** | [Tailwind CSS](https://tailwindcss.com) |
| **Deployment** | [Vercel](https://vercel.com) (frontend) + Convex Cloud (backend) |

---

## 📁 Project Structure

```
tars-chat/
├── app/
│   ├── layout.tsx                  # Root layout — Clerk + Convex providers
│   ├── page.tsx                    # Redirects → /chat or /sign-in
│   ├── sign-in/                    # Clerk sign-in page
│   ├── sign-up/                    # Clerk sign-up page
│   ├── api/webhooks/clerk/         # Syncs Clerk users → Convex on signup
│   └── chat/
│       ├── layout.tsx              # Protected route wrapper
│       ├── page.tsx                # Empty state (no conversation open)
│       └── [conversationId]/       # Dynamic conversation route
│
├── components/
│   ├── providers/
│   │   └── ConvexClientProvider    # Convex + Clerk JWT integration
│   ├── layout/
│   │   ├── ChatShell               # App shell, online/offline sync
│   │   └── Sidebar                 # Conversations list + search
│   ├── chat/
│   │   ├── ConversationView        # Main chat panel + auto-scroll
│   │   ├── MessageBubble           # Message with reactions + delete
│   │   ├── MessageInput            # Textarea + typing indicator
│   │   ├── TypingIndicator         # Animated dots
│   │   └── CreateGroupModal        # Group creation flow
│   └── ui/
│       ├── Avatar                  # Image or gradient initials fallback
│       └── OnlineDot               # Green/gray status dot
│
├── convex/
│   ├── schema.ts                   # All table definitions
│   ├── users.ts                    # User CRUD + online status
│   ├── conversations.ts            # DM + group creation, listing
│   ├── messages.ts                 # Send, list, soft-delete, reactions
│   ├── presence.ts                 # Typing indicators + read receipts
│   └── http.ts                     # Clerk webhook HTTP handler
│
├── lib/
│   └── dateUtils.ts                # Smart timestamp formatting
│
└── middleware.ts                   # Clerk route protection
```

---

## 🗄 Database Schema (Convex)

```
users          clerkId, email, name, imageUrl, isOnline, lastSeen
conversations  type (dm|group), participantIds[], groupName?, lastMessageTime
messages       conversationId, senderId, body, deleted, createdAt
reactions      messageId, userId, emoji
typing         conversationId, userId, updatedAt  ← stale after 3s
readReceipts   conversationId, userId, lastReadTime
```

All real-time updates flow through **Convex subscriptions** (`useQuery`) — zero polling, zero websocket boilerplate.

---

## ⚙️ Local Setup

### Prerequisites
- Node.js v18+
- A [Clerk](https://clerk.com) account (free)
- A [Convex](https://convex.dev) account (free)

### 1. Clone & install
```bash
git clone https://github.com/coderahul-5357/tars-chat-web-app.git
cd tars-chat-web-app
npm install --legacy-peer-deps
```

### 2. Set up environment variables
```bash
cp .env.local.example .env.local
```

Fill in `.env.local`:
```env
NEXT_PUBLIC_CONVEX_URL=https://your-deployment.convex.cloud
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=pk_test_...
CLERK_SECRET_KEY=sk_test_...
NEXT_PUBLIC_CLERK_SIGN_IN_URL=/sign-in
NEXT_PUBLIC_CLERK_SIGN_UP_URL=/sign-up
NEXT_PUBLIC_CLERK_AFTER_SIGN_IN_URL=/chat
NEXT_PUBLIC_CLERK_AFTER_SIGN_UP_URL=/chat
CLERK_WEBHOOK_SECRET=whsec_...
```

### 3. Start Convex backend
```bash
npx convex dev
```
Copy the deployment URL → paste as `NEXT_PUBLIC_CONVEX_URL` in `.env.local`

### 4. Configure Clerk Webhook
In Clerk Dashboard → Webhooks → Add Endpoint:
- URL: `https://your-domain/api/webhooks/clerk`
- Events: `user.created`, `user.updated`
- Copy the signing secret → set as `CLERK_WEBHOOK_SECRET`

### 5. Run the app
```bash
# In a second terminal
npx next dev
```

Open [http://localhost:3000](http://localhost:3000) 🎉

---

## 🚢 Deployment

### Deploy Convex backend
```bash
npx convex deploy
```

### Deploy to Vercel
1. Push your code to GitHub
2. Go to [vercel.com/new](https://vercel.com/new) → import this repo
3. Add all environment variables from `.env.local`
4. Click **Deploy**
5. Update your Clerk webhook URL to the Vercel domain

---

## 📸 Screenshots

> *(Add screenshots of your app here after deployment)*

| Sign In | Chat View | Group Chat |
|---------|-----------|------------|
| ![sign-in]() | ![chat]() | ![group]() |

---

## 👨‍💻 Built By

**Rahul** — [github.com/coderahul-5357](https://github.com/coderahul-5357)

Built for the **Tars Full Stack Engineer Internship Coding Challenge 2026**

---

## 📄 License

MIT
