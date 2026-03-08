// services/goalService.ts
// Calls the Node.js/Express backend at /api/user/goal

const BASE_URL = import.meta.env.VITE_API_URL ?? "http://localhost:3001";

export async function saveGoal(
  fullPhone: string,
  goal: string
): Promise<{ success: boolean; error?: string }> {
  try {
    const res = await fetch(`${BASE_URL}/api/user/goal`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ phone: fullPhone, goal }),
    });
    return await res.json();
  } catch {
    return { success: false, error: "Cannot reach server. Is the backend running?" };
  }
}