"use client";

import { useMemo } from "react";

type AuthError = { message: string };
type AuthResult = { error: AuthError | null };

async function unavailableResult(): Promise<AuthResult> {
  return {
    error: {
      message: "Authentication is temporarily unavailable in this frontend-only build.",
    },
  };
}

export const signIn = {
  email: async (_payload: {
    email: string;
    password: string;
    rememberMe?: boolean;
  }): Promise<AuthResult> => unavailableResult(),
};

export const signUp = {
  email: async (_payload: Record<string, unknown>): Promise<AuthResult> => unavailableResult(),
};

export async function signOut(): Promise<AuthResult> {
  return { error: null };
}

export async function requestPasswordReset(_payload: {
  email: string;
  redirectTo: string;
}): Promise<AuthResult> {
  return unavailableResult();
}

export async function resetPassword(_payload: {
  newPassword: string;
  token: string;
}): Promise<AuthResult> {
  return unavailableResult();
}

export function useSession(): {
  data: { user?: { name?: string; email?: string } } | null;
  isPending: boolean;
} {
  return useMemo(() => ({ data: null, isPending: false }), []);
}

export const authClient = {
  useSession,
  signIn,
  signUp,
  signOut,
  requestPasswordReset,
  resetPassword,
};
