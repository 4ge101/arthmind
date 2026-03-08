// services/userService.ts
// Calls the Node.js/Express backend at /api/user/save

const BASE_URL = import.meta.env.VITE_API_URL ?? "http://localhost:3001";

export interface UserProfile {
  name: string;
  age: number;
  gender: string;
}

export async function saveUser(
  fullPhone: string,
  profile: UserProfile
): Promise<{ success: boolean; error?: string }> {
  try {
    const res = await fetch(`${BASE_URL}/api/user/save`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ phone: fullPhone, ...profile }),
    });
    return await res.json();
  } catch {
    return { success: false, error: "Cannot reach server. Is the backend running?" };
  }
}