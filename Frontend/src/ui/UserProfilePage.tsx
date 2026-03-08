import { useAuth } from "../context/AuthContext";

export function UserProfilePage() {
  const { userName, phone, country, logout, setStep } = useAuth();

  const initials = userName
    .trim()
    .split(" ")
    .filter(Boolean)
    .map((w) => w[0].toUpperCase())
    .slice(0, 2)
    .join("") || "?";

  return (
    <div class="up-root">

      {/* ── Header ── */}
      <div class="up-header">
        <h1 class="up-title">Profile</h1>
        <button class="up-settings-btn" onClick={() => {}}>
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8">
            <circle cx="12" cy="12" r="3" />
            <path d="M19.4 15a1.65 1.65 0 00.33 1.82l.06.06a2 2 0 010 2.83 2 2 0 01-2.83 0l-.06-.06a1.65 1.65 0 00-1.82-.33 1.65 1.65 0 00-1 1.51V21a2 2 0 01-4 0v-.09A1.65 1.65 0 009 19.4a1.65 1.65 0 00-1.82.33l-.06.06a2 2 0 01-2.83-2.83l.06-.06A1.65 1.65 0 004.68 15a1.65 1.65 0 00-1.51-1H3a2 2 0 010-4h.09A1.65 1.65 0 004.6 9a1.65 1.65 0 00-.33-1.82l-.06-.06a2 2 0 012.83-2.83l.06.06A1.65 1.65 0 009 4.68a1.65 1.65 0 001-1.51V3a2 2 0 014 0v.09a1.65 1.65 0 001 1.51 1.65 1.65 0 001.82-.33l.06-.06a2 2 0 012.83 2.83l-.06.06A1.65 1.65 0 0019.4 9a1.65 1.65 0 001.51 1H21a2 2 0 010 4h-.09a1.65 1.65 0 00-1.51 1z" />
          </svg>
        </button>
      </div>

      <div class="up-scroll">

        {/* ── User Info Row ── */}
        <div class="up-user-row">
          <div class="up-avatar-wrap">
            <div class="up-avatar">{initials}</div>
            <div class="up-star">⭐</div>
          </div>
          <div class="up-user-info">
            <h2 class="up-name">{userName || "User"}</h2>
            <p class="up-phone">{country.dial_code} {phone}</p>
            <div class="up-badge">
              <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.5" width="13" height="13">
                <path d="M8 1l1.8 3.6L14 5.3l-3 2.9.7 4.1L8 10.4l-3.7 1.9.7-4.1-3-2.9 4.2-.7z" />
              </svg>
              Gold Saver
            </div>
          </div>
        </div>

        {/* ── Stats Row ── */}
        <div class="up-stats">
          <div class="up-stat">
            <span class="up-stat-value">Rs. 14k</span>
            <span class="up-stat-sub">this month</span>
            <span class="up-stat-label">SAVED</span>
          </div>
          <div class="up-stat-divider" />
          <div class="up-stat">
            <span class="up-stat-value">12 days</span>
            <span class="up-stat-sub">active</span>
            <span class="up-stat-label">STREAK</span>
          </div>
          <div class="up-stat-divider" />
          <div class="up-stat">
            <span class="up-stat-value">78/100</span>
            <span class="up-stat-sub">Arthik</span>
            <span class="up-stat-label">SCORE</span>
          </div>
        </div>

        {/* ── Monthly Wrapped Banner ── */}
        <div class="up-banner">
          <div class="up-banner-left">
            <p class="up-banner-date">FEBRUARY 2026</p>
            <h3 class="up-banner-title">View Monthly Wrapped</h3>
            <p class="up-banner-sub">See your financial story →</p>
          </div>
          <button class="up-banner-btn">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
              <polyline points="9 18 15 12 9 6" />
            </svg>
          </button>
        </div>

        {/* ── Account Section ── */}
        <p class="up-section-label">ACCOUNT</p>
        <div class="up-section-card">

          <div class="up-row">
            <div class="up-row-icon">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8">
                <path d="M18 8A6 6 0 006 8c0 7-3 9-3 9h18s-3-2-3-9" />
                <path d="M13.73 21a2 2 0 01-3.46 0" />
              </svg>
            </div>
            <div class="up-row-body">
              <span class="up-row-title">Notifications</span>
              <span class="up-row-sub">3 unread</span>
            </div>
            <svg class="up-row-arrow" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
              <polyline points="9 18 15 12 9 6" />
            </svg>
          </div>

          <div class="up-row-divider" />

          <div class="up-row">
            <div class="up-row-icon">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8">
                <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
              </svg>
            </div>
            <div class="up-row-body">
              <span class="up-row-title">Privacy &amp; Security</span>
              <span class="up-row-sub">Protected</span>
            </div>
            <svg class="up-row-arrow" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
              <polyline points="9 18 15 12 9 6" />
            </svg>
          </div>

          <div class="up-row-divider" />

          <div class="up-row">
            <div class="up-row-icon">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8">
                <circle cx="12" cy="12" r="3" />
                <path d="M19.4 15a1.65 1.65 0 00.33 1.82l.06.06a2 2 0 010 2.83 2 2 0 01-2.83 0l-.06-.06a1.65 1.65 0 00-1.82-.33 1.65 1.65 0 00-1 1.51V21a2 2 0 01-4 0v-.09A1.65 1.65 0 009 19.4a1.65 1.65 0 00-1.82.33l-.06.06a2 2 0 01-2.83-2.83l.06-.06A1.65 1.65 0 004.68 15a1.65 1.65 0 00-1.51-1H3a2 2 0 010-4h.09A1.65 1.65 0 004.6 9a1.65 1.65 0 00-.33-1.82l-.06-.06a2 2 0 012.83-2.83l.06.06A1.65 1.65 0 009 4.68a1.65 1.65 0 001-1.51V3a2 2 0 014 0v.09a1.65 1.65 0 001 1.51 1.65 1.65 0 001.82-.33l.06-.06a2 2 0 012.83 2.83l-.06.06A1.65 1.65 0 0019.4 9a1.65 1.65 0 001.51 1H21a2 2 0 010 4h-.09a1.65 1.65 0 00-1.51 1z" />
              </svg>
            </div>
            <div class="up-row-body">
              <span class="up-row-title">App Settings</span>
              <span class="up-row-sub">Language, Theme</span>
            </div>
            <svg class="up-row-arrow" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
              <polyline points="9 18 15 12 9 6" />
            </svg>
          </div>

        </div>

        {/* ── More Section ── */}
        <p class="up-section-label">MORE</p>
        <div class="up-section-card">

          <div class="up-row">
            <div class="up-row-icon up-row-icon--green">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8">
                <rect x="3" y="8" width="18" height="13" rx="2" />
                <path d="M8 8V6a4 4 0 018 0v2" />
              </svg>
            </div>
            <div class="up-row-body">
              <span class="up-row-title up-row-title--green">Refer a Friend</span>
              <span class="up-row-sub">Earn Rs. 200</span>
            </div>
            <svg class="up-row-arrow" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
              <polyline points="9 18 15 12 9 6" />
            </svg>
          </div>

          <div class="up-row-divider" />

          <div class="up-row">
            <div class="up-row-icon">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8">
                <circle cx="12" cy="12" r="10" />
                <path d="M9.09 9a3 3 0 015.83 1c0 2-3 3-3 3" />
                <line x1="12" y1="17" x2="12.01" y2="17" />
              </svg>
            </div>
            <div class="up-row-body">
              <span class="up-row-title">Help &amp; Support</span>
              <span class="up-row-sub">FAQ, Chat</span>
            </div>
            <svg class="up-row-arrow" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
              <polyline points="9 18 15 12 9 6" />
            </svg>
          </div>

        </div>

        {/* ── Logout ── */}
        <button class="up-logout" onClick={logout}>
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <path d="M9 21H5a2 2 0 01-2-2V5a2 2 0 012-2h4" />
            <polyline points="16 17 21 12 16 7" />
            <line x1="21" y1="12" x2="9" y2="12" />
          </svg>
          Log Out
        </button>

      </div>
    </div>
  );
}