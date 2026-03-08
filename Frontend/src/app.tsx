import "./app.css";
import "./styles/otp.css";
import "./styles/goal.css";
import { AuthProvider, useAuth } from "./context/AuthContext";
import { PhonePage } from "./components/PhonePage";
import { OTPPage } from "./components/OTPPage";
import { ProfilePage } from "./components/ProfilePage";
import { GoalPage } from "./components/GoalPage";
import { HomePage } from "./ui/HomePage";
function AuthFlow() {
  const { step } = useAuth();

  // Already logged in → straight to home, no auth screens
  if (step === "home") return <HomePage />;

  // Onboarding flow
  if (step === "phone") return <PhonePage />;
  if (step === "otp") return <OTPPage />;
  if (step === "profile") return <ProfilePage />;
  if (step === "goal") return <GoalPage />;

  return <PhonePage />;
}

export function App() {
  return (
    <AuthProvider>
      <AuthFlow />
    </AuthProvider>
  );
}
