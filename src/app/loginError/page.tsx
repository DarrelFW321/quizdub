import { LoginFormError } from "@/components/login-form-error";

export default function Home() {
  return (
    <div className="gradient-background min-h-screen w-full flex items-center justify-center p-4 sm:p-8">
      <div className="relative w-full max-w-screen-lg mx-auto">
        <div className="login-container bg-white/5">
          <LoginFormError />
        </div>
      </div>
    </div>
  );
}