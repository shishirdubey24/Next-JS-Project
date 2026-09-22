"use client";

import { useEffect } from "react";
import { useAuthStore } from "@/lib/store/useAuthStore";

type AuthHydratorProps = {
  user: {
    name: string;
    email: string;
  } | null;
};

export const AuthHydrator = ({ user }: AuthHydratorProps) => {
  const setAuth = useAuthStore((state) => state.setAuth);
  const clearAuth = useAuthStore((state) => state.clearAuth);

  useEffect(() => {
    if (user) {
      setAuth(user);
    } else {
      clearAuth();
    }
  }, [user, setAuth, clearAuth]);

  return null;
};
