import { createContext } from "preact";
import { useContext, useState } from "preact/hooks";

export interface Country {
  name: string;
  code: string;
  dial_code: string;
  flag: string;
}

export type Step = "phone" | "otp" | "profile" | "goal" | "home";

export interface AuthContextType {
  phone: string;
  setPhone: (v: string) => void;
  country: Country;
  setCountry: (c: Country) => void;
  step: Step;
  setStep: (s: Step | "success") => void;
  isLoggedIn: boolean;
  logout: () => void;
}

export const AuthContext = createContext<AuthContextType>({} as AuthContextType);

const STORAGE_KEY = "ft_auth";

function loadFromStorage(): { phone: string; country: Country } | null {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : null;
  } catch {
    return null;
  }
}

const DEFAULT_COUNTRY: Country = {
  name: "Nepal",
  code: "NP",
  dial_code: "+977",
  flag: "🇳🇵",
};

export function AuthProvider({ children }: { children: preact.ComponentChildren }) {
  const saved = loadFromStorage();

  const [phone, setPhone] = useState(saved?.phone ?? "");
  const [country, setCountry] = useState<Country>(saved?.country ?? DEFAULT_COUNTRY);
  const [step, setStepRaw] = useState<Step>(saved ? "home" : "phone");

  const isLoggedIn = step === "home";

  const setStep = (s: Step | "success") => {
    if (s === "success") {
      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify({ phone, country }));
      } catch {}
      setStepRaw("home");
    } else {
      setStepRaw(s);
    }
  };

  const logout = () => {
    try { localStorage.removeItem(STORAGE_KEY); } catch {}
    setPhone("");
    setCountry(DEFAULT_COUNTRY);
    setStepRaw("phone");
  };

  return (
    <AuthContext.Provider
      value={{ phone, setPhone, country, setCountry, step, setStep, isLoggedIn, logout }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);