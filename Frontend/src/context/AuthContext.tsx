import { createContext } from "preact";
import { useContext, useState } from "preact/hooks";

export interface Country {
  name: string;
  code: string;
  dial_code: string;
  flag: string;
}

interface AuthContextType {
  phone: string;
  setPhone: (v: string) => void;
  country: Country;
  setCountry: (c: Country) => void;
  step: "phone" | "otp" | "success";
  setStep: (s: "phone" | "otp" | "success") => void;
}

export const AuthContext = createContext<AuthContextType>({} as AuthContextType);

export function AuthProvider({ children }: { children: preact.ComponentChildren }) {
  const [phone, setPhone] = useState("");
  const [step, setStep] = useState<"phone" | "otp" | "success">("phone");
  const [country, setCountry] = useState<Country>({
    name: "Nepal",
    code: "NP",
    dial_code: "+977",
    flag: "🇳🇵",
  });

  return (
    <AuthContext.Provider value={{ phone, setPhone, country, setCountry, step, setStep }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);