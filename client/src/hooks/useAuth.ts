import { useState, useEffect } from 'react';

export function useAuth() {
  const [accessToken, setAccessToken] = useState<string | null>(null);
  const [refreshToken, setRefreshToken] = useState<string | null>(null);

  useEffect(() => {
    async function fetchTokens() {
      const response = await fetch('/api/get-cookies');
      const { accessToken, refreshToken } = await response.json();
      setAccessToken(accessToken);
      setRefreshToken(refreshToken);
    }

    fetchTokens();
  }, []);

  const refreshTokens = async () => {
    if (refreshToken) {
      const response = await fetch('/api/refresh-token', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ refreshToken }),
      });
      if (response.ok) {
        const { accessToken: newAccessToken, refreshToken: newRefreshToken } = await response.json();
        setAccessToken(newAccessToken);
        setRefreshToken(newRefreshToken);
      } else {
        // Handle refresh token failure (e.g., redirect to login)
      }
    }
  };

  return { accessToken, refreshToken, refreshTokens };
}
