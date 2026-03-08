// HomePage.tsx
// ─────────────────────────────────────────────────
// This is your home page — design it however you like!
// The user is already logged in when they reach here.
// Use useAuth() to access phone, country, and logout().
//
// Example:
//   const { phone, country, logout } = useAuth();
// ─────────────────────────────────────────────────

import { useAuth } from "../context/AuthContext";

export function HomePage() {
  const { logout } = useAuth();

  return (
    <div>
      {/* Design your home page here */}

      {/* When you want to log the user out, call logout() */}
      {/* <button onClick={logout}>Log out</button> */}
      {/* <h1>hellow</h1> */}
    </div>
  );
}