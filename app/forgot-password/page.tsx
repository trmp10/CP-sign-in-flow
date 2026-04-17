"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Button, TextField } from "@finity/design-system";
import FinityLogo from "../components/FinityLogo";

type State = "default" | "check-email-password" | "check-email-username";

function PasswordDot({ met }: { met: boolean }) {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
      <circle cx="8" cy="8" r="4" fill={met ? "#737373" : "#D4D4D4"} />
    </svg>
  );
}

function PasswordCriteria({ met, label }: { met: boolean; label: string }) {
  return (
    <div className="flex items-center gap-1">
      <PasswordDot met={met} />
      <span className="text-[14px] leading-[20px] tracking-[0.29px] text-[#737373] whitespace-nowrap">
        {label}
      </span>
    </div>
  );
}

export default function ForgotPasswordPage() {
  const router = useRouter();
  const [state, setState] = useState<State>("default");
  const [email, setEmail] = useState("");
  const [submittedEmail, setSubmittedEmail] = useState("");

  function handleResetPassword() {
    setSubmittedEmail(email);
    setState("check-email-password");
  }

  function handleSendUsername() {
    setSubmittedEmail(email);
    setState("check-email-username");
  }

  const helpLink = (
    <p className="text-[16px] leading-[22px] tracking-[0.48px] text-[#0a0a0a]">
      Need help? Contact{" "}
      <a href="mailto:intelco@payroll.co.uk" className="text-[#f77445] underline font-medium tracking-[0.35px]">
        intelco@payroll.co.uk
      </a>
    </p>
  );

  return (
    <div className="min-h-screen bg-white flex flex-col items-center px-4 pt-[80px] pb-12">
      <div className="w-full max-w-[480px] flex flex-col gap-8">

        {/* Logo */}
        <Link href="/sign-in" className="-ml-[32px]">
          <FinityLogo color="black" />
        </Link>

        {/* — Default: Having trouble — */}
        {state === "default" && (
          <>
            <div className="flex flex-col gap-2">
              <h1 className="text-[24px] font-semibold leading-[30px] tracking-[0.4px] text-[#0a0a0a]">
                Having trouble logging in?
              </h1>
              <p className="text-[16px] leading-[22px] tracking-[0.48px] text-[#0a0a0a]">
                Enter the email address associated with your account.
              </p>
            </div>

            <div className="flex flex-col gap-4">
              <TextField
                label="Email address"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                size="large"
                autoFocus
              />
              <div className="flex gap-2">
                <Button variant="secondary" size="large" onClick={handleSendUsername}>
                  Send username
                </Button>
                <Button variant="primary" size="large" onClick={handleResetPassword}>
                  Reset password
                </Button>
              </div>
            </div>

            {helpLink}
          </>
        )}

        {/* — Check your email (password reset) — */}
        {state === "check-email-password" && (
          <>
            <div className="flex flex-col gap-2">
              <h1 className="text-[24px] font-semibold leading-[30px] tracking-[0.4px] text-[#0a0a0a]">
                Check your email
              </h1>
              <p className="text-[16px] leading-[22px] tracking-[0.48px] text-[#0a0a0a]">
                If an account exists, you&apos;ll receive a password reset email at{" "}
                <span className="font-medium">{submittedEmail || "your email address"}</span>.
                {" "}If you don&apos;t see it, check your spam folder.
              </p>
            </div>

            {helpLink}
          </>
        )}

        {/* — Check your email (username) — */}
        {state === "check-email-username" && (
          <>
            <div className="flex flex-col gap-2">
              <h1 className="text-[24px] font-semibold leading-[30px] tracking-[0.4px] text-[#0a0a0a]">
                Check your email
              </h1>
              <p className="text-[16px] leading-[22px] tracking-[0.48px] text-[#0a0a0a]">
                If an account exists, you&apos;ll receive an email with your username at{" "}
                <span className="font-medium">{submittedEmail || "your email address"}</span>.
                {" "}Check your inbox or spam folder.
              </p>
            </div>

            {helpLink}
          </>
        )}

        {/* Back to sign in */}
        {state !== "default" && (
          <Button variant="secondary" size="large" className="self-start" onClick={() => router.push("/sign-in")}>
            Back to sign in
          </Button>
        )}

      </div>
    </div>
  );
}
