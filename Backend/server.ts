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

app.listen(PORT, () => {
  console.log(`✅ OTP server → http://localhost:${PORT}`);
});