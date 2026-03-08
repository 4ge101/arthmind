import { useState, useEffect } from "preact/hooks";
import { useAuth } from "../context/AuthContext";
import { useOTP } from "../hooks/useOTP";
import { verifyOTP } from "../services/otpService.ts";

export function OTPPage() {
  const { phone, country, setStep } = useAuth();
  const { otp, value, isComplete, inputRefs, handleChange, handleKeyDown, handlePaste, reset } = useOTP(6);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [resendTimer, setResendTimer] = useState(30);
  const [canResend, setCanResend] = useState(false);

  useEffect(() => {
    if (resendTimer <= 0) { setCanResend(true); return; }
    const t = setTimeout(() => setResendTimer((v) => v - 1), 1000);
    return () => clearTimeout(t);
  }, [resendTimer]);

  const handleVerify = async () => {
    if (!isComplete) return;
    setError("");
    setLoading(true);
    const fullPhone = `${country.dial_code}${phone.trim()}`;
    const result = await verifyOTP(fullPhone, value);
    setLoading(false);
    if (!result.success) {
      setError(result.error || "Invalid code. Please try again.");
      reset();
      return;
    }
    // ✅ Go to profile step instead of success
    setStep("profile");
  };

  const handleResend = async () => {
    if (!canResend) return;
    reset();
    setCanResend(false);
    setResendTimer(30);
    setError("");
    const { sendOTP } = await import("../services/otpService.ts");
    const fullPhone = `${country.dial_code}${phone.trim()}`;
    await sendOTP(fullPhone);
  };

  return (
    <div class="page otp-page">
      <div class="page-inner">
        <button class="back-btn" onClick={() => setStep("phone")}>
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
            <polyline points="15 18 9 12 15 6" />
          </svg>
        </button>

        <div class="brand">
          <div class="brand-icon">
            <svg viewBox="0 0 40 40" fill="none">
              <rect width="40" height="40" rx="12" fill="url(#g2)" />
              <path d="M12 20h16M20 12v16" stroke="#fff" stroke-width="2.5" stroke-linecap="round" />
              <defs>
                <linearGradient id="g2" x1="0" y1="0" x2="40" y2="40">
                  <stop offset="0%" stop-color="#6C63FF" />
                  <stop offset="100%" stop-color="#3ECFCF" />
                </linearGradient>
              </defs>
            </svg>
          </div>
        </div>

        <div class="page-header">
          <h2 class="page-title">Verify your number</h2>
          <p class="page-sub">
            Code sent to{" "}
            <strong>{country.flag} {country.dial_code} {phone}</strong>
          </p>
        </div>

        <div class="otp-group" onPaste={handlePaste as any}>
          {otp.map((digit, i) => (
            <input
              key={i}
              ref={(el) => { inputRefs.current[i] = el; }}
              class={`otp-box ${digit ? "filled" : ""} ${error ? "error" : ""}`}
              type="text"
              inputMode="numeric"
              maxLength={1}
              value={digit}
              onInput={(e) => handleChange(i, (e.target as HTMLInputElement).value)}
              onKeyDown={(e) => handleKeyDown(i, e as KeyboardEvent)}
            />
          ))}
        </div>

        {error && <p class="error-msg centered">{error}</p>}

        <button
          class={`btn-primary ${loading ? "loading" : ""} ${!isComplete ? "disabled" : ""}`}
          onClick={handleVerify}
          disabled={loading || !isComplete}
        >
          {loading ? <span class="spinner" /> : "Verify & Continue"}
        </button>

        <p class="resend-row">
          {canResend ? (
            <button class="resend-btn" onClick={handleResend}>Resend code</button>
          ) : (
            <span class="resend-timer">Resend in <strong>{resendTimer}s</strong></span>
          )}
        </p>
      </div>
    </div>
  );
}