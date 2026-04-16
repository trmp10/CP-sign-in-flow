import Link from "next/link";
import { Button } from "@finity/design-system";
import Sidebar from "../components/Sidebar";

export default function WelcomePage() {
  return (
    <div className="flex min-h-screen">
      <Sidebar />
      <main className="flex-1 bg-white flex items-center justify-center px-8">
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
            <Button variant="primary" size="medium" className="w-full">
              Get started
            </Button>
          </Link>
        </div>
      </main>
    </div>
  );
}
