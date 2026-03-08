import { useState, useRef, useEffect } from "preact/hooks";

export function useOTP(length = 6) {
  const [otp, setOtp] = useState<string[]>(Array(length).fill(""));
  const inputRefs = useRef<(HTMLInputElement | null)[]>(Array(length).fill(null));

  useEffect(() => {
    inputRefs.current[0]?.focus();
  }, []);

  const handleChange = (index: number, value: string) => {
    if (!/^\d*$/.test(value)) return;
    const newOtp = [...otp];
    newOtp[index] = value.slice(-1);
    setOtp(newOtp);
    if (value && index < length - 1) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (index: number, e: KeyboardEvent) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const handlePaste = (e: ClipboardEvent) => {
    e.preventDefault();
    const pasted = e.clipboardData?.getData("text").replace(/\D/g, "").slice(0, length) || "";
    const newOtp = Array(length).fill("");
    pasted.split("").forEach((char, i) => (newOtp[i] = char));
    setOtp(newOtp);
    const nextIndex = Math.min(pasted.length, length - 1);
    inputRefs.current[nextIndex]?.focus();
  };

  const reset = () => setOtp(Array(length).fill(""));
  const value = otp.join("");
  const isComplete = value.length === length && otp.every((d) => d !== "");

  return { otp, value, isComplete, inputRefs, handleChange, handleKeyDown, handlePaste, reset };
}