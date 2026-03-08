import express from "express";
import cors from "cors";
import dotenv from "dotenv";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors({ origin: process.env.FRONTEND_URL || "http://localhost:5173" }));
app.use(express.json());

const ACCOUNT_SID = process.env.TWILIO_ACCOUNT_SID!;
const AUTH_TOKEN = process.env.TWILIO_AUTH_TOKEN!;
const VERIFY_SID = process.env.TWILIO_VERIFY_SID!;

const twilioBase = `https://verify.twilio.com/v2/Services/${VERIFY_SID}`;
const authHeader = "Basic " + Buffer.from(`${ACCOUNT_SID}:${AUTH_TOKEN}`).toString("base64");

// ── In-memory user store (replace with DB like PostgreSQL/MongoDB in production) ──
const users = new Map<string, { name: string; age: number; gender: string; phone: string; createdAt: string }>();

// ── POST /api/otp/send ────────────────────────────────────────────────────
app.post("/api/otp/send", async (req, res) => {
  const { phone } = req.body as { phone: string };

  if (!phone || phone.length < 7) {
    return res.status(400).json({ success: false, error: "Invalid phone number." });
  }

  try {
    const response = await fetch(`${twilioBase}/Verifications`, {
      method: "POST",
      headers: {
        Authorization: authHeader,
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: new URLSearchParams({ To: phone, Channel: "sms" }),
    });

    const data = await response.json() as any;
    console.log("[Twilio Send]", data);

    if (data.status === "pending") {
      return res.json({ success: true });
    } else {
      return res.status(500).json({ success: false, error: data.message || "Failed to send OTP." });
    }
  } catch (err) {
    console.error("[Twilio Send Error]", err);
    return res.status(500).json({ success: false, error: "SMS service unavailable." });
  }
});

// ── POST /api/otp/verify ──────────────────────────────────────────────────
app.post("/api/otp/verify", async (req, res) => {
  const { phone, code } = req.body as { phone: string; code: string };

  if (!phone || !code) {
    return res.status(400).json({ success: false, error: "Phone and code are required." });
  }

  try {
    const response = await fetch(`${twilioBase}/VerificationCheck`, {
      method: "POST",
      headers: {
        Authorization: authHeader,
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: new URLSearchParams({ To: phone, Code: code }),
    });

    const data = await response.json() as any;
    console.log("[Twilio Verify]", data);

    if (data.status === "approved") {
      return res.json({ success: true });
    } else {
      return res.status(400).json({ success: false, error: "Incorrect code. Please try again." });
    }
  } catch (err) {
    console.error("[Twilio Verify Error]", err);
    return res.status(500).json({ success: false, error: "Verification service unavailable." });
  }
});

// ── POST /api/user/save ───────────────────────────────────────────────────
app.post("/api/user/save", async (req, res) => {
  const { phone, name, age, gender } = req.body as {
    phone: string;
    name: string;
    age: number;
    gender: string;
  };

  // Validate all fields
  if (!phone || phone.length < 7) {
    return res.status(400).json({ success: false, error: "Invalid phone number." });
  }
  if (!name || name.trim().length < 2) {
    return res.status(400).json({ success: false, error: "Name must be at least 2 characters." });
  }
  if (!age || age < 1 || age > 120) {
    return res.status(400).json({ success: false, error: "Enter a valid age between 1 and 120." });
  }
  if (!gender || !["male", "female", "other"].includes(gender)) {
    return res.status(400).json({ success: false, error: "Invalid gender value." });
  }

  try {
    // Save user (in-memory — swap with DB insert in production)
    const userData = {
      phone,
      name: name.trim(),
      age: Number(age),
      gender,
      createdAt: new Date().toISOString(),
    };

    users.set(phone, userData);
    console.log("[User Saved]", userData);

    return res.json({ success: true, user: userData });
  } catch (err) {
    console.error("[User Save Error]", err);
    return res.status(500).json({ success: false, error: "Failed to save user data." });
  }
});

// ── GET /api/user/:phone ──────────────────────────────────────────────────
app.get("/api/user/:phone", (req, res) => {
  const phone = decodeURIComponent(req.params.phone);
  const user = users.get(phone);
  if (!user) {
    return res.status(404).json({ success: false, error: "User not found." });
  }
  return res.json({ success: true, user });
});

// ── POST /api/user/goal ───────────────────────────────────────────────────
app.post("/api/user/goal", (req, res) => {
  const { phone, goal } = req.body as { phone: string; goal: string };

  const validGoals = ["save_money", "understand_spending", "invest", "pay_debts"];

  if (!phone || phone.length < 7) {
    return res.status(400).json({ success: false, error: "Invalid phone number." });
  }
  if (!goal || !validGoals.includes(goal)) {
    return res.status(400).json({ success: false, error: "Invalid goal selected." });
  }

  const existing = users.get(phone);
  if (!existing) {
    return res.status(404).json({ success: false, error: "User not found. Please complete profile first." });
  }

  const updated = { ...existing, goal };
  users.set(phone, updated as any);
  console.log("[Goal Saved]", updated);

  return res.json({ success: true, user: updated });
});

app.listen(PORT, () => {
  console.log(`✅ OTP server → http://localhost:${PORT}`);
});