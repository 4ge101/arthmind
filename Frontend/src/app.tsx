import "./app.css";
import "./styles/otp.css";
import "./styles/goal.css";
import "./styles/profile.css";
import "./styles/home.css";
import "./styles/userprofile.css";
import { AuthProvider, useAuth } from "./context/AuthContext";
import { PhonePage } from "./components/PhonePage";
import { OTPPage } from "./components/OTPPage";
import { ProfilePage } from "./components/ProfilePage";
import { GoalPage } from "./components/GoalPage";
import { HomePage } from "./ui/HomePage";
import { UserProfilePage } from "./ui/UserProfilePage";

function AuthFlow() {
  const { step } = useAuth();

  if (step === "home")        return <HomePage />;
  if (step === "userprofile") return <UserProfilePage />;
  if (step === "phone")       return <PhonePage />;
  if (step === "otp")         return <OTPPage />;
  if (step === "profile")     return <ProfilePage />;
  if (step === "goal")        return <GoalPage />;

  return <PhonePage />;
}

export function App() {
  return (
    <AuthProvider>
      <AuthFlow />
    </AuthProvider>
  );
}