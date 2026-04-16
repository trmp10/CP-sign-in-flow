"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button, TextField, Checkbox, PinCodeField } from "@finity/design-system";
import Sidebar from "../components/Sidebar";

function PasswordDot({ met }: { met: boolean }) {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="8" cy="8" r="3" fill={met ? "#404040" : "#d4d4d4"} />
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

function Toggle({ on, onToggle }: { on: boolean; onToggle: () => void }) {
  return (
    <button
      type="button"
      role="switch"
      aria-checked={on}
      onClick={onToggle}
      className="relative shrink-0 w-[44px] h-[24px] rounded-full transition-colors duration-200 focus:outline-none"
      style={{ backgroundColor: on ? "#FF885D" : "#d4d4d4" }}
    >
      <span
        className="absolute top-[3px] w-[18px] h-[18px] rounded-full bg-white shadow-sm transition-transform duration-200"
        style={{ transform: on ? "translateX(23px)" : "translateX(3px)" }}
      />
    </button>
  );
}

export default function CreateAccountPage() {
  const router = useRouter();
  const [useOwnUsername, setUseOwnUsername] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [enable2FA, setEnable2FA] = useState(false);
  const [pinCode, setPinCode] = useState("");

  const has8Chars = password.length >= 8;
  const hasNumber = /\d/.test(password);
  const hasUppercase = /[A-Z]/.test(password);
  const hasSpecial = /[^a-zA-Z0-9]/.test(password);

  return (
    <div className="flex min-h-screen">
      <Sidebar />

      <main className="flex-1 bg-white flex items-center justify-center px-8 py-12 overflow-y-auto">
        <div className="w-full max-w-[480px] flex flex-col gap-8">

          {/* Heading */}
          <div className="flex flex-col gap-2">
            <h1 className="text-[24px] font-semibold leading-[30px] tracking-[0.4px] text-[#0a0a0a]">
              Create an account
            </h1>
            <p className="text-[16px] font-normal leading-[22px] tracking-[0.48px] text-[#404040]">
              Create a strong password using letters, numbers, and symbols.
            </p>
          </div>

          {/* Form fields */}
          <div className="flex flex-col gap-8">

            {/* Username + checkbox */}
            <div className="flex flex-col gap-4">
              <div className="flex flex-col gap-2">
                <TextField
                  label="Username"
                  value={useOwnUsername ? username : "sebastian.work@business.com"}
                  onChange={(e) => { if (useOwnUsername) setUsername(e.target.value); }}
                  readOnly={!useOwnUsername}
                  size="medium"
                />
                <Checkbox
                  checked={useOwnUsername}
                  onChange={(e) => {
                    setUseOwnUsername(e.target.checked);
                    setUsername("");
                  }}
                  label="Set my own username"
                />
              </div>
              {useOwnUsername && (
                <TextField
                  label="Enter your own username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  size="medium"
                />
              )}
            </div>

            {/* Password fields */}
            <div className="flex flex-col gap-4">
              <div className="flex flex-col gap-2">
                <TextField
                  label="Create password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  size="medium"
                />
                <div className="flex flex-col gap-1 pt-0.5">
                  <div className="flex gap-8">
                    <PasswordCriteria met={has8Chars} label="8 characters minimum" />
                    <PasswordCriteria met={hasNumber} label="1 number" />
                  </div>
                  <div className="flex gap-8">
                    <PasswordCriteria met={hasUppercase} label="1 uppercase" />
                    <PasswordCriteria met={hasSpecial} label="1 special character" />
                  </div>
                </div>
              </div>

              <TextField
                label="Confirm password"
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                size="medium"
              />
            </div>

            {/* 2FA section */}
            <div className="flex flex-col gap-3">
              <div className="flex items-center justify-between">
                <p className="text-[16px] font-medium leading-[22px] tracking-[0.35px] text-[#0a0a0a]">
                  Enable two-factor authentication (Optional)
                </p>
                <Toggle on={enable2FA} onToggle={() => setEnable2FA(!enable2FA)} />
              </div>
              <p className="text-[16px] font-normal leading-[22px] tracking-[0.48px] text-[#404040]">
                {enable2FA
                  ? "Two-factor authentication (2FA) adds an extra layer of security. Once enabled, you'll need to enter a code sent to your email when logging in."
                  : "Two-factor authentication (2FA) adds an extra layer of security. Once enabled, you'll be required to provide an additional form of security verification when logging into the portal."}
              </p>
              {enable2FA && (
                <div className="flex flex-col gap-2 pt-1">
                  <p className="text-[16px] font-normal leading-[22px] tracking-[0.48px] text-[#404040]">
                    Enter the 6-digit code sent to your email.
                  </p>
                  <PinCodeField
                    length={6}
                    value={pinCode}
                    onChange={setPinCode}
                    size="medium"
                  />
                </div>
              )}
            </div>
          </div>

          {/* Actions */}
          <div className="flex flex-col gap-4">
            <Button
              variant="primary"
              size="medium"
              className="w-full"
              onClick={() => router.push("/dashboard")}
            >
              Create account
            </Button>
            <p className="text-[14px] leading-[20px] tracking-[0.29px] text-[#171717]">
              By proceeding, you agree to the{" "}
              <a href="#" className="font-medium text-[#f77445] underline underline-offset-2">
                Terms of Use
              </a>
              {" "}and{" "}
              <a href="#" className="font-medium text-[#f77445] underline underline-offset-2">
                Privacy Policy
              </a>
            </p>
          </div>

        </div>
      </main>
    </div>
  );
}
