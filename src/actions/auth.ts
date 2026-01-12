"use server";

import { auth } from "@/lib/auth";
import { revalidatePath } from "next/cache";
import { headers } from "next/headers";
import { redirect } from "next/navigation";

interface SignUpParams {
  name: string;
  email: string;
  password: string;
}

export const signUp = async ({ name, email, password }: SignUpParams) => {
  try {
    await auth.api.signUpEmail({
      body: {
        name,
        email,
        password,
        callbackURL: "/dashboard",
      },
    });

    return {
      success: true,
      message: "Account created successfully",
    };
  } catch (error) {
    return {
      success: false,
      message: error instanceof Error ? error.message : "Sign up failed",
    };
  }
};

interface SignInParams {
  email: string;
  password: string;
}

export const signIn = async ({ email, password }: SignInParams) => {
  try {
    await auth.api.signInEmail({
      body: {
        email,
        password,
        callbackURL: "/dashboard",
      },
    });

    return {
      success: true,
      message: "Signed in successfully",
    };
  } catch (error) {
    return {
      success: false,
      message: error instanceof Error ? error.message : "Sign in failed",
    };
  }
};

export const signInWithGoogle = async () => {
  const { url } = await auth.api.signInSocial({
    body: {
      provider: "google",
      callbackURL: "/dashboard",
    },
  });

  if (!url) {
    return {
      success: false,
      message: "OAuth URL was not returned",
    };
  }

  redirect(url);
};

export const signOut = async () => {
  await auth.api.signOut({
    headers: await headers(),
  });
  revalidatePath("/");
  redirect("/");
};
