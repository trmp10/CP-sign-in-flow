import Link from "next/link";
import FinityLogo from "./FinityLogo";

export default function Sidebar() {
  return (
    <aside className="hidden md:flex w-60 shrink-0 bg-black flex-col justify-between p-8 min-h-screen">
      <div className="flex flex-col gap-8">
        <Link href="/invite" className="-ml-[18px]">
          <FinityLogo color="white" width={140} height={42} />
        </Link>
        <nav className="flex flex-col gap-1">
          <Link href="/invite" className="text-[#a3a3a3] hover:text-white text-sm font-medium transition-colors py-1">
            Onboarding
          </Link>
          <Link href="/sign-in" className="text-[#a3a3a3] hover:text-white text-sm font-medium transition-colors py-1">
            Sign in
          </Link>
        </nav>
      </div>
      <div className="flex flex-col gap-3">
        <p className="text-white font-semibold text-xl">Worker portal</p>
        <p className="text-sm text-[#555]">
          Need help?{" "}
          <Link href="#" className="text-[#FF885D] hover:underline">
            Get in touch
          </Link>
        </p>
      </div>
    </aside>
  );
}
