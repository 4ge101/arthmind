// services/otpService.ts
// Calls the Node.js/Express backend at /api/otp/*

const BASE_URL = import.meta.env.VITE_API_URL ?? "http://localhost:3001";

export async function sendOTP(
  fullPhone: string
): Promise<{ success: boolean; code?: string; error?: string }> {
  try {
    const res = await fetch(`${BASE_URL}/api/otp/send`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ phone: fullPhone }),
    });
    return await res.json();
  } catch {
    return { success: false, error: "Cannot reach server. Is the backend running?" };
  }
}

export async function verifyOTP(
  fullPhone: string,
  code: string
): Promise<{ success: boolean; error?: string }> {
  try {
    const res = await fetch(`${BASE_URL}/api/otp/verify`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ phone: fullPhone, code }),
    });
    return await res.json();
  } catch {
    return { success: false, error: "Cannot reach server. Is the backend running?" };
  }
}