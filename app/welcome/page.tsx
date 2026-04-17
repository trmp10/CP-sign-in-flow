import Link from "next/link";
import { Button } from "@finity/design-system";
import Sidebar from "../components/Sidebar";
import FinityLogo from "../components/FinityLogo";


export default function WelcomePage() {
  return (
    <div className="flex flex-col md:flex-row min-h-screen">
      {/* Mobile header */}
      <header className="md:hidden flex items-center px-6 py-4 border-b border-[#e5e5e5]">
        <FinityLogo color="black" width={120} height={36} />
      </header>
      <Sidebar />
      <main className="flex-1 bg-white flex items-start justify-center px-8 pt-[80px]">
        <div className="w-full max-w-[480px] flex flex-col gap-10">
          <div className="flex flex-col gap-4">
            <h1 className="text-[1.75rem] font-bold text-black leading-snug">
              Welcome to Finity Worker Portal Sebastian 👋
            </h1>
            <p className="text-[#555] text-base leading-relaxed">
              Access your payslips, timesheets, and everything for your employment in one place!
            </p>
          </div>
          <Link href="/create-account" className="block w-full">
            <Button variant="primary" size="large" className="w-full">
              Get started
            </Button>
          </Link>
        </div>
      </main>
    </div>
  );
}
