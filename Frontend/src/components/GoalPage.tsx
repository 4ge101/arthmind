import { useState } from "preact/hooks";
import { useAuth } from "../context/AuthContext.tsx";
import { saveGoal } from "../services/goalService.ts";

const GOALS = [
  {
    value: "save_money",
    label: "Save Money",
    icon: "🏦",
    desc: "Build savings and grow your wealth",
  },
  {
    value: "understand_spending",
    label: "Understand Spending",
    icon: "📊",
    desc: "Track where your money goes",
  },
  {
    value: "invest",
    label: "Invest",
    icon: "📈",
    desc: "Grow money through smart investments",
  },
  {
    value: "pay_debts",
    label: "Pay Debts",
    icon: "💳",
    desc: "Clear loans and become debt-free",
  },
];

export function GoalPage() {
  const { phone, country, setStep } = useAuth();
  const [selected, setSelected] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleFinish = async () => {
    if (!selected) { setError("Please select a goal to continue."); return; }
    setError("");
    setLoading(true);
    const fullPhone = `${country.dial_code}${phone.trim()}`;
    const result = await saveGoal(fullPhone, selected);
    setLoading(false);
    if (!result.success) {
      setError(result.error || "Failed to save goal. Try again.");
      return;
    }
    setStep("success");
  };

  return (
    <div class="page goal-page">
      <div class="page-inner">
        <button class="back-btn" onClick={() => setStep("profile")}>
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
            <polyline points="15 18 9 12 15 6" />
          </svg>
        </button>

        <div class="brand">
          <div class="brand-icon">
            <svg viewBox="0 0 40 40" fill="none">
              <rect width="40" height="40" rx="12" fill="url(#gg)" />
              <path d="M20 10 L20 20 L28 14" stroke="#fff" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"/>
              <circle cx="20" cy="20" r="10" stroke="#fff" stroke-width="2" fill="none"/>
              <defs>
                <linearGradient id="gg" x1="0" y1="0" x2="40" y2="40">
                  <stop offset="0%" stop-color="#6C63FF" />
                  <stop offset="100%" stop-color="#3ECFCF" />
                </linearGradient>
              </defs>
            </svg>
          </div>
          <h1 class="brand-name">Goal</h1>
        </div>

        <div class="page-header">
          <h2 class="page-title">What's your main goal?</h2>
          <p class="page-sub">We'll personalize your experience based on this</p>
        </div>

        <div class="goal-grid">
          {GOALS.map((g) => (
            <button
              key={g.value}
              type="button"
              class={`goal-card ${selected === g.value ? "active" : ""}`}
              onClick={() => { setSelected(g.value); setError(""); }}
            >
              <span class="goal-icon">{g.icon}</span>
              <span class="goal-label">{g.label}</span>
              <span class="goal-desc">{g.desc}</span>
              {selected === g.value && (
                <span class="goal-check">
                  <svg viewBox="0 0 20 20" fill="none">
                    <circle cx="10" cy="10" r="10" fill="url(#gc)" />
                    <path d="M6 10l3 3 5-5" stroke="#fff" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                    <defs>
                      <linearGradient id="gc" x1="0" y1="0" x2="20" y2="20">
                        <stop offset="0%" stop-color="#6C63FF" />
                        <stop offset="100%" stop-color="#3ECFCF" />
                      </linearGradient>
                    </defs>
                  </svg>
                </span>
              )}
            </button>
          ))}
        </div>

        {error && <p class="error-msg centered">{error}</p>}

        <button
          class={`btn-primary ${loading ? "loading" : ""} ${!selected ? "disabled" : ""}`}
          onClick={handleFinish}
          disabled={loading || !selected}
        >
          {loading ? (
            <span class="spinner" />
          ) : (
            <>
              Finish
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
                <path d="M20 6L9 17l-5-5" stroke-linecap="round" stroke-linejoin="round" />
              </svg>
            </>
          )}
        </button>

        <p class="footer-note">You can change your goal anytime in settings</p>
      </div>
    </div>
  );
}