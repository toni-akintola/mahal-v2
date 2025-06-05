import { SignIn } from "@clerk/nextjs";

export default function Page() {
  return (
    <div className="min-h-screen bg-background flex items-center justify-center">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl flex items-center justify-center shadow-lg mx-auto mb-4">
            <span className="text-white font-bold text-2xl">🇵🇭</span>
          </div>
          <h1 className="text-3xl font-bold text-foreground mb-2">
            Welcome back to Mahal
          </h1>
          <p className="text-muted-foreground">
            Continue your Tagalog learning journey
          </p>
        </div>
        <SignIn
          appearance={{
            elements: {
              formButtonPrimary: "bg-blue-500 hover:bg-blue-600 text-white",
              card: "bg-card border border-border shadow-xl rounded-2xl",
            },
          }}
        />
      </div>
    </div>
  );
}
