"use client";

/**
 * Default chat page — shown on desktop when no conversation is open.
 * On mobile this view isn't visible (sidebar takes full screen).
 */
export default function ChatIndexPage() {
  return (
    <div className="hidden md:flex flex-col items-center justify-center h-full bg-gray-950 text-center p-8">
      {/* Empty state illustration */}
      <div className="w-24 h-24 bg-gray-800/60 rounded-full flex items-center justify-center mb-6">
        <svg
          className="w-12 h-12 text-gray-600"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={1.5}
            d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
          />
        </svg>
      </div>

      <h2 className="text-xl font-semibold text-gray-300 mb-2">
        Select a conversation
      </h2>
      <p className="text-gray-500 max-w-xs leading-relaxed">
        Choose an existing conversation from the sidebar, or search for someone
        new to start chatting.
      </p>
    </div>
  );
}
