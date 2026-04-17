"use client";

import { useState, useRef, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Button, TextField, PinCodeField } from "@finity/design-system";
import FinityLogo from "../components/FinityLogo";

type State = "default" | "error" | "locked" | "twofa";

export default function SignInPage() {
  const router = useRouter();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [state, setState] = useState<State>("default");
  const [pin, setPin] = useState("");
  const [failedAttempts, setFailedAttempts] = useState(0);
  const pinContainerRef = useRef<HTMLDivElement>(null);

  // Auto-focus first pin slot when 2FA modal opens
  useEffect(() => {
    if (state === "twofa") {
      const firstInput = pinContainerRef.current?.querySelector("input");
      firstInput?.focus();
    }
  }, [state]);

  function handleSignIn() {
    if (username.toLowerCase().includes("@finity.uk")) {
      setState("twofa");
      setFailedAttempts(0);
    } else {
      const next = failedAttempts + 1;
      setFailedAttempts(next);
      setState(next >= 5 ? "locked" : "error");
    }
  }

  const isError = state === "error";
  const isLocked = state === "locked";

  return (
    <div className="min-h-screen bg-white flex flex-col items-center gap-5 px-4 pt-[80px] pb-12">

      {/* Logo */}
      <Link href="/sign-in">
        <FinityLogo color="black" />
      </Link>

      {/* Card */}
      <div className="w-full max-w-[480px] bg-white border border-[#e5e5e5] rounded-[16px] shadow-[0px_1px_2px_0px_rgba(0,0,0,0.04)] px-8 pt-10 pb-6 flex flex-col gap-8">
        <h1 className="text-[24px] font-semibold leading-[30px] tracking-[0.4px] text-[#0a0a0a] text-center w-full">
          Sign in to Worker Portal
        </h1>

        {/* Fields */}
        <div className="flex flex-col gap-6">
          <TextField
            label="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            size="large"
            autoFocus
            errorMessage={isError ? "\u00a0" : undefined}
            className={isError ? "[&>div:last-child]:hidden" : ""}
          />
          <TextField
            label="Password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            size="large"
            errorMessage={isError ? "\u00a0" : undefined}
            className={isError ? "[&>div:last-child]:hidden" : ""}
          />

          {/* Form-level error */}
          {isError && (
            <div className="flex items-start gap-1">
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none" className="shrink-0 mt-[2px]">
                <circle cx="8" cy="8" r="6.67" fill="#dc2626" />
                <rect x="7.25" y="4.5" width="1.5" height="4" rx="0.75" fill="white" />
                <circle cx="8" cy="10.75" r="0.75" fill="white" />
              </svg>
              <p className="text-[14px] font-medium leading-[20px] tracking-[0.3px] text-[#dc2626]">
                Incorrect email address or password. Try again.
              </p>
            </div>
          )}

          {/* Locked notification */}
          {isLocked && (
            <div className="bg-[#f5f5f5] rounded-[12px] flex items-start gap-2 px-4 py-4">
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none" className="shrink-0 mt-[2px]">
                <circle cx="10" cy="10" r="8.33" fill="#dc2626" />
                <rect x="9.25" y="5.5" width="1.5" height="5.5" rx="0.75" fill="white" />
                <circle cx="10" cy="13.5" r="0.75" fill="white" />
              </svg>
              <p className="text-[16px] leading-[22px] tracking-[0.35px] text-[#171717]">
                We&apos;ve locked your account for 15 minutes after 5 failed attempts.{" "}
                <a href="/forgot-password" className="text-[#f77445] underline font-medium">
                  Forgot password
                </a>
                {" "}or contact your payroll provider to regain access.
              </p>
            </div>
          )}
        </div>

        {/* Actions */}
        <div className="flex flex-col gap-4 items-center">
          <Button variant="primary" size="large" className="w-full" onClick={handleSignIn}>
            Sign in
          </Button>
          <Link
            href="/forgot-password"
            className="text-[16px] font-medium leading-[22px] tracking-[0.35px] text-[#f77445] underline h-[48px] flex items-center justify-center w-full"
          >
            Forgot username or password?
          </Link>
        </div>
      </div>

      {/* Footer */}
      <div className="text-center text-[16px] leading-[22px] tracking-[0.48px] text-[#404040] flex flex-col gap-2">
        <p>
          For payroll concerns, contact{" "}
          <a href="mailto:intelco@payroll.co.uk" className="text-[#0a0a0a] underline">
            intelco@payroll.co.uk
          </a>
        </p>
        <p>Intel Co Payroll&nbsp;&nbsp;|&nbsp;&nbsp;9022-351-1231</p>
      </div>

      {/* 2FA Modal */}
      {state === "twofa" && (
        <div className="fixed inset-0 bg-black/50 flex items-end justify-center z-50 px-4 pb-[40vh]">
          <div className="bg-white rounded-[16px] w-full max-w-[512px] shadow-[0px_10px_15px_0px_rgba(0,0,0,0.1),0px_4px_6px_0px_rgba(0,0,0,0.05)] relative">

            {/* Close button */}
            <button
              type="button"
              onClick={() => setState("default")}
              className="absolute top-2 right-2 w-8 h-8 flex items-center justify-center rounded-full text-[#737373] hover:bg-[#f5f5f5] transition-colors"
            >
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                <path d="M5.25 5.25L14.75 14.75M14.75 5.25L5.25 14.75" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
              </svg>
            </button>

            {/* Header */}
            <div className="px-6 pt-6 pb-4 flex flex-col gap-3">
              <h2 className="text-[18px] font-semibold leading-[24px] tracking-[0.32px] text-[#0a0a0a]">
                Two-factor authentication
              </h2>
              <p className="text-[16px] leading-[22px] tracking-[0.48px] text-[#0a0a0a]">
                Enter the 6-digit code sent to your email.
              </p>
            </div>

            {/* Pin code — centered */}
            <div ref={pinContainerRef} className="flex justify-center py-4 px-6">
              <PinCodeField length={6} value={pin} onChange={setPin} size="large" />
            </div>

            {/* Verify action */}
            <div className="px-6 pb-6 pt-4">
              <Button
                variant="primary"
                size="large"
                className="w-full"
                onClick={() => router.push("/dashboard")}
              >
                Verify
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
