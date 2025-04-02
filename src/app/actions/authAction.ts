"use server";

import { signIn } from "@/configurations/auth";

export async function handleGoogleSignIn() {
  await signIn("google");
}

export async function handleGithubSignIn() {
  await signIn("github");
}