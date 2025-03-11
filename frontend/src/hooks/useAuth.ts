import { useState, useEffect } from "react";
import { SuccessResponse, FailedResponse } from "./interface";

type AuthResponse = SuccessResponse | FailedResponse;

export default function useAuth() {
  const [user, setUser] = useState<SuccessResponse["data"] | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchUser() {
      try {
        const res = await fetch(process.env.NEXT_PUBLIC_SERVER_URL + "/auth/user", {
          method: "GET",
          credentials: "include",
        });

        if (!res.ok) {
          const errorData: FailedResponse = await res.json();
          setError(errorData.message);
          return;
        }

        const data: AuthResponse = await res.json();

        if ("statusCode" in data) {
          setError(data.message);
        } else {
          setUser(data.data);
        }
      } finally {
        setLoading(false);
      }
    }
    fetchUser();
  }, []);

  return { user, loading, error };
}
