import { useState } from "preact/hooks";
import { useAuth } from "../context/AuthContext.tsx";
import { saveUser } from "../services/userService.ts";

const GENDERS = [
  { value: "male",   label: "Male",   icon: "♂" },
  { value: "female", label: "Female", icon: "♀" },
  { value: "other",  label: "Other",  icon: "⚧" },
];

export function ProfilePage() {
  const { phone, country, setStep } = useAuth();
  const [name, setName] = useState("");
  const [age, setAge] = useState("");
  const [gender, setGender] = useState("");
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const validate = () => {
    const e: Record<string, string> = {};
    if (name.trim().length < 2) e.name = "Enter your full name";
    if (!age || Number(age) < 1 || Number(age) > 120) e.age = "Enter a valid age";
    if (!gender) e.gender = "Please select a gender";
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleSubmit = async () => {
    if (!validate()) return;
    setLoading(true);
    const fullPhone = `${country.dial_code}${phone.trim()}`;
    const result = await saveUser(fullPhone, {
      name: name.trim(),
      age: Number(age),
      gender,
    });
    setLoading(false);
    if (!result.success) {
      setErrors({ general: result.error || "Failed to save. Try again." });
      return;
    }
    setStep("success");
  };

  return (
    <div class="page profile-page">
      <div class="page-inner">
        <div class="brand">
          <div class="brand-icon">
            <svg viewBox="0 0 40 40" fill="none">
              <rect width="40" height="40" rx="12" fill="url(#gp)" />
              <circle cx="20" cy="16" r="5" stroke="#fff" stroke-width="2" />
              <path d="M10 30c0-5.523 4.477-10 10-10s10 4.477 10 10" stroke="#fff" stroke-width="2" stroke-linecap="round" />
              <defs>
                <linearGradient id="gp" x1="0" y1="0" x2="40" y2="40">
                  <stop offset="0%" stop-color="#6C63FF" />
                  <stop offset="100%" stop-color="#3ECFCF" />
                </linearGradient>
              </defs>
            </svg>
          </div>
          <h1 class="brand-name">Profile</h1>
        </div>

        <div class="page-header">
          <h2 class="page-title">Tell us about you</h2>
          <p class="page-sub">This info helps us personalize your experience</p>
        </div>

        {/* Name */}
        <div class="input-group">
          <label class="input-label">Full Name</label>
          <input
            class={`text-input ${errors.name ? "has-error" : ""}`}
            type="text"
            placeholder="Hari Bahadur"
            value={name}
            onInput={(e) => { setName((e.target as HTMLInputElement).value); setErrors((p) => ({ ...p, name: "" })); }}
          />
          {errors.name && <p class="error-msg">{errors.name}</p>}
        </div>

        {/* Age */}
        <div class="input-group">
          <label class="input-label">Age</label>
          <input
            class={`text-input ${errors.age ? "has-error" : ""}`}
            type="number"
            placeholder="25"
            min="1"
            max="120"
            value={age}
            onInput={(e) => { setAge((e.target as HTMLInputElement).value); setErrors((p) => ({ ...p, age: "" })); }}
          />
          {errors.age && <p class="error-msg">{errors.age}</p>}
        </div>

        {/* Gender */}
        <div class="input-group">
          <label class="input-label">Gender</label>
          <div class="gender-row">
            {GENDERS.map((g) => (
              <button
                key={g.value}
                type="button"
                class={`gender-btn ${gender === g.value ? "active" : ""}`}
                onClick={() => { setGender(g.value); setErrors((p) => ({ ...p, gender: "" })); }}
              >
                <span class="gender-icon">{g.icon}</span>
                <span class="gender-label">{g.label}</span>
              </button>
            ))}
          </div>
          {errors.gender && <p class="error-msg">{errors.gender}</p>}
        </div>

        {errors.general && <p class="error-msg centered">{errors.general}</p>}

        <button
          class={`btn-primary ${loading ? "loading" : ""}`}
          onClick={handleSubmit}
          disabled={loading}
        >
          {loading ? (
            <span class="spinner" />
          ) : (
            <>
              Save & Continue
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
                <line x1="5" y1="12" x2="19" y2="12" /><polyline points="12 5 19 12 12 19" />
              </svg>
            </>
          )}
        </button>
      </div>
    </div>
  );
}