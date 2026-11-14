"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuthStore } from "@/lib/store/useAuthStore";
import { refreshAuthAction } from "@/lib/actions/refreshAuthAction";
type AuthHydratorProps = {
  user: {
    name: string;
    email: string;
  } | null;
};

export const AuthHydrator = ({ user }: AuthHydratorProps) => {
  const router = useRouter();

  const setAuth = useAuthStore((state) => state.setAuth);
  const clearAuth = useAuthStore((state) => state.clearAuth);

  useEffect(() => {
    if (user) {
      setAuth(user);
      return;
    }

    const restoreSession = async () => {
      try {
        const result = await refreshAuthAction();

        if (result.success) {
          router.refresh();
        } else {
          clearAuth();
        }
      } catch (error) {
        console.error("Session restoration failed:", error);
      }
    };

    restoreSession();
  }, [user, setAuth, clearAuth, router]);

  return null;
};
