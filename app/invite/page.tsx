import Link from "next/link";
import { Button } from "@finity/design-system";

function FinityLogoBlack() {
  return (
    <div className="flex items-center gap-2">
      <svg width="28" height="24" viewBox="0 0 28 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M8 2C5.8 2 4 3.8 4 6C4 8.2 5.8 10 8 10C10.2 10 12 8.2 12 6C12 3.8 10.2 2 8 2Z" fill="#000" />
        <path d="M8 14C5.8 14 4 15.8 4 18C4 20.2 5.8 22 8 22C10.2 22 12 20.2 12 18C12 15.8 10.2 14 8 14Z" fill="#000" />
        <path d="M16 2C13.8 2 12 3.8 12 6C12 8.2 13.8 10 16 10C18.2 10 20 8.2 20 6C20 3.8 18.2 2 16 2Z" fill="#000" />
        <path d="M16 14C13.8 14 12 15.8 12 18C12 20.2 13.8 22 16 22C18.2 22 20 20.2 20 18C20 15.8 18.2 14 16 14Z" fill="#000" />
      </svg>
      <span className="font-bold text-xl tracking-tight text-black">Finity</span>
    </div>
  );
}

function FinityLogoWhite() {
  return (
    <div className="flex items-center gap-2">
      <svg width="28" height="24" viewBox="0 0 28 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M8 2C5.8 2 4 3.8 4 6C4 8.2 5.8 10 8 10C10.2 10 12 8.2 12 6C12 3.8 10.2 2 8 2Z" fill="#fff" />
        <path d="M8 14C5.8 14 4 15.8 4 18C4 20.2 5.8 22 8 22C10.2 22 12 20.2 12 18C12 15.8 10.2 14 8 14Z" fill="#fff" />
        <path d="M16 2C13.8 2 12 3.8 12 6C12 8.2 13.8 10 16 10C18.2 10 20 8.2 20 6C20 3.8 18.2 2 16 2Z" fill="#fff" />
        <path d="M16 14C13.8 14 12 15.8 12 18C12 20.2 13.8 22 16 22C18.2 22 20 20.2 20 18C20 15.8 18.2 14 16 14Z" fill="#fff" />
      </svg>
      <span className="font-bold text-xl tracking-tight text-white">Finity</span>
    </div>
  );
}

export default function InvitePage() {
  return (
    <div className="min-h-screen bg-[#f0f0f0] flex items-center justify-center py-12 px-4">
      <div className="w-full max-w-[600px] rounded-2xl overflow-hidden shadow-sm bg-white">
        {/* Email body */}
        <div className="px-10 pt-8 pb-10">
          <div className="mb-8">
            <FinityLogoBlack />
          </div>

          <h1 className="text-2xl font-semibold text-black mb-6 leading-snug">
            You&apos;ve been invited to join Finity Worker portal
          </h1>

          <div className="text-[15px] text-[#333] leading-relaxed space-y-4 mb-8">
            <p>Hi Joe,</p>
            <p>We&apos;re excited to have you on board at QA Payment Company!</p>
            <p>
              Click the button below to begin your onboarding process and set up your
              account. It should only take about 5-10 minutes to complete.
            </p>
          </div>

          <div className="flex justify-center mb-8">
            <Link href="/welcome">
              <Button variant="primary" size="medium">
                Activate my account
              </Button>
            </Link>
          </div>

          <div className="text-[15px] text-[#333] leading-relaxed space-y-4">
            <p>
              Once your account is set up, you&apos;ll be able to access all the tools and
              resources needed for your employment with us.
            </p>
            <p>
              If you need help, our customer success team is here for you at{" "}
              <a href="mailto:support@finity.co.uk" className="text-[#FF885D] underline">
                support.finity.co.uk
              </a>
              .
            </p>
            <p>
              Thanks,
              <br />
              Finity Management Ltd.
            </p>
          </div>
        </div>

        {/* Email footer */}
        <div className="bg-black px-10 py-8">
          <div className="flex items-center justify-between mb-6">
            <FinityLogoWhite />
            {/* LinkedIn icon */}
            <div className="w-7 h-7 bg-white rounded flex items-center justify-center">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" fill="#000" />
                <rect x="2" y="9" width="4" height="12" fill="#000" />
                <circle cx="4" cy="4" r="2" fill="#000" />
              </svg>
            </div>
          </div>
          <div className="text-[12px] text-[#888] leading-relaxed space-y-2">
            <p>
              © 2025 Finity Management Ltd. All rights reserved.<br />
              Registered at Colony, 5 Piccadilly Place, Manchester, M1 3BR.
            </p>
            <p>This is an automatic email, please do not reply.</p>
            <p>
              For help, visit{" "}
              <a href="#" className="text-[#FF885D] underline">support.finity.co.uk</a>
              {" "}or contact us at 0203 916 5945.
            </p>
            <p>
              <a href="#" className="text-[#FF885D] underline">Privacy policy</a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
