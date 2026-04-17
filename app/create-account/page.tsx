"use client";

import { useState, useRef, useEffect } from "react";
import { flushSync } from "react-dom";
import { useRouter } from "next/navigation";
import { Button, TextField, Checkbox, PinCodeField } from "@finity/design-system";
import Sidebar from "../components/Sidebar";
import FinityLogo from "../components/FinityLogo";

function PasswordDot({ met }: { met: boolean }) {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
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

function Toggle({ on, onToggle }: { on: boolean; onToggle: () => void }) {
  return (
    <button
      type="button"
      role="switch"
      aria-checked={on}
      onClick={onToggle}
      className="relative shrink-0 w-[48px] h-[28px] rounded-full transition-colors duration-200 outline-none appearance-none border-0 cursor-pointer p-0"
      style={{ backgroundColor: on ? "#FF885D" : "#E5E5E5" }}
    >
      <span
        className="absolute top-[2px] left-0 w-[24px] h-[24px] rounded-full bg-white shadow-md transition-transform duration-200"
        style={{ transform: on ? "translateX(22px)" : "translateX(2px)" }}
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
  const [codeSent, setCodeSent] = useState(false);
  const [pinCode, setPinCode] = useState("");

  const usernameRef = useRef<HTMLInputElement>(null);
  const pinContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (codeSent) {
      const firstInput = pinContainerRef.current?.querySelector("input");
      firstInput?.focus();
    }
  }, [codeSent]);

  const has8Chars = password.length >= 8;
  const hasNumber = /\d/.test(password);
  const hasUppercase = /[A-Z]/.test(password);
  const hasSpecial = /[^a-zA-Z0-9]/.test(password);

  return (
    <div className="flex flex-col md:flex-row min-h-screen">
      {/* Mobile header */}
      <header className="md:hidden flex items-center px-6 py-4 border-b border-[#e5e5e5]">
        <FinityLogo color="black" width={120} height={36} />
      </header>
      <Sidebar />

      <main className="flex-1 bg-white flex flex-col items-center px-8 pt-[80px] pb-12 overflow-y-auto">
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
            <div className="flex flex-col gap-2">
              <TextField
                ref={usernameRef}
                label="Username"
                value={useOwnUsername ? username : "sebastian.work@business.com"}
                onChange={(e) => setUsername(e.target.value)}
                readOnly={!useOwnUsername}
                size="large"
              />
              <Checkbox
                checked={useOwnUsername}
                onChange={(e) => {
                  const checked = e.target.checked;
                  flushSync(() => {
                    setUseOwnUsername(checked);
                    setUsername("");
                  });
                  if (checked) {
                    usernameRef.current?.focus();
                  }
                }}
                label="Set own username"
              />
            </div>

            {/* Password fields */}
            <div className="flex flex-col gap-4">
              <div className="flex flex-col gap-2">
                <TextField
                  label="Create password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  size="large"
                />
                <div className="grid grid-cols-2 gap-x-8 gap-y-1 pt-0.5">
                  <PasswordCriteria met={has8Chars} label="8 characters minimum" />
                  <PasswordCriteria met={hasNumber} label="1 number" />
                  <PasswordCriteria met={hasUppercase} label="1 uppercase" />
                  <PasswordCriteria met={hasSpecial} label="1 special character" />
                </div>
              </div>

              <TextField
                label="Confirm password"
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                size="large"
              />
            </div>

            {/* 2FA section */}
            <div className="flex flex-col gap-3">
              <div className="flex items-center justify-between">
                <p className="text-[16px] font-medium leading-[22px] tracking-[0.35px] text-[#0a0a0a]">
                  Enable two-factor authentication (Optional)
                </p>
                <Toggle on={enable2FA} onToggle={() => { setEnable2FA(!enable2FA); setCodeSent(false); setPinCode(""); }} />
              </div>
              <p className="text-[16px] font-normal leading-[22px] tracking-[0.48px] text-[#404040]">
                Two-factor authentication (2FA) adds an extra layer of security. Once enabled, you&apos;ll need to enter a code sent to your email when logging in.
              </p>
              {enable2FA && !codeSent && (
                <Button
                  variant="secondary"
                  size="medium"
                  className="self-start"
                  onClick={() => setCodeSent(true)}
                >
                  Send code
                </Button>
              )}
              {enable2FA && codeSent && (
                <div ref={pinContainerRef} className="flex flex-col gap-[16px] mt-[20px]">
                  <p className="text-[16px] font-normal leading-[22px] tracking-[0.48px] text-[#404040]">
                    Enter the 6-digit code sent to your email.
                  </p>
                  <PinCodeField
                    length={6}
                    value={pinCode}
                    onChange={setPinCode}
                    size="large"
                  />
                </div>
              )}
            </div>
          </div>

          {/* Actions */}
          <div className="flex flex-col gap-4">
            <Button
              variant="primary"
              size="large"
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
