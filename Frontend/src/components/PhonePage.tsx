import { useState } from "preact/hooks";
import { useAuth } from "../context/AuthContext";
import { CountrySelector } from "./CountrySelector";
import { sendOTP } from "../services/otpService.ts";

export function PhonePage() {
  const { phone, setPhone, country, setCountry, setStep } = useAuth();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [sentCode, setSentCode] = useState("");

  const handleSend = async () => {
    if (phone.trim().length < 5) { setError("Enter a valid phone number"); return; }
    setError("");
    setLoading(true);
    const fullPhone = `${country.dial_code}${phone.trim()}`;
    const result = await sendOTP(fullPhone);
    setLoading(false);
    if (!result.success) { setError("Failed to send OTP. Please try again."); return; }
    if (result.code) setSentCode(result.code);
    setStep("otp");
  };

  return (
    <div class="page phone-page">
      <div class="page-inner">
        <div class="brand">
          <div class="brand-icon">
            <svg viewBox="0 0 40 40" fill="none">
              <rect width="40" height="40" rx="12" fill="url(#g1)" />
              <path d="M13 20.5l5.5 5.5L27 14" stroke="#fff" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" />
              <defs>
                <linearGradient id="g1" x1="0" y1="0" x2="40" y2="40">
                  <stop offset="0%" stop-color="#6C63FF" />
                  <stop offset="100%" stop-color="#3ECFCF" />
                </linearGradient>
              </defs>
            </svg>
          </div>
          <h1 class="brand-name">Verify</h1>
        </div>

        <div class="page-header">
          <h2 class="page-title">Enter your number</h2>
          <p class="page-sub">We'll send a one-time code to verify your identity</p>
        </div>

        <div class="input-group">
          <label class="input-label">Phone Number</label>
          <div class={`phone-row ${error ? "has-error" : ""}`}>
            <CountrySelector selected={country} onChange={setCountry} />
            <input
              class="phone-input"
              type="tel"
              placeholder="98XXXXXXXX"
              value={phone}
              onInput={(e) => { setPhone((e.target as HTMLInputElement).value); setError(""); }}
              onKeyDown={(e) => e.key === "Enter" && handleSend()}
              maxLength={15}
            />
          </div>
          {error && <p class="error-msg">{error}</p>}
        </div>

        {sentCode && (
          <div class="dev-banner">
            🔐 Dev mode — your OTP is: <strong>{sentCode}</strong>
          </div>
        )}

        <button class={`btn-primary ${loading ? "loading" : ""}`} onClick={handleSend} disabled={loading}>
          {loading ? (
            <span class="spinner" />
          ) : (
            <>
              Send OTP
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
                <line x1="5" y1="12" x2="19" y2="12" /><polyline points="12 5 19 12 12 19" />
              </svg>
            </>
          )}
        </button>

        <p class="footer-note">
          By continuing, you agree to our{" "}
          <a href="#">Terms of Service</a> and <a href="#">Privacy Policy</a>
        </p>
      </div>
    </div>
  );
}