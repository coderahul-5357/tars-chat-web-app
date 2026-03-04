import { SignUp } from "@clerk/nextjs";

export default function SignUpPage() {
  return (
    <div className="min-h-screen bg-gray-950 flex items-center justify-center p-4">
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-96 h-96 bg-brand-600/10 rounded-full blur-3xl" />
        <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-brand-800/10 rounded-full blur-3xl" />
      </div>

      <div className="relative z-10 w-full max-w-md">
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-14 h-14 bg-brand-600 rounded-2xl mb-4 shadow-lg shadow-brand-600/30">
            <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
            </svg>
          </div>
          <h1 className="text-3xl font-bold text-white">Join TarsChat</h1>
          <p className="text-gray-400 mt-1">Create your account to start chatting</p>
        </div>

        <SignUp
          appearance={{
            elements: {
              rootBox: "w-full",
              card: "bg-gray-900 border border-gray-800 shadow-2xl rounded-2xl",
              headerTitle: "text-white",
              headerSubtitle: "text-gray-400",
              socialButtonsBlockButton: "bg-gray-800 border border-gray-700 text-white hover:bg-gray-700",
              dividerLine: "bg-gray-700",
              dividerText: "text-gray-400",
              formFieldLabel: "text-gray-300",
              formFieldInput: "bg-gray-800 border-gray-700 text-white focus:border-brand-500",
              formButtonPrimary: "bg-brand-600 hover:bg-brand-700",
              footerActionLink: "text-brand-400 hover:text-brand-300",
            },
          }}
          redirectUrl="/chat"
        />
      </div>
    </div>
  );
}
