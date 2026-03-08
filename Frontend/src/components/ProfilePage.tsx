import { useState } from "preact/hooks";
import { useAuth } from "../context/AuthContext.tsx";
import { saveUser } from "../services/userService.ts";

const GENDERS = [
  { value: "male",   label: "Male",   emoji: "👨" },
  { value: "female", label: "Female", emoji: "👩" },
  { value: "other",  label: "Other",  emoji: "🧑" },
];

export function ProfilePage() {
  const { phone, country, setStep, setUserName } = useAuth();
  const [name, setName] = useState("");
  const [age, setAge] = useState("");
  const [gender, setGender] = useState("");
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [focused, setFocused] = useState("");

  const validate = () => {
    const e: Record<string, string> = {};
    if (name.trim().length < 2) e.name = "At least 2 characters";
    if (!age || Number(age) < 1 || Number(age) > 120) e.age = "Enter a valid age";
    if (!gender) e.gender = "Pick one to continue";
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
    setUserName(name.trim());
    setStep("goal");
  };

  const initials = name.trim()
    ? name.trim().split(" ").map((w) => w[0]).join("").toUpperCase().slice(0, 2)
    : "?";

  return (
    <div class="pf-root">
      {/* Ambient blobs */}
      <div class="pf-blob pf-blob-1" />
      <div class="pf-blob pf-blob-2" />

      <div class="pf-card">

        {/* Back */}
        <button class="pf-back" onClick={() => setStep("otp")}>
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
            <polyline points="15 18 9 12 15 6" />
          </svg>
        </button>

        {/* Step pill */}
        <div class="pf-step-pill">Step 2 of 3</div>

        {/* Avatar preview */}
        <div class="pf-avatar-wrap">
          <div class="pf-avatar">
            <span class="pf-avatar-text">{initials}</span>
            <div class="pf-avatar-ring" />
          </div>
          {name && <p class="pf-avatar-name">{name.trim().split(" ")[0]}</p>}
        </div>

        {/* Title */}
        <div class="pf-heading">
          <h2>About you</h2>
          <p>A few details to personalize your experience</p>
        </div>

        {/* ── Name ── */}
        <div class={`pf-field ${focused === "name" ? "pf-field--focus" : ""} ${errors.name ? "pf-field--error" : ""}`}>
          <label class="pf-label">
            <svg viewBox="0 0 20 20" fill="currentColor">
              <path fill-rule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clip-rule="evenodd" />
            </svg>
            Full Name
          </label>
          <input
            class="pf-input"
            type="text"
            placeholder="e.g. Hari Bahadur"
            value={name}
            onFocus={() => setFocused("name")}
            onBlur={() => setFocused("")}
            onInput={(e) => {
              setName((e.target as HTMLInputElement).value);
              setErrors((p) => ({ ...p, name: "" }));
            }}
          />
          {errors.name && <span class="pf-error">{errors.name}</span>}
        </div>

        {/* ── Age ── */}
        <div class={`pf-field ${focused === "age" ? "pf-field--focus" : ""} ${errors.age ? "pf-field--error" : ""}`}>
          <label class="pf-label">
            <svg viewBox="0 0 20 20" fill="currentColor">
              <path fill-rule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clip-rule="evenodd" />
            </svg>
            Age
          </label>
          <input
            class="pf-input"
            type="number"
            placeholder="e.g. 25"
            min="1"
            max="120"
            value={age}
            onFocus={() => setFocused("age")}
            onBlur={() => setFocused("")}
            onInput={(e) => {
              setAge((e.target as HTMLInputElement).value);
              setErrors((p) => ({ ...p, age: "" }));
            }}
          />
          {errors.age && <span class="pf-error">{errors.age}</span>}
        </div>

        {/* ── Gender ── */}
        <div class={`pf-field ${errors.gender ? "pf-field--error" : ""}`}>
          <label class="pf-label">
            <svg viewBox="0 0 20 20" fill="currentColor">
              <path d="M13 6a3 3 0 11-6 0 3 3 0 016 0zM18 8a2 2 0 11-4 0 2 2 0 014 0zM14 15a4 4 0 00-8 0v1h8v-1zM6 8a2 2 0 11-4 0 2 2 0 014 0zM16 18v-1a5.972 5.972 0 00-.75-2.906A3.005 3.005 0 0119 15v1h-3zM4.75 12.094A5.973 5.973 0 004 15v1H1v-1a3 3 0 013.75-2.906z" />
            </svg>
            Gender
          </label>
          <div class="pf-gender-row">
            {GENDERS.map((g) => (
              <button
                key={g.value}
                type="button"
                class={`pf-gender-btn ${gender === g.value ? "pf-gender-btn--active" : ""}`}
                onClick={() => {
                  setGender(g.value);
                  setErrors((p) => ({ ...p, gender: "" }));
                }}
              >
                <span class="pf-gender-emoji">{g.emoji}</span>
                <span class="pf-gender-label">{g.label}</span>
                {gender === g.value && (
                  <span class="pf-gender-dot" />
                )}
              </button>
            ))}
          </div>
          {errors.gender && <span class="pf-error">{errors.gender}</span>}
        </div>

        {errors.general && <p class="pf-general-error">{errors.general}</p>}

        {/* Submit */}
        <button
          class={`pf-submit ${loading ? "pf-submit--loading" : ""}`}
          onClick={handleSubmit}
          disabled={loading}
        >
          {loading ? (
            <span class="pf-spinner" />
          ) : (
            <>
              <span>Continue</span>
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
                <line x1="5" y1="12" x2="19" y2="12" />
                <polyline points="12 5 19 12 12 19" />
              </svg>
            </>
          )}
        </button>

      </div>
    </div>
  );
}