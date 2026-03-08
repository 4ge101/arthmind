import { useAuth } from "../context/AuthContext";
import AiChatIcon from "../assets/icons/aichat.svg";
import NotificationIcon from "../assets/icons/notification.svg";

export function HomePage() {
  const { userName, setStep } = useAuth();

  const firstName = userName ? userName.split(" ")[0] : "there";

  // Generate initials — "Claude AI" → "CA", "Hari" → "H"
  const initials = userName
    .trim()
    .split(" ")
    .filter(Boolean)
    .map((w) => w[0].toUpperCase())
    .slice(0, 2)
    .join("");

  return (
    <div class="home-page">
      <header class="home-header">
        <div class="home-header-left">
          <p class="home-greeting">Good day,</p>
          <h1 class="home-username">{firstName} 👋</h1>
        </div>

        <div class="home-header-right">
          <button class="home-icon-btn" aria-label="Action 1">
            <img src={AiChatIcon} alt="chat icon for ai" />
          </button>

          <button class="home-icon-btn" aria-label="Action 2">
            <img src={NotificationIcon} alt="notification icon" />
          </button>

          <button
            class="home-icon-btn home-profile-btn"
            aria-label="Profile"
            onClick={() => setStep("userprofile")}
          >
            {initials || (
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
              >
                <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                <circle cx="12" cy="7" r="4" />
              </svg>
            )}
          </button>
        </div>
      </header>

      {/* ── Your content goes below ── */}
      <main class="home-content">{/* Design the rest of the page here */}</main>
    </div>
  );
}
