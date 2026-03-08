import "./app.css";
import "./styles/otp.css";
import { AuthProvider, useAuth } from "./context/AuthContext";
import { PhonePage } from "./components/PhonePage";
import { OTPPage } from "./components/OTPPage";
import { SuccessPage } from "./components/SuccessPage";

function AuthFlow() {
  const { step } = useAuth();
  if (step === "phone") return <PhonePage />;
  if (step === "otp") return <OTPPage />;
  return <SuccessPage />;
}

export function App() {
  return (
    <AuthProvider>
      <AuthFlow />
    </AuthProvider>
  );
}