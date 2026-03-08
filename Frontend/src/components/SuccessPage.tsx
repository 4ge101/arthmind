import { useAuth } from "../context/AuthContext";

export function SuccessPage() {
  const { phone, country } = useAuth();

  return (
    <div class="page success-page">
      <div class="page-inner">
        <div class="success-icon">
          <svg viewBox="0 0 80 80" fill="none">
            <circle cx="40" cy="40" r="40" fill="url(#gs)" />
            <path d="M24 40l12 12 20-22" stroke="#fff" stroke-width="3.5" stroke-linecap="round" stroke-linejoin="round" />
            <defs>
              <linearGradient id="gs" x1="0" y1="0" x2="80" y2="80">
                <stop offset="0%" stop-color="#6C63FF" />
                <stop offset="100%" stop-color="#3ECFCF" />
              </linearGradient>
            </defs>
          </svg>
        </div>

        <div class="page-header">
          <h2 class="page-title">You're verified!</h2>
          <p class="page-sub">
            {country.flag} {country.dial_code} {phone} has been successfully verified.
          </p>
        </div>

        <button class="btn-primary" onClick={() => window.location.reload()}>
          Continue to App
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
            <line x1="5" y1="12" x2="19" y2="12" /><polyline points="12 5 19 12 12 19" />
          </svg>
        </button>
      </div>
    </div>
  );
}