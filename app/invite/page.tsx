import Link from "next/link";
import { Button } from "@finity/design-system";
import FinityLogo from "../components/FinityLogo";

export default function InvitePage() {
  return (
    <div className="min-h-screen bg-[#f0f0f0] flex items-center justify-center py-12 px-4">
      <div className="w-full max-w-[600px] rounded-2xl overflow-hidden shadow-sm bg-white">
        {/* Email body */}
        <div className="px-10 pt-8 pb-10">
          <div className="mb-8 -ml-[21px]">
            <FinityLogo color="black" width={160} height={44} />
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
              <Button variant="primary" size="large">
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
            <span className="-ml-[13px]"><FinityLogo color="white" width={100} height={26.63} /></span>
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
