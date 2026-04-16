"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button, TextField, Checkbox, PinCodeField } from "@finity/design-system";
import Sidebar from "../components/Sidebar";

function PasswordRequirement({ met, label }: { met: boolean; label: string }) {
  return (
    <span className={`flex items-center gap-1.5 text-xs ${met ? "text-[#404040]" : "text-[#A3A3A3]"}`}>
      <span className={`w-1.5 h-1.5 rounded-full shrink-0 ${met ? "bg-[#404040]" : "bg-[#D4D4D4]"}`} />
      {label}
    </span>
  );
}

function Toggle({ on, onToggle }: { on: boolean; onToggle: () => void }) {
  return (
    <button
      type="button"
      role="switch"
      aria-checked={on}
      onClick={onToggle}
      className="relative shrink-0 w-11 h-6 rounded-full transition-colors duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2"
      style={{ backgroundColor: on ? "#FF885D" : "#D4D4D4" }}
    >
      <span
        className="absolute top-[3px] w-[18px] h-[18px] rounded-full bg-white shadow-sm transition-transform duration-200"
        style={{ transform: on ? "translateX(20px)" : "translateX(3px)" }}
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

      <main className="flex-1 bg-white flex items-start justify-center px-8 py-16 overflow-y-auto">
        <div className="w-full max-w-[480px] flex flex-col gap-6">

          {/* Heading */}
          <div className="flex flex-col gap-1.5">
            <h1 className="text-[1.5rem] font-bold text-black">Create an account</h1>
            <p className="text-sm text-[#737373]">
              Create a strong password using letters, numbers, and symbols.
            </p>
          </div>

          {/* Username */}
          <div className="flex flex-col gap-3">
            <TextField
              label="Username"
              value={useOwnUsername ? username : "sebastian.work@business.com"}
              onChange={(e) => {
                if (useOwnUsername) setUsername(e.target.value);
              }}
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
            {useOwnUsername && (
              <TextField
                label="Enter your own username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                size="medium"
                placeholder=""
              />
            )}
          </div>

          {/* Create password */}
          <div className="flex flex-col gap-2">
            <TextField
              label="Create password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              size="medium"
            />
            <div className="grid grid-cols-2 gap-x-4 gap-y-1 pt-1">
              <PasswordRequirement met={has8Chars} label="8 characters minimum" />
              <PasswordRequirement met={hasNumber} label="1 number" />
              <PasswordRequirement met={hasUppercase} label="1 uppercase" />
              <PasswordRequirement met={hasSpecial} label="1 special character" />
            </div>
          </div>

          {/* Confirm password */}
          <TextField
            label="Confirm password"
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            size="medium"
          />

          {/* 2FA section */}
          <div className="flex flex-col gap-3">
            <div className="flex items-start justify-between gap-4">
              <div className="flex flex-col gap-1.5 flex-1">
                <p className="text-sm font-medium text-black">
                  Enable two-factor authentication (Optional)
                </p>
                <p className="text-xs text-[#737373] leading-relaxed">
                  {enable2FA
                    ? "Two-factor authentication (2FA) adds an extra layer of security. Once enabled, you'll need to enter a code sent to your email when logging in."
                    : "Two-factor authentication (2FA) adds an extra layer of security. Once enabled, you'll be required to provide an additional form of security verification when logging into the portal."}
                </p>
              </div>
              <Toggle on={enable2FA} onToggle={() => setEnable2FA(!enable2FA)} />
            </div>

            {enable2FA && (
              <div className="flex flex-col gap-2 pt-1">
                <p className="text-sm text-[#404040]">
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

          {/* Actions */}
          <div className="flex flex-col gap-3 pt-2">
            <Button
              variant="primary"
              size="medium"
              className="w-full"
              onClick={() => router.push("/dashboard")}
            >
              Create account
            </Button>
            <p className="text-xs text-center text-[#A3A3A3]">
              By proceeding, you agree to the{" "}
              <a href="#" className="underline underline-offset-2 text-[#737373]">
                Terms of Use
              </a>{" "}
              and{" "}
              <a href="#" className="underline underline-offset-2 text-[#737373]">
                Privacy Policy
              </a>
            </p>
          </div>
        </div>
      </main>
    </div>
  );
}
