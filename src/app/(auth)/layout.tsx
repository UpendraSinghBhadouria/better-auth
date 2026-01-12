import { getCurrentUser } from "@/actions/user";
import { redirect } from "next/navigation";

const AuthLayout = async ({ children }: { children: React.ReactNode }) => {
  const user = await getCurrentUser();
  if (user) {
    redirect("/dashboard");
  }

  return (
    <div className="flex min-h-svh flex-col items-center justify-center gap-6 bg-muted px-6 md:px-10 pt-16">
      {children}
    </div>
  );
};

export default AuthLayout;
